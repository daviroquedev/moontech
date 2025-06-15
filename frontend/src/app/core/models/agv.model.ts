export interface AgvState {
  id: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  turnSpeed: number;
  battery: number;
  destination: { x: number; y: number } | null;
}
