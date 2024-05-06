import { TestBed } from '@angular/core/testing';

import { JenismenuService } from './services/jenismenu.service';

describe('JenismenuService', () => {
  let service: JenismenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenismenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
