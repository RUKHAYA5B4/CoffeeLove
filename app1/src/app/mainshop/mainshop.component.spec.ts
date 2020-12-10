import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainshopComponent } from './mainshop.component';

describe('MainshopComponent', () => {
  let component: MainshopComponent;
  let fixture: ComponentFixture<MainshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
