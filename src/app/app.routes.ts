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
            ),data: { showNavbar: false }
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
];
