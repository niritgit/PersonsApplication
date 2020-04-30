import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonmanageComponent } from './personmanage.component';

describe('PersonmanageComponent', () => {
  let component: PersonmanageComponent;
  let fixture: ComponentFixture<PersonmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
