import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Stock } from '../../models/stock.model';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  
  faSearch = faSearch;

  search: string = '';

  stock: Stock[] = [];

  private searchValue: Subject<string> = new Subject<string>();
  selectedFilter = 'All';

  constructor(
    private http : HttpClient
  ) { }


  ngOnInit(): void {
    this.getStockListFromServer();
  }

  getStockListFromServer(){
    this.http.get<Stock[]>('items').subscribe({
      next: (data: Stock[]) => {
        this.stock = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }


  searchData(){
  }

  filterTransactions(filter: string, event?: Event) {
  }


}
