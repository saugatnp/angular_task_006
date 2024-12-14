import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  faSearch = faSearch;

  search: string = '';

  user: User[] = [];

  private searchValue: Subject<string> = new Subject<string>();
  selectedFilter = 'All';

  constructor(
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.getUserListFromServer();
  }

  getUserListFromServer() {
    this.http.get<User[]>('users').subscribe({
      next: (data: User[]) => {
        this.user = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }


  searchData() {
  }

  


}
