import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SimulatorComponent } from '../../components/simulator/simulator.component';
import { ControlPanelComponent } from '../../components/control-panel/control-panel.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SimulatorComponent, ControlPanelComponent, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('Cierre de sesión exitoso y registrado en el backend.'),
      error: err => console.error('Ocurrió un error durante el cierre de sesión:', err),
    });
  }
}
