import { Component } from '@angular/core';
import { AgvDataService } from '../../core/services/agv-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  // Não precisamos de mais nada além do CommonModule, se necessário
  imports: [CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  // O construtor agora só precisa do AgvDataService
  constructor(private agvDataService: AgvDataService) {}

  /**
   * Envia um comando simples para o único AGV que existe na simulação.
   */
  sendCommand(action: string, value: number): void {
    // A chamada do serviço agora é mais simples
    this.agvDataService.sendCommand(action, value);
  }
}
