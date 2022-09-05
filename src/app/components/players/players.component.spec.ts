import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlayersComponent } from './players.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerClass } from '../../model/PlayerClass';
import { TeamdataService } from '../../services/teamdata.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TeamClass } from '../../model/TeamClass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
];

const MockTeamDetails={
  "id":12,
  "team":"Lion Kings",
  "country":"Australia",
  "coach":"Thomas"
};

class MockTeamdataService{
  getSpecificTeam():Observable<TeamClass>{
    
    return of(MockTeamDetails);
    
  }

  getPlayers():Observable<PlayerClass[]>{
    
    return of(MockPlayerDetails);
  }

  deletePlayer(p):Observable<PlayerClass>{
    return of(p);
  }

  createPlayer(p):Observable<PlayerClass>{
    return of(p);
  }

  updatePlayer(p):Observable<PlayerClass>{
    return of(p);
  }

}


describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let teamService : TeamdataService;

  let editBtn: HTMLElement;
  let delBtn: HTMLElement;
  let createUpdateBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule,BrowserAnimationsModule,ReactiveFormsModule],
      declarations: [ PlayersComponent ],
      providers:[
        {provide:TeamdataService, useClass:MockTeamdataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    teamService = TestBed.get(TeamdataService);

    
    fixture.detectChanges();
  });

  it('#ngOnInit should call getMyTeam and getPlayers', fakeAsync(() => {
    spyOn(component,'getMyTeam').and.callThrough();
    spyOn(component,'getPlayers').and.callThrough();
    tick();
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges()
    expect(component.getMyTeam).toHaveBeenCalled();
    expect(component.getPlayers).toHaveBeenCalled();
    expect(component.typesOfPlayer).toEqual(["Defender","GoalKeeper","MidFielder","Attacker"]);  
  })); 

  it('#getMyTeam should retrieve a team details',fakeAsync(() => {
    spyOn(teamService,'getSpecificTeam').and.returnValue(of(MockTeamDetails));
    spyOn(component,'getMyTeam').and.callThrough();
    component.getMyTeam(12);
    expect(teamService.getSpecificTeam).toHaveBeenCalledWith(12);
  }));

  it('#getPlayer should retrieve player details',fakeAsync(() => {
    spyOn(teamService,'getPlayers').and.returnValue(of(MockPlayerDetails));
    spyOn(component,'getPlayers').and.callThrough();
    component.teamId=12;
    component.getPlayers();
    expect(teamService.getPlayers).toHaveBeenCalled();
  }));
  
  it('#editPlayer functionality', fakeAsync(() => {
    spyOn(teamService,'getPlayers').and.returnValue(of(MockPlayerDetails));
    spyOn(component,'getPlayers').and.callThrough();
    spyOn(component,'editPlayers').and.callThrough();
    component.teamId=12;
    component.getPlayers();
    fixture.detectChanges();
    
    editBtn = fixture.nativeElement.querySelector('#editP');
    editBtn.click();
    fixture.detectChanges();

    expect(component.editPlayers).toHaveBeenCalledWith(component.playerDetail);
    component.editPlayers(MockPlayerDetails[0]);
    expect(component.playerDetail).toEqual(MockPlayerDetails[0]);    
  }));

  it('#deletePlayer functionality', fakeAsync(() => {
    spyOn(teamService,'deletePlayer').and.returnValue(of(MockPlayerDetails[0]));
    spyOn(component,'getPlayers').and.callThrough();
    spyOn(component,'deletePlayer').and.callThrough();
    component.teamId=12;
    component.getPlayers();
    fixture.detectChanges();
    
    delBtn = fixture.nativeElement.querySelector('#deleteP');
    delBtn.click();
    fixture.detectChanges();

    expect(component.deletePlayer).toHaveBeenCalledWith(MockPlayerDetails[0].id);
    expect(teamService.deletePlayer).toHaveBeenCalledWith(MockPlayerDetails[0].id);
  }));

  it('#form should be Invalid', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['name'].setValue('testvenue1');
      component.ngForm.controls['type'].setValue('Attacker');
      component.ngForm.controls['age'].setValue(23);
      expect(component.ngForm.valid).toBeFalsy();
    })
    component.ngForm.resetForm();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['name'].setValue('testvenue');
      component.ngForm.controls['type'].setValue('');
      component.ngForm.controls['age'].setValue(23);
      expect(component.ngForm.valid).toBeFalsy();
    })
    component.ngForm.resetForm();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['name'].setValue('testvenue');
      component.ngForm.controls['type'].setValue('testtype');
      component.ngForm.controls['age'].setValue('');
      expect(component.ngForm.valid).toBeFalsy();
    })
  }));

  it('#form should be valid and call create player and alert', async(() => {
    spyOn(window,'alert');
    spyOn(teamService,'createPlayer').and.callThrough();
    spyOn(teamService,'updatePlayer').and.callThrough();
    spyOn(component,'createOrUpdatePlayer').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.ngForm.controls['name'].setValue('testvenue');
      component.ngForm.controls['type'].setValue('Attacker');
      component.ngForm.controls['age'].setValue(23);
      expect(component.ngForm.valid).toBeTruthy();
	    fixture.detectChanges();

	    fixture.whenStable().then(()=>{   
	    
	    createUpdateBtn = fixture.nativeElement.querySelector('#createOrUpdate');
	    
	    createUpdateBtn.click();
	    fixture.detectChanges();
	    expect(component.createOrUpdatePlayer).toHaveBeenCalled();
	    expect(teamService.createPlayer).toHaveBeenCalledWith(component.playerDetail);
	    expect(window.alert).toHaveBeenCalledWith("Player Details Added");
	  })
	  })
  }));

  it('#form should be valid and call update player and alert', async(() => {
    spyOn(window,'alert');
    spyOn(teamService,'createPlayer').and.callThrough();
    spyOn(teamService,'updatePlayer').and.callThrough();
    spyOn(component,'createOrUpdatePlayer').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.playerDetail.id=7;
      component.ngForm.controls['name'].setValue('testvenue');
      component.ngForm.controls['type'].setValue('Attacker');
      component.ngForm.controls['age'].setValue(23);
      expect(component.ngForm.valid).toBeTruthy();
	    fixture.detectChanges();
	    fixture.whenStable().then(()=>{   
	    createUpdateBtn = fixture.nativeElement.querySelector('#createOrUpdate');
	    createUpdateBtn.click();
	    fixture.detectChanges();
	    expect(component.createOrUpdatePlayer).toHaveBeenCalled();
	    expect(teamService.updatePlayer).toHaveBeenCalledWith(component.playerDetail);
	    expect(window.alert).toHaveBeenCalledWith("Player Details Updated");
	  })
	  })
  }));

  it('clear from form',()=>{
    spyOn(component,'clear').and.callThrough();
    let clrBtn= fixture.nativeElement.querySelector('#clrBtn');
    clrBtn.click();
    fixture.detectChanges();
    expect(component.ngForm.controls['name']).toBeUndefined;
    expect(component.ngForm.controls['type']).toBeUndefined;
    expect(component.ngForm.controls['age']).toBeUndefined;
    expect(component.clear).toHaveBeenCalled();
  });

});
