import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatecafeComponent } from './locatecafe.component';

describe('LocatecafeComponent', () => {
  let component: LocatecafeComponent;
  let fixture: ComponentFixture<LocatecafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatecafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatecafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
