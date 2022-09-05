import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Team11Component } from './team11.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamdataService } from '../../services/teamdata.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TeamClass } from '../../model/TeamClass';
import { PlayerClass } from '../../model/PlayerClass';


const MockTeam11 = [
  {
    "id": 7,
    "teamId": 12,
    "team11status": true,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  },
  {
    "id": 7,
    "teamId": 12,
    "team11status": true,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  },
  {
    "id": 7,
    "teamId": 12,
    "team11status": true,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  },
  {
    "id": 7,
    "teamId": 12,
    "team11status": true,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  },
  {
    "id": 7,
    "teamId": 12,
    "team11status": true,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  },  
  {
    "id": 8,
    "teamId": 12,
    "team11status": true,
    "name": "William",
    "type": "MidFielder",
    "age": 29
    }
]

const MockPlayerDetails = [
  {
    "id": 7,
    "teamId": 12,
    "team11status": false,
    "name": "Rohan",
    "type": "Attacker",
    "age": 33,
    
  },
  {
  "id": 8,
  "teamId": 12,
  "team11status": true,
  "name": "William",
  "type": "MidFielder",
  "age": 29
  }  
]

const MockTeamDetails={
  "id":12,
  "team":"Lion Kings",
  "country":"Australia",
  "coach":"Thomas"
}

class MockTeamdataService{
  getSpecificTeam():Observable<TeamClass>{
    
    return of(MockTeamDetails);
    
  }

  getPlayers():Observable<PlayerClass[]>{
    
    return of(MockPlayerDetails);
  }

  updatePlayer(p):Observable<any>{
    return of(p)
  }
}

describe('Team11Component', () => {
  let component: Team11Component;
  let fixture: ComponentFixture<Team11Component>;
  let teamService : TeamdataService;
  
  let toTeam11BtnElm : HTMLElement;
  let clearTeam11BtnElm : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ Team11Component ],
      providers:[
        {provide:TeamdataService, useClass:MockTeamdataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Team11Component);
    component = fixture.componentInstance;
    teamService = TestBed.get(TeamdataService);

    toTeam11BtnElm = fixture.nativeElement.querySelector('#team11');

    fixture.detectChanges();
  });

  it('#ngOnInit should call getMyTeam and getPlayers', fakeAsync(() => {
    spyOn(component,'getMyTeam').and.callThrough();
    spyOn(component,'getPlayers').and.callThrough();
    spyOn(teamService,'getSpecificTeam').and.callThrough();
    spyOn(teamService,'getPlayers').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.ngOnInit();
      fixture.detectChanges()
      expect(component.getMyTeam).toHaveBeenCalled();
      expect(component.getPlayers).toHaveBeenCalled();
      expect(teamService.getSpecificTeam).toHaveBeenCalled();
      expect(teamService.getPlayers).toHaveBeenCalled();
    })
  }));

  it('#teams click should call toTeam11 function', fakeAsync(() => {
    component.teamId=12
    spyOn(component,'toTeam11').and.callThrough();
    spyOn(teamService,'getSpecificTeam').and.returnValue(of(MockTeamDetails))
    component.getMyTeam(component.teamId)
    spyOn(teamService,'getPlayers').and.returnValue(of(MockPlayerDetails))
    component.getPlayers();
    fixture.detectChanges();
    toTeam11BtnElm = fixture.nativeElement.querySelector('#TeamEleven');
    toTeam11BtnElm.click();
    fixture.detectChanges();
    expect(component.toTeam11).toHaveBeenCalledWith(MockPlayerDetails[0]);
  }))

  it('#teams close button click should call clearFromTeam11 function', fakeAsync(() => {
    component.teamId=12
    spyOn(component,'clearFromTeam11').and.callThrough();
    spyOn(teamService,'getSpecificTeam').and.returnValue(of(MockTeamDetails))
    component.getMyTeam(component.teamId)
    spyOn(teamService,'getPlayers').and.returnValue(of(MockPlayerDetails))
    component.getPlayers();
    fixture.detectChanges();
    clearTeam11BtnElm = fixture.nativeElement.querySelector('#clearTeam11');
    clearTeam11BtnElm.click();
    fixture.detectChanges();
    expect(component.clearFromTeam11).toHaveBeenCalled();
  }))
  
  it('#should call alert', fakeAsync(() => {
    spyOn(window,'alert');
    spyOn(component,'checkTeam11').and.callThrough();
    spyOn(component,'toTeam11').and.callThrough();
    component.playerArray=MockTeam11;
    component.teamId=12
    component.toTeam11(MockPlayerDetails[0]);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith("There are already 11 players");
    expect(component.checkTeam11()).toBeFalsy();
  }))

  it('#should not sufficient', () => {
    component.teamId=12
    spyOn(component,'checkTeam11').and.callThrough();
    spyOn(component,'toTeam11').and.callThrough();
    spyOn(teamService,'getPlayers').and.returnValue(of(MockPlayerDetails))
    component.getPlayers();
    fixture.detectChanges();
    expect(component.checkTeam11()).toBeTruthy();
    let notSuff = fixture.nativeElement.querySelector('#noSuff');
    expect(notSuff.textContent).toContain("There are no sufficient players for team 11");
  })

  it('#update team11status',() => {
    spyOn(teamService,'updatePlayer').and.callThrough();
    component.toTeam11(MockPlayerDetails[0]);
    fixture.detectChanges();
    expect(MockPlayerDetails[0].team11status).toBeTruthy();
    expect(teamService.updatePlayer).toHaveBeenCalled();
    component.clearFromTeam11(MockPlayerDetails[0]);
    fixture.detectChanges();
    expect(MockPlayerDetails[0].team11status).not.toBeTruthy();
    expect(teamService.updatePlayer).toHaveBeenCalled();
  })

});
