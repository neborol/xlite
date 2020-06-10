import { TestBed } from '@angular/core/testing';

import { CockpitFaqService } from './cockpit-faq.service';

describe('CockpitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CockpitFaqService = TestBed.get(CockpitFaqService);
    expect(service).toBeTruthy();
  });
});
