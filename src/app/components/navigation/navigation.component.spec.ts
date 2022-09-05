import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';

import { NavigationComponent } from './navigation.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }

const mockRoutes = [
  {
    path: 'register',
    component: MockComponent
  },
  {
    path: 'viewdetails',
    component: MockComponent
  },
  {
    path: 'map',
    component: MockComponent
  },
  {
    path: '',
    component: MockComponent
  },
];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let location: Location;

  let regBtn: HTMLElement;
  let viewBtn: HTMLElement;
  let mapBtn: HTMLElement;
  let hmBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent,MockComponent ],
      imports: [RouterTestingModule.withRoutes(mockRoutes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  
  it(`should have as title 'Football Tournament'`, () => {
    
    let title = fixture.nativeElement.querySelector('#home');
    expect(title.textContent).toContain('Football Tournament');
  });

  it('#Registration routerLink', fakeAsync(() => {
    
    regBtn = fixture.nativeElement.querySelector('#reg');
    regBtn.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/register');
  }))

  it('#view routerLink', fakeAsync(() => {
    
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/viewdetails');
  }))

  it('#map routerLink', fakeAsync(() => {
    
    mapBtn = fixture.nativeElement.querySelector('#map');
    mapBtn.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/map');
  }))

  it('#home registration routerLink', fakeAsync(() => {
    
    hmBtn = fixture.nativeElement.querySelector('#home');
    hmBtn.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/');
  }))



});
