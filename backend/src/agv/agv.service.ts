import { Injectable } from '@nestjs/common';

@Injectable()
export class AgvService {
  private agv = { id: 'AGV-01', x: 100, y: 100, angle: 0, speed: 0, turnSpeed: 0 };
  private readonly CANVAS_WIDTH = 800;
  private readonly CANVAS_HEIGHT = 600;
  private readonly AGV_SIZE = 15;

  getState() {
    return this.agv;
  }

  update() {
    this.agv.angle += this.agv.turnSpeed / 30;
    const deltaX = Math.cos(this.agv.angle) * this.agv.speed / 30;
    const deltaY = Math.sin(this.agv.angle) * this.agv.speed / 30;
    this.agv.x += deltaX;
    this.agv.y += deltaY;

    // Limita a área de movimento do AGV
    if (
      this.agv.x >= this.CANVAS_WIDTH - this.AGV_SIZE || this.agv.x <= this.AGV_SIZE ||
      this.agv.y >= this.CANVAS_HEIGHT - this.AGV_SIZE || this.agv.y <= this.AGV_SIZE
    ) {
      this.agv.speed = 0;
      this.agv.x = Math.max(this.AGV_SIZE, Math.min(this.agv.x, this.CANVAS_WIDTH - this.AGV_SIZE));
      this.agv.y = Math.max(this.AGV_SIZE, Math.min(this.agv.y, this.CANVAS_HEIGHT - this.AGV_SIZE));
    }

    return this.agv;
  }

  setCommand(action: string, value: number) {
    if (action === 'move') this.agv.speed = value;
    if (action === 'turn') this.agv.turnSpeed = value;
  }
}