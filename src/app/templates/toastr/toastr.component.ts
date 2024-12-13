import { Component } from '@angular/core';
import { SnackBarService } from '../../services/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent {
  toasts: Toast[] = [];

  constructor(
    private toastService: SnackBarService
  ) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toastData) => {
      const toast: Toast = {
        ...toastData,
        id: Math.random().toString(36).substring(2, 7),
      };
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast.id), 3000);
    });
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger';
  title: string;
}
