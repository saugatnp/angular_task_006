import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../models/role.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../templates/modal/modal.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalComponent
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  faSearch = faSearch;

  search: string = '';

  role: Role[] = [];

  private searchValue: Subject<string> = new Subject<string>();
  selectedFilter = 'All';

  roleForm: FormGroup

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal

  ) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.getRoleListFromServer();
  }

  getRoleListFromServer() {
    this.http.get<Role[]>('roles').subscribe({
      next: (data: Role[]) => {
        if (data.length > 0) {
          this.role = data;
        }
        else {
          this.setDefaultRoles();
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  setDefaultRoles() {
    this.addRoleToServer({ role: 'admin' });
    this.addRoleToServer({ role: 'supervisor' });
    this.addRoleToServer({ role: 'sales' });
  }

  addRoleToServer(data: Partial<Role>) {
    this.http.post('roles', data).subscribe({
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.getRoleListFromServer();
      }
    });
  }


  searchData() {
  }

  onSubmit(){
    this.addRoleToServer(this.roleForm.value);
  }

  cancel(){
    this.modalService.dismissAll();
  }


}
