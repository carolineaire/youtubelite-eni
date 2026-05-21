import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistBar } from './playlist-bar';

describe('PlaylistBar', () => {
  let component: PlaylistBar;
  let fixture: ComponentFixture<PlaylistBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistBar],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
