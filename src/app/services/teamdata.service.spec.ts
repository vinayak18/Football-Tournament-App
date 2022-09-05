import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { TeamdataService } from './teamdata.service';
import { TeamClass } from '../model/TeamClass';
import { PlayerClass } from '../model/PlayerClass';
import { MapClass } from '../model/MapClass';

describe('TeamdataService', () => {
  let service:TeamdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TeamdataService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
    service = TestBed.get(TeamdataService);
  });

  it('should be created', inject([TeamdataService], (service: TeamdataService) => {
    expect(service).toBeTruthy();
  }));

  it('#service should call clear', () => {
    const currentTeam={
      id:null,
      team:'',
      country:'',
      coach:''
    }
    expect(service.clear()).toEqual(currentTeam);
    
  });

  it('#getValue should return real value', () => {
    const nullTeam:TeamClass={
      "id":null,
      "team":'',
      "country":'',
      "coach":''

    }
    expect(service.getValue()).toEqual(nullTeam);
  });

  it('getTeams should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {

      const ures=[
        {
          "id": 12,
          "team": "Lion Kings",
          "country": "Australia",
          "coach": "Thomas"
        }
      ];
      const expectedUrl = '/api/teams';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: ures })
          ));
        });

      TeamdataService.getTeams()
        .subscribe( (res: any) => {
          let expected:string;
          for(let i=0;i<res.length;i++){
            if(res[i].team.localeCompare('Lion Kings')==0){
              expected=res[i].coach
            }
              
            }
          expect(expected).toEqual("Thomas")
          expect(res).toEqual(ures);
        });
    })
  ));

  it('getSpecificTeam should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {

      const ures=[
        {
          "id": 12,
          "team": "Lion Kings",
          "country": "Australia",
          "coach": "Thomas"
        }
      ];
      const expectedUrl = '/api/teams/12';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: ures })
          ));
        });

      TeamdataService.getSpecificTeam(12)
        .subscribe( (res: any) => {

          expect(res).toEqual(ures);
        });
    })
  ));

  it('getPlayers should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {

        const pres=[
          {
          "id": 8,
        "teamId": 12,
        "team11status": true,
        "name": "William",
        "type": "MidFielder",
        "age": 29
          }
        ];
      const expectedUrl = '/api/players';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: pres })
          ));
        });

      TeamdataService.getPlayers()
        .subscribe( (res: PlayerClass[]) => {
          expect(res).toEqual(pres);
        });
    })
  ));

  it('getMaps should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {

        const mres=[
          {
            "id": 1,
            "category": "final1",
            "name": "Lion Kings"
          },
          {
            "id": 2,
            "category": "final2",
            "name": "Lion Kings"
          },
          {
            "id": 3,
            "category": "winner",
            "name": "Lion Kings"
          }
        ];
      const expectedUrl = '/api/mapping';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mres })
          ));
        });

      TeamdataService.getMaps()
        .subscribe( (res:MapClass[]) => {
          let expected1:string;
          let expected2:string;
          let expected3:string;
          for(let i=0;i<res.length;i++){
            if(res[i].id==1) expected1=res[i].category
            else if(res[i].id==2) expected2=res[i].category
            else if(res[i].id==3) expected3=res[i].category 
            }
          expect(expected1).toEqual("final1");
          expect(expected2).toEqual("final2");
          expect(expected3).toEqual("winner");
          expect(res).toEqual(mres);
        });
    })
  ));

  it('deleteTeam should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {

        const dres=
          {
            "id": 12,
            "team": "Lion Kings",
            "country": "Australia",
            "coach": "Thomas"
          };
      const expectedUrl = '/api/teams/12';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Delete);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: dres })
          ));
        });

      TeamdataService.deleteTeam(12)
        .subscribe( (res: any) => {
          expect(res).toEqual(dres);
        });
    })
  ));

  it('editTeam should assign object', () => {
    const team:TeamClass=
          {
            "id": 12,
            "team": "Lion Kings",
            "country": "Australia",
            "coach": "Thomas"
          }
    service.editTeam(team);
    expect(service.currentTeam).toEqual(team);    
  })

  it('createTeam should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {
        const createres=
          {
            "id": null,
            "team": "new team",
            "country": "new country",
            "coach": "new coach"
          };
      const expectedUrl = '/api/teams';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: createres })
          ));
        });

      TeamdataService.createTeam(createres)
        .subscribe( (res: TeamClass) => {
          expect(res).toEqual(createres);
        });
    })
  ));

  it('createPlayer should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {
        const createpres=
          {
            "id": null,
            "teamId": 12,
            "team11status": true,
            "name": "new name",
            "type": "MidFielder",
            "age": 29
          };
      const expectedUrl = '/api/players';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: createpres })
          ));
        });

      TeamdataService.createPlayer(createpres)
        .subscribe( (res: PlayerClass) => {
          expect(res).toEqual(createpres);
        });
    })
  ));

  it('updateTeam should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {
      const updateres=
        {
          "id": 12,
          "team": "Lion Kings",
          "country": "Australia",
          "coach": "Thomas Gray"
        };
      const expectedUrl = '/api/teams/12';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Put);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: updateres })
          ));
        });

      TeamdataService.updateTeam(updateres)
        .subscribe( (res: any) => {
          expect(res).toEqual(updateres);
        });
    })
  ));

  it('updatePlayer should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {
        const updatepres=
          {
            "id": 8,
            "teamId": 12,
            "team11status": true,
            "name": "new name",
            "type": "MidFielder",
            "age": 29
          };
      const expectedUrl = '/api/players/8';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Put);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: updatepres })
          ));
        });

      TeamdataService.updatePlayer(updatepres)
        .subscribe( (res: any) => {
          expect(res).toEqual(updatepres);
        });
    })
  ));

  it('updateMap should return value from observable', fakeAsync(
    inject(
      [XHRBackend, TeamdataService ],
      (mockBackend: MockBackend, TeamdataService: TeamdataService) => {
        const updatemres=
          {
            "id": 8,
            "teamId": 12,
            "team11status": true,
            "name": "new name",
            "type": "MidFielder",
            "age": 29
          };
      const expectedUrl = '/api/mapping/8';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Put);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: updatemres })
          ));
        });

      TeamdataService.updateMapping(updatemres)
        .subscribe( (res: any) => {
          expect(res).toEqual(updatemres);
        });
    })
  ));

});
