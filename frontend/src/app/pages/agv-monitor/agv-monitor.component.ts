import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SimulatorComponent } from '../../components/simulator/simulator.component';
import { ControlPanelComponent } from '../../components/control-panel/control-panel.component';

@Component({
  selector: 'agv-monitor-main-layout',
  standalone: true,
  imports: [SimulatorComponent, ControlPanelComponent, RouterLink],
  templateUrl: './agv-monitor.component.html',
  styleUrl: './agv-monitor.component.scss'
})
export class AgvMonitorComponent {




}
