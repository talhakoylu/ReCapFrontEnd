import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPageComponent } from './membership-page.component';

describe('MembershipPageComponent', () => {
  let component: MembershipPageComponent;
  let fixture: ComponentFixture<MembershipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
