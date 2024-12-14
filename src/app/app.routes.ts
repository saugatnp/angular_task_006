import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('../app/components/login/login.component').then(
                (m) => m.LoginComponent
            ),data: { showNavbar: false }
    },
    {
        path: 'register',
        loadComponent: () =>
            import('../app/components/register/register.component').then(
                (m) => m.RegisterComponent
            ),data: { showNavbar: false , role : 'user' }
    },
    {
        path: 'register-admin',
        loadComponent: () =>
            import('../app/components/register/register.component').then(
                (m) => m.RegisterComponent
            ),data: { showNavbar: false , role : 'admin' }
    },
    {
        path: 'item-entry',
        loadComponent: () =>
            import('../app/components/item-entry/item-entry.component').then(
                (m) => m.ItemEntryComponent
            )
    },
    {
        path: 'stock-list',
        loadComponent: () =>
            import('../app/components/stock-list/stock-list.component').then(
                (m) => m.StockListComponent
            )
    },
    {
        path: 'user-list',
        loadComponent: () =>
            import('../app/components/user-list/user-list.component').then(
                (m) => m.UserListComponent
            )
    },
    {
        path: 'role-list',
        loadComponent: () =>
            import('../app/components/role-list/role-list.component').then(
                (m) => m.RoleListComponent
            )
    },
];
