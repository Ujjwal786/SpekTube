import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareVideoDialogComponent } from './share-video-dialog.component';

describe('ShareVideoDialogComponent', () => {
  let component: ShareVideoDialogComponent;
  let fixture: ComponentFixture<ShareVideoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareVideoDialogComponent]
    });
    fixture = TestBed.createComponent(ShareVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
