import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditComponent } from './button-edit.component';

describe('ButtonEditaComponent', () => {
  let component: ButtonEditComponent;
  let fixture: ComponentFixture<ButtonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
