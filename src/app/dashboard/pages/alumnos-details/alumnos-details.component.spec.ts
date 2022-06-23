import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosDetailsComponent } from './alumnos-details.component';

describe('AlumnosDetailsComponent', () => {
  let component: AlumnosDetailsComponent;
  let fixture: ComponentFixture<AlumnosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
