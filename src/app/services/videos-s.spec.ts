import { TestBed } from '@angular/core/testing';

import { VideosS } from './videos-s';

describe('VideosS', () => {
  let service: VideosS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
