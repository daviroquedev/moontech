import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // O AppComponent agora só precisa do RouterOutlet
  // para exibir a página correspondente à rota atual.
  // Os componentes do simulador são geridos pelo MainLayoutComponent.
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
