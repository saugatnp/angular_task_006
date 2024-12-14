import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {


    constructor(
        private http: HttpClient,
        private router: Router,
        private notifier: SnackBarService
    ) {

    }


    checkForDuplicateUserEmail(email: string, password: string, role: string[]) {
        this.http.get('users').subscribe({
            next: (data: any) => {
                if(data.length > 0){
                const isDuplicate = data.find((element: any) => element.email === email) !== undefined;
                if (isDuplicate) {
                    console.log('Email is already registered');
                } else {
                    this.registerUser(email, password, role);
                }
            }
            },
            error: (error: any) => {
                console.error('There was an error!', error);
            },
        });
    }



    registerUser(email: string, unencryptedPassword: string, role: string[]) {
        const password = btoa(unencryptedPassword);
        this.http.post('users', { email, password, role }).subscribe({
            next: (data: any) => {
                this.notifier.showToast('Action was successful!', 'success', 'Success');
                this.router.navigateByUrl('/login');
            },
            error: (error: any) => {
                console.error('There was an error!', error);
            },
        });
    }


    validateUserEmailAndPassword(email: string, unencryptedPassword: string, returnUrl: string) {
        this.http.get('users').subscribe({
            next: (data: any) => {
                const user = data.find((element: any) => element.email === email);
                if (user != undefined) {
                    if (user.password === btoa(unencryptedPassword)) {
                        this.setLoginToken(user);
                        this.router.navigateByUrl(returnUrl);
                    }
                    else {
                        this.notifier.showToast('The password you entered is incorrect!!', 'warning', 'warning');
                    }
                } else {
                    this.notifier.showToast('The user with provided email does not exits!!', 'warning', 'warning');
                }
            },
            error: (error: any) => {
                console.error('There was an error!', error);
            },
        });
    }






    /**
     * Set the login token in local storage
     */
    setLoginToken(user: User) {
        const now = new Date();
        // TODO : change the default role to passed role from user CRUD operation
        const item = {
            value: 'valid-token',
            roles: user.role,
            email: user.email,
            expiry: now.getTime() + 3600000
        };
        localStorage.setItem('mock-task-token', JSON.stringify(item));
    }


    /**
     * 
     * @returns the login token if it is valid else returns null
     */
    getLoginToken() {
        const token = localStorage.getItem('mock-task-token');
        if (!token) {
            return null;
        }
        const item = JSON.parse(token);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem('mock-task-token');
            return null;
        }
        return item.value;
    }


    /**
     * 
     * @returns true if the token is valid else returns false
     */
    checkTokenValidity() {
        const token = localStorage.getItem('mock-task-token');
        if (!token) {
            return false;
        }
        const item = JSON.parse(token);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem('mock-task-token');
            return false;
        }
        return true;
    }


    /**
     * Log out the user or remove the token from local storage
     */
    logOut() {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('mock-task-token');
            this.router.navigate(['/home']);
        }
    }


}