import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashiComponent } from './hashi.component';

describe('HashiComponent', () => {
  let component: HashiComponent;
  let fixture: ComponentFixture<HashiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
