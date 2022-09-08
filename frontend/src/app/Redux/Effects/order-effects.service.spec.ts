import { TestBed } from '@angular/core/testing';

import { OrderEffectsService } from './order-effects.service';

describe('OrderEffectsService', () => {
  let service: OrderEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
