import { TestBed } from '@angular/core/testing';

import { MembersService } from './users.service';

describe('MembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersService = TestBed.get(MembersService);
    expect(service).toBeTruthy();
  });
});
