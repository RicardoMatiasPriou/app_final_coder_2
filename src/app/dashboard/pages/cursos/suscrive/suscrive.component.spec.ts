import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriveComponent } from './suscrive.component';

describe('SuscriveComponent', () => {
  let component: SuscriveComponent;
  let fixture: ComponentFixture<SuscriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
