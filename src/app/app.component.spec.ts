import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  // // test-1
  // it('should create the app', async(() => {
  //   expect(comp).toBeTruthy();
  // }));

  // // test-2
  // it('should render title in a h1 tag', async(() => {
  //   comp.message = 'test title';
  //   fixture.detectChanges();
  //   expect(el.textContent).toContain('test title');
  // }));
});
