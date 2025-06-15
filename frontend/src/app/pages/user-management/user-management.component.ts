import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  editingUserId: string | null = null;
  showForm = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openCreateForm(): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset({ activo: true });
    this.showForm = true;
  }

  openEditForm(user: User): void {
    this.isEditing = true;
    this.editingUserId = user._id;
    this.userForm.patchValue({
      nombre: user.nombre,
      email: user.email,
      activo: user.activo
    });
    this.userForm.get('contrasena')?.clearValidators();
    this.userForm.get('contrasena')?.updateValueAndValidity();
    this.showForm = true;
  }

  deleteUser(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    if (this.isEditing && this.editingUserId) {
      this.userService.updateUser(this.editingUserId, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.closeForm();
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.closeForm();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
