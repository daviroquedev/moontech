import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AgvDataService } from '../../core/services/agv-data.service';
import { AgvState } from '../../core/models/agv.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [],
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.scss'
})
export class SimulatorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('simulatorCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private agvSubscription!: Subscription;

  // Propriedade para guardar o estado mais recente recebido
  private latestAgvState: AgvState | null = null;
  private animationFrameId: number | null = null;

  constructor(private agvDataService: AgvDataService) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    
    // Subscreve o método correto e simples: getAgvUpdates
    this.agvSubscription = this.agvDataService.getAgvUpdates().subscribe(agvState => {
      this.latestAgvState = agvState;
    });

    this.gameLoop();
  }

  private gameLoop = () => {
    if (this.latestAgvState) {
      this.drawAgv(this.latestAgvState);
    }
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  }

  private drawAgv(agv: AgvState): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.ctx.save();
    this.ctx.translate(agv.x, agv.y);
    this.ctx.rotate(agv.angle);

    this.ctx.fillStyle = 'royalblue';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.rect(-15, -10, 30, 20);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(15, 0);
    this.ctx.lineTo(25, 0);
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    this.ctx.restore();
  }

  ngOnDestroy(): void {
    if (this.agvSubscription) {
      this.agvSubscription.unsubscribe();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
