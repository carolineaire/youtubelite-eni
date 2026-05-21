import { TestBed } from '@angular/core/testing';

import { PlaylistS } from './playlist-s';

describe('PlaylistS', () => {
  let service: PlaylistS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
