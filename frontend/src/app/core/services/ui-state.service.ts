import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  // BehaviorSubject guarda o valor mais recente e o emite para novos inscritos.
  // Começamos sem nenhum AGV selecionado.
  public selectedAgvId$ = new BehaviorSubject<string | null>(null);

  constructor() { }

  public selectAgv(agvId: string | null): void {
    this.selectedAgvId$.next(agvId);
  }
}
