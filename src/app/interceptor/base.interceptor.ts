import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicData } from '../models/data.model';




/**
 * 
 * @returns generate unique id for each data post
 */
const generateUniqueId = (): string => Math.random().toString(36).substring(2, 10);






/**
 * 
 * @param url - The URL of the request
 * @returns  Observable with the response of the request from local storage
 */
const handleGetRequest = (url: string) => {
  const data: Array<BasicData> = localStorage.getItem(url)
    ? JSON.parse(localStorage.getItem(url) as string)
    : null;
  if (data) {
    return of(new HttpResponse({ body: data, status: 200 }));
  }
  return of(new HttpResponse({ body : [] , status: 200 }));
};






/**
 * 
 * @param url url of the request
 * @param body  body of the request
 * @returns  Observable with the response of the request from local storage
 */
const handlePostRequest = (url: string, body: any) => {
  const data = body ?? {};
  const existingData = localStorage.getItem(url);
  const payload = {
    ...data,
    id: generateUniqueId(),
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };
  const updatedData = existingData ? [...JSON.parse(existingData), payload] : [payload];
  localStorage.setItem(url, JSON.stringify(updatedData));
  return of(new HttpResponse({ status: 200 }));
};






/**
 * 
 * @param url  url of the request
 * @param body  body of the request
 * @returns  Observable with the response of the request from local storage
 */
const handlePutRequest = (url: string, body: any) => {
  const existingData = localStorage.getItem(url);
  if (existingData) {
    const parsedData = JSON.parse(existingData);
    const updatedData = parsedData.map((item: any) => {
      if (item.id === body.id) {
        return {
          ...item,
          ...body,
          modifiedAt: new Date().toISOString(),
        };
      }
      return item;
    });
    localStorage.setItem(url, JSON.stringify(updatedData));
    return of(new HttpResponse({ body: updatedData, status: 200 }));
  }
  localStorage.setItem(url, JSON.stringify(body));
  return of(new HttpResponse({ status: 200 }));
};






/**
 * 
 * @param url  url of the request
 * @param body  body of the request
 * @returns  Observable with the response of the request from local storage
 */
const handleDeleteRequest = (url: string, body: any) => {
  const existingData = localStorage.getItem(url);
  if (existingData) {
    const parsedData = JSON.parse(existingData);
    const filteredData = parsedData.filter((item: any) => item.id !== body.id);
    localStorage.setItem(url, JSON.stringify(filteredData));
  } else {
    localStorage.removeItem(url);
  }
  return of(new HttpResponse({ status: 200 }));
};






/**
 * Base URL Interceptor
 * @param req - The HTTP request
 * @param next - The next interceptor or backend
 * @returns Observable with the response
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${req.url}`,
  });

  const method = req.method.toUpperCase();
  const url = req.url;
  switch (method) {
    case 'GET':
      return handleGetRequest(url);
    case 'POST':
      return handlePostRequest(url, req.body);
    case 'PUT':
      return handlePutRequest(url, req.body);
    case 'DELETE':
      return handleDeleteRequest(url, req.body);
    default:
      return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('HTTP Error:', error.message);
          return throwError(() => error);
        })
      );
  }
};
