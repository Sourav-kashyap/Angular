import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, CommonModule, RouterTestingModule], // Add RouterTestingModule
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have isNavbarOpen as false initially', () => {
    expect(component.isNavbarOpen).toBeFalse();
  });

  it('should toggle isNavbarOpen value when toggleNavbar is called', () => {
    component.toggleNavbar();
    expect(component.isNavbarOpen).toBeTrue();

    component.toggleNavbar();
    expect(component.isNavbarOpen).toBeFalse();
  });

  it('should toggle the navbar on button click', () => {
    const button = fixture.debugElement.query(By.css('button')); // Or a more specific selector
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isNavbarOpen).toBeTrue();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isNavbarOpen).toBeFalse();
  });
});