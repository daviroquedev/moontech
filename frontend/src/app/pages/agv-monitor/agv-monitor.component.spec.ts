import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgvMonitorComponent } from './agv-monitor.component';


describe('AgvMonitorComponent', () => {
  let component: AgvMonitorComponent;
  let fixture: ComponentFixture<AgvMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgvMonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgvMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
