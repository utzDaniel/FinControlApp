import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAcoesComponent } from './button-acoes.component';

describe('ButtonAcoesComponent', () => {
  let component: ButtonAcoesComponent;
  let fixture: ComponentFixture<ButtonAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAcoesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
