import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrderComponent } from './status-order.component';

describe('StatusOrderComponent', () => {
  let component: StatusOrderComponent;
  let fixture: ComponentFixture<StatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
