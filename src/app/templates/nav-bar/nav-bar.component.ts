import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  showNavbar: boolean = false;
  currentRoute = '';



  /**
   * intialize the router instance and also get shownavbar data from route definition
   */
  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBarService: SnackBarService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects || event.url;
        const currentRouteData = this.router.routerState.snapshot.root.firstChild?.data;
        this.showNavbar = currentRouteData?.['showNavbar'] ?? true;
      }
    });

  }


  toggleNavBar() {
    document.querySelector('.sidenav')!.classList.toggle('open');
  }

  logout(){
    
  }

  /**
   * 
   * @param link link to check if it is active
   * @returns true if the passed link is active
   */
  isActive(link: string): boolean {
    return this.currentRoute === link;
  }

}
