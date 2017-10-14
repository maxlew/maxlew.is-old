import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetraLoveComponent } from './petra-love.component';

describe('PetraLoveComponent', () => {
  let component: PetraLoveComponent;
  let fixture: ComponentFixture<PetraLoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetraLoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetraLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
