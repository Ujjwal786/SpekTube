import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReportDialogComponent } from './video-report-dialog.component';

describe('VideoReportDialogComponent', () => {
  let component: VideoReportDialogComponent;
  let fixture: ComponentFixture<VideoReportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoReportDialogComponent]
    });
    fixture = TestBed.createComponent(VideoReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
