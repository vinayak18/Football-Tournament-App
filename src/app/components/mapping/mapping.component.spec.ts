import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MappingComponent } from './mapping.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MapClass } from '../../model/MapClass';
import { TeamClass } from '../../model/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';

const MockTeamDetails=[{
  "id": 11,
  "team": "Fast Footers",
  "country": "India",
  "coach": "Ram"
},
{
  "id": 12,
  "team": "Lion Kings",
  "country": "Australia",
  "coach": "Thomas"
},
{
  "id": 14,
  "team": "Fire Fighters",
  "country": "London",
  "coach": "Joseph"
},
{
  "id": 15,
  "team": "Team Tigers",
  "country": "Germany",
  "coach": "Robert Son"
}]

const MockMapDetails=[
  {
    "id": 1,
    "category": "final1",
    "name": "Fast Footers"
  },
  {
    "id": 2,
    "category": "final2",
    "name": "Team Tigers"
  },
  {
    "id": 3,
    "category": "winner",
    "name": "Fast Footers"
  }
]

export class MockTeamdataService {

    getTeams():Observable<TeamClass[]>{
      return of(MockTeamDetails);
    }

    getMaps():Observable<MapClass[]>{
      return of(MockMapDetails);
    }
    
    updateMapping(map:MapClass):Observable<MapClass>{
      return of(map);
    }
}



describe('MappingComponent', () => {
  let component: MappingComponent;
  let fixture: ComponentFixture<MappingComponent>;
  let teamService : TeamdataService;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ MappingComponent ],
      providers:[
        {provide:TeamdataService, useClass:MockTeamdataService}
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(MappingComponent);
    component = fixture.componentInstance;
    teamService = TestBed.get(TeamdataService);
    
    fixture.detectChanges();
    

  });

  it('#ngOnInit should call getTeams and getMaps',() => {
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    spyOn(teamService,'getMaps').and.returnValue(of(MockMapDetails));
    spyOn(component,'getTeams').and.callThrough();
    spyOn(component,'getMappings').and.callThrough();
    component.ngOnInit();
    expect(component.getTeams).toHaveBeenCalled();
    expect(component.getMappings).toHaveBeenCalled()
  })

  it('#No. of teams not equal to 4 should render error msg', () => {
    component.numberOfTeams=3;
    let compiled =  fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain('Number of Teams should only be 4');
  });

  it('#onSelect1 - semi final 1 winner should render', () => {
    spyOn(teamService,'updateMapping').and.returnValue(of(MockMapDetails[0]));
    spyOn(component,'updateMapping').and.callThrough();
    component.onSelect1('clear');
    expect(component.currentMap.name).toEqual('');
    component.onSelect1('Fast Footers');
    expect(component.currentMap.name).toEqual('Fast Footers');
    let compiled = fixture.nativeElement.querySelector('#team1SemiFinal');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Fast Footers')
  });

  it('#onSelect2 - semi final 2 winner should render', () => {
    spyOn(teamService,'updateMapping').and.returnValue(of(MockMapDetails[1]));
    spyOn(component,'updateMapping').and.callThrough();
    component.onSelect2('clear');
    expect(component.currentMap.name).toEqual('');
    component.onSelect2('Team Tigers');
    expect(component.currentMap.name).toEqual('Team Tigers');
    let compiled = fixture.nativeElement.querySelector('#team2SemiFinal');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Team Tigers')
  });

  it('#onSelect3 - final winner should render', () => {
    spyOn(teamService,'updateMapping').and.returnValue(of(MockMapDetails[2]));
    spyOn(component,'updateMapping').and.callThrough();
    component.onSelect3('clear');
    expect(component.currentMap.name).toEqual('');
    component.onSelect3('Fast Footers');
    expect(component.currentMap.name).toEqual('Fast Footers');
    let compiled = fixture.nativeElement.querySelector('#finalTeam');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Fast Footers')
  });

  it('#teams click should call onSelect1',fakeAsync(() => {
    
    spyOn(teamService,'updateMapping').and.callThrough();
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    spyOn(teamService,'getMaps').and.returnValue(of(MockMapDetails));
    spyOn(component,'onSelect1').and.callThrough();
    component.getTeams();component.getMappings();
    fixture.detectChanges();

    let onSelect1Btn = fixture.nativeElement.querySelector('#team1');
    onSelect1Btn.click();
    fixture.detectChanges();
    expect(component.onSelect1).toHaveBeenCalledWith(MockTeamDetails[0].team);
    expect(teamService.updateMapping).toHaveBeenCalledWith(component.currentMap);

    let onSelect1Btn2 = fixture.nativeElement.querySelector('#team2');
    onSelect1Btn2.click();
    fixture.detectChanges();
    expect(component.onSelect1).toHaveBeenCalledWith(MockTeamDetails[0].team);

    let onSelect1Btn3 = fixture.nativeElement.querySelector('#closeteam1SemiFinal');
    onSelect1Btn3.click();
    fixture.detectChanges();
    expect(component.onSelect1).toHaveBeenCalledWith('clear');

  }))
  

  it('#teams click should be call onSelect2',() => {
    
    spyOn(teamService,'getTeams').and.returnValue(of(MockTeamDetails));
    spyOn(teamService,'updateMapping').and.callThrough();
    spyOn(component,'onSelect2').and.callThrough();
    component.getTeams();
    fixture.detectChanges();
    
    let onSelect2Btn = fixture.nativeElement.querySelector('#team3');
    onSelect2Btn.click();
    fixture.detectChanges();
    expect(component.onSelect2).toHaveBeenCalledWith(MockTeamDetails[2].team);
    expect(teamService.updateMapping).toHaveBeenCalledWith(component.currentMap);

    let onSelect2Btn2 = fixture.nativeElement.querySelector('#team4');
    onSelect2Btn2.click();
    fixture.detectChanges();
    expect(component.onSelect2).toHaveBeenCalledWith(MockTeamDetails[2].team);

    let onSelect2Btn3 = fixture.nativeElement.querySelector('#closeteam2SemiFinal');
    onSelect2Btn3.click();
    fixture.detectChanges();
    expect(component.onSelect2).toHaveBeenCalledWith('clear');

  })

  it('#teams click should be call onSelect3',() => {
    
    spyOn(teamService,'updateMapping').and.callThrough();
    spyOn(teamService,'getMaps').and.returnValue(of(MockMapDetails));
    spyOn(component,'onSelect3').and.callThrough();
    component.getMappings();
    fixture.detectChanges();

    let onSelect3Btn = fixture.nativeElement.querySelector('#team1SemiFinal');
    onSelect3Btn.click();
    fixture.detectChanges();
    expect(component.onSelect3).toHaveBeenCalled();
    expect(teamService.updateMapping).toHaveBeenCalledWith(component.currentMap);

    let onSelect3Btn2 = fixture.nativeElement.querySelector('#team2SemiFinal');
    onSelect3Btn2.click();
    fixture.detectChanges();
    expect(component.onSelect3).toHaveBeenCalled();

    let onSelect3Btn3 = fixture.nativeElement.querySelector('#closefinalTeam');
    onSelect3Btn3.click();
    fixture.detectChanges();
    expect(component.onSelect3).toHaveBeenCalledWith('clear');

  })
  
  
});
  

  



  
