import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigmgmtComponent } from './configmgmt.component';

describe('ConfigmgmtComponent', () => {
  let component: ConfigmgmtComponent;
  let fixture: ComponentFixture<ConfigmgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigmgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
