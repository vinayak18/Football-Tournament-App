import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ViewdetailsComponent } from './viewdetails.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TeamClass } from '../../model/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';
import { Component } from '@angular/core';

let currentTeam:TeamClass={
  id:null,
  team:'',
  country:'',
  coach:''
  
  
}
const MockTeamDetails=[{
  "id":12,
  "team":"Lion Kings",
  "country":"Australia",
  "coach":"Thomas"
}]

class MockTeamdataService{
  
  editTeam(team:TeamClass){
    currentTeam=Object.assign({},team);
  }

  getTeams():Observable<TeamClass[]>{
    return of(MockTeamDetails)
  }

  deleteTeam(team):Observable<TeamClass>{
    return of(team);
  }
}

@Component({
  selector: 'app-mock',
  template: ``,
})
export class MockComponent { }

const mockRoutes = [
  {
    path: 'register/:id',
    component: MockComponent
  },
  {
    path:"players/:id",
    component:MockComponent
  },
  {
    path:"team11/:id",
    component:MockComponent
  }
];

describe('ViewdetailsComponent', () => {
  let component: ViewdetailsComponent;
  let fixture: ComponentFixture<ViewdetailsComponent>;
  let teamService: TeamdataService;
  let location: Location; 


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(mockRoutes),HttpClientTestingModule],
      declarations: [ ViewdetailsComponent, MockComponent ],
      providers:[
        {provide:TeamdataService,useClass:MockTeamdataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdetailsComponent);
    component = fixture.componentInstance;
    teamService = TestBed.get(TeamdataService);
    location = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('#getTeams should retrieve details',() => {
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    spyOn(component,'getTeams').and.callThrough();
    component.ngOnInit();
    expect(component.getTeams).toHaveBeenCalled();
    expect(teamService.getTeams).toHaveBeenCalled();
    let teamName = fixture.nativeElement.querySelector('#team');
    expect(teamName.textContent).toContain('Lion Kings')
    expect(component.teamArray.length).toEqual(1)
  });

  it('#edit team functionality',fakeAsync(() => {
    spyOn(teamService,'editTeam').and.callThrough();
    spyOn(component,'editTeam').and.callThrough();
    let editBtn = fixture.nativeElement.querySelector('#editBtn');
    editBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.editTeam).toHaveBeenCalledWith(MockTeamDetails[0]);
    expect(teamService.editTeam).toHaveBeenCalledWith(MockTeamDetails[0]);
    expect(location.path()).toBe('/register/'+1234);
  }));

  it('#delete team functionality',fakeAsync(() => {
    spyOn(teamService,'deleteTeam').and.callThrough();
    spyOn(component,'deleteTeam').and.callThrough();
    let delBtn = fixture.nativeElement.querySelector('#delBtn');
    delBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.deleteTeam).toHaveBeenCalledWith(MockTeamDetails[0].id);
    expect(teamService.deleteTeam).toHaveBeenCalledWith(MockTeamDetails[0].id);
  })); 

  it('#navigate team11',fakeAsync(() => {
    spyOn(component,'team11').and.callThrough();
    let team11Btn = fixture.nativeElement.querySelector('#team11');
    team11Btn.click();
    tick();
    fixture.detectChanges();
    expect(component.team11).toHaveBeenCalledWith(MockTeamDetails[0]);
    let id=MockTeamDetails[0].id;
    expect(location.path()).toBe('/team11/'+id);
  }));

  it('#navigate player detail',fakeAsync(() => {
    spyOn(component,'PlayerDetails').and.callThrough();
    let playerBtn = fixture.nativeElement.querySelector('#player');
    playerBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.PlayerDetails).toHaveBeenCalledWith(MockTeamDetails[0]);
    let id=MockTeamDetails[0].id;
    expect(location.path()).toBe('/players/'+id);
  }));

});
