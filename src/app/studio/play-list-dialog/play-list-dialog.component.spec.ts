import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListDialogComponent } from './play-list-dialog.component';

describe('PlayListDialogComponent', () => {
  let component: PlayListDialogComponent;
  let fixture: ComponentFixture<PlayListDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayListDialogComponent]
    });
    fixture = TestBed.createComponent(PlayListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
