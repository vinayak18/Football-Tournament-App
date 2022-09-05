import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamdataService } from '../../services/teamdata.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamClass } from '../../model/TeamClass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock',
  template: ``,
})

export class MockComponent { }

const mockRoutes = [
  {
    path: 'viewdetails',
    component: MockComponent
  }
];

const currentTeam:TeamClass={
  id:null,
  team:'',
  country:'',
  coach:''
}
const MockTeam={
  "id":null,
  "team":"Lion Kings",
  "country":"Australiaaaa",
  "coach":"Thomas"
}

const MockCountry={
  "id":null,
  "team":"Lion Kingssssss",
  "country":"Australia",
  "coach":"Thomas"
}
const MockTeamDetails=[{
  "id":12,
  "team":"Lion Kings",
  "country":"Australia",
  "coach":"Thomas"
}]

class MockTeamdataService{
  
  getValue(){
    return currentTeam;
  }

  getTeams():Observable<TeamClass[]>{
    return of(MockTeamDetails)
  }

  createTeam(team):Observable<TeamClass>{
    return of(team);
  }

  updateTeam(team):Observable<TeamClass>{
    return of(team);
  }

  clear(){
    return currentTeam;
  }

}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let teamService : TeamdataService;  
  let location: Location; 
  let createUpdateBtn : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent, MockComponent ],
      imports:[RouterTestingModule.withRoutes(mockRoutes), HttpClientTestingModule, FormsModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers:[
        {provide:TeamdataService,useClass:MockTeamdataService}
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    teamService = TestBed.get(TeamdataService);
    location = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('#id 1234 call clear',() =>{
    spyOn(component,'clear').and.callThrough();
    component.id=null;
    component.ngOnInit()
    expect(component.clear).toHaveBeenCalled();
  });
    
  it('#form should be Invalid', async(() => {
    spyOn(teamService,'getValue').and.returnValue(currentTeam);
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['team'].setValue('test team');
      component.ngForm.controls['country'].setValue('test country');
      component.ngForm.controls['coach'].setValue('test coach1');
      expect(component.ngForm.valid).toBeFalsy();
      fixture.detectChanges();
      let saveBtn = fixture.nativeElement.querySelector('#createUpdateBtn');
      expect(saveBtn.disabled).toBeTruthy();
    })
    component.ngForm.resetForm();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['team'].setValue('');
      component.ngForm.controls['country'].setValue('');
      component.ngForm.controls['coach'].setValue('test coach');
      expect(component.ngForm.valid).toBeFalsy();
    })
    component.ngForm.resetForm();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['team'].setValue('te');
      component.ngForm.controls['country'].setValue('te');
      component.ngForm.controls['coach'].setValue('test coach');
      expect(component.ngForm.valid).toBeFalsy();
    })
  }));

  it('#form should be valid and call create team and alert', async(() => {
    spyOn(component,'checkTeamCountryDuplicates').and.callThrough();
    spyOn(window,'alert');
    spyOn(teamService,'createTeam').and.callThrough();
    spyOn(teamService,'updateTeam').and.callThrough();
    spyOn(component,'createOrUpdate').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.currentTeam.id=null;
      component.ngForm.controls['team'].setValue('testa team');
      component.ngForm.controls['country'].setValue('testa country');
      component.ngForm.controls['coach'].setValue('test coach');
      expect(component.ngForm.valid).toBeTruthy();
	    fixture.detectChanges();
	    let saveBtn = fixture.nativeElement.querySelector('#createUpdateBtn');
	    expect(saveBtn.disabled).toBeFalsy();
	    fixture.whenStable().then(()=>{   
	      
	    createUpdateBtn = fixture.nativeElement.querySelector('#createUpdateBtn');
	    
	    createUpdateBtn.click();
	    fixture.detectChanges();

	    expect(component.createOrUpdate).toHaveBeenCalledWith(component.ngForm,component.currentTeam);
	    expect(teamService.createTeam).toHaveBeenCalled();
	    expect(component.checkTeamCountryDuplicates).toHaveBeenCalled();
	    expect(window.alert).toHaveBeenCalledWith("Team Details Added");
	  })  
	  })
  }));
  
  it('#form should be valid and call update team and alert', async(() => {
    spyOn(component,'checkTeamCountryDuplicates').and.callThrough();
    spyOn(window,'alert');
    spyOn(teamService,'createTeam').and.callThrough();
    spyOn(teamService,'updateTeam').and.callThrough();
    spyOn(component,'createOrUpdate').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.currentTeam.id=12;
      component.ngForm.controls['team'].setValue('test team');
      component.ngForm.controls['country'].setValue('test country');
      component.ngForm.controls['coach'].setValue('test coach');
      expect(component.ngForm.valid).toBeTruthy();
	    fixture.detectChanges();
	    fixture.whenStable().then(()=>{   
	    createUpdateBtn = fixture.nativeElement.querySelector('#createUpdateBtn');
	    createUpdateBtn.click();
	    fixture.detectChanges();
	    expect(component.createOrUpdate).toHaveBeenCalledWith(component.ngForm,component.currentTeam);
	    expect(teamService.updateTeam).toHaveBeenCalled();
	    expect(component.checkTeamCountryDuplicates).not.toHaveBeenCalled();
	    expect(window.alert).toHaveBeenCalledWith("Team Details Updated");
	  })
	  })
  
  }));

  it('#team already exists',fakeAsync(() => {
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    spyOn(window,'alert');
    component.getTeams()
    expect(component.checkTeamCountryDuplicates(MockTeam)).toBeTruthy();
    component.createOrUpdate(component.ngForm,MockTeam)
    expect(window.alert).toHaveBeenCalledWith("Team Name or Country Name Already Exists");
  }));

  it('#country already exists',fakeAsync(() => {
    spyOn(window,'alert');
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    component.getTeams()
    expect(component.checkTeamCountryDuplicates(MockCountry)).toBeTruthy();
    component.createOrUpdate(component.ngForm,MockCountry)
    expect(window.alert).toHaveBeenCalledWith("Team Name or Country Name Already Exists");
  }));

  it('#clear from form',()=>{
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails))
    spyOn(component,'checkTeamCountryDuplicates').and.returnValue(false);
    spyOn(teamService,'clear').and.returnValue(currentTeam);
    spyOn(component,'clear').and.callThrough();
    let clrBtn= fixture.nativeElement.querySelector('#clrBtn');
    clrBtn.click();
    fixture.detectChanges();
    expect(component.ngForm.controls['team']).toBeUndefined;
    expect(component.ngForm.controls['country']).toBeUndefined;
    expect(component.ngForm.controls['coach']).toBeUndefined;
    expect(component.clear).toHaveBeenCalled();
  });

});
