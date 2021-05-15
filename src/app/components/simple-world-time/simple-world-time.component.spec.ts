import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWorldTimeComponent } from './simple-world-time.component';

describe('SimpleWorldTimeComponent', () => {
  let component: SimpleWorldTimeComponent;
  let fixture: ComponentFixture<SimpleWorldTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleWorldTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWorldTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
