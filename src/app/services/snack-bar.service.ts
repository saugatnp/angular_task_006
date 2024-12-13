import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrComponent } from '../templates/toastr/toastr.component';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    private toastSubject = new Subject<ToastData>();
    toast$ = this.toastSubject.asObservable();
  
    showToast(message: string, type: 'success' | 'warning' | 'danger' = 'success', title: string = 'Notification') {
      const toastData: ToastData = { message, type, title };
      this.toastSubject.next(toastData);
    }
  }
  
  interface ToastData {
    message: string;
    type: 'success' | 'warning' | 'danger';
    title: string;
  }