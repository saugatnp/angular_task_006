import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.css'
})
export class ItemEntryComponent {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private http: HttpClient
  ) {

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }



  onSubmit() {
    if (this.itemForm.valid) {
      this.http.post('items', this.itemForm.value).subscribe({
        next: (data) => {
          this.itemForm.reset();
          this.snackBarService.showToast('item added successfully!', 'success', 'Success');
        },
        error: (error) => {
          console.error(error);
          this.snackBarService.showToast('Failed to add item!', 'danger', 'danger');
        }
      });
    }
  }


  onCancel() {
    this.itemForm.reset();
  }

}
