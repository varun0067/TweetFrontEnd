import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTweetsComponent } from './view-my-tweets.component';

describe('ViewMyTweetsComponent', () => {
  let component: ViewMyTweetsComponent;
  let fixture: ComponentFixture<ViewMyTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
