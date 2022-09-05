import { Injectable} from '@angular/core';
import { TeamClass } from '../model/TeamClass';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { PlayerClass } from '../model/PlayerClass';
import { MapClass } from '../model/MapClass';
import { HttpClient } from '@angular/common/http';
import { urls } from '../model/apiUrl';

@Injectable()

export class TeamdataService {

  currentTeam:TeamClass = {
    id:null,
    team:'',
    country:'',
    coach:''
  };;
  errorMessage:string='';
  
  teamUrl = urls.api+'/teams';        // "/api/teams" - use this url to retrieve team details;
  playerUrl =  urls.api+'/players';      // "/api/players" - use this url to retrieve player details;
  mapUrl = urls.api+'/mapping';         // "/api/mapping' - use this url to retrieve mapping details;;

  
  constructor(private http:HttpClient) { }

  getValue(){
    return this.currentTeam;
  }


  getTeams():Observable<TeamClass[]>{
    //should return team details retrieved from server
    return this.http.get(this.teamUrl).map((res: Response)=>{
      let result = res as unknown as TeamClass[];
      return result;
    });
  }

  getSpecificTeam(id:number):Observable<TeamClass>{
    //should return specific team by id details retrieved from server
    return this.http.get(this.teamUrl+'/'+id).map((res: Response)=>{
      let result = res as unknown as TeamClass;
      return result;
    });
  }

  getPlayers():Observable<PlayerClass[]>{
    //should return player details retrieved from server
    return this.http.get(this.playerUrl).map((res: Response)=>{
      let result = res as unknown as PlayerClass[];
      return result;
    });
  }

  getMaps():Observable<MapClass[]>{
    //should return mapping details retrieved from server
    return this.http.get(this.mapUrl).map((res: Response)=>{
      let result = res as unknown as MapClass[];
      return result;
    });
  }

  deleteTeam(id:number):Observable<TeamClass>{
    //should delete the team by id and return the deleted team from server
    return this.http.delete(this.teamUrl+'/'+id).map((res: Response)=>{
      let result = res as unknown as TeamClass;
      return result;
    });
  }

  deletePlayer(id:number):Observable<PlayerClass>{
    //should delete the player by id and return the deleted player from server
    return this.http.delete(this.playerUrl+'/'+id).map((res: Response)=>{
      let result = res as unknown as PlayerClass;
      return result;
    });
  }

  editTeam(team:TeamClass){
    this.currentTeam={
      id:team.id,
      team:team.team,
      country:team.country,
      coach:team.coach
    }
    //should assign the object for team to edit in form
  }

  updateTeam(team:TeamClass):Observable<any>{
        // should return team details if successfully updated the details
    return this.http.put(this.teamUrl+"/"+team.id,team).map((res: Response)=>{
      let result = res as unknown as TeamClass;
      return result;
    });
        
  }  
      
  createTeam(team:TeamClass):Observable<any>{
    // should return response from server if team Details added successfully

    return this.http.post(this.teamUrl,team).map((res: Response)=>{
      let result = res as unknown as TeamClass;
      return result;
    });
  }
  
  createPlayer(p:PlayerClass):Observable<any>{
        // should return response from server if player Details added successfully

        return this.http.post(this.playerUrl,p).map((res: Response)=>{
          let result = res as unknown as PlayerClass;
          return result;
        });
  }
  
  updatePlayer(p):Observable<any>{
    // should return player details if successfully updated the details
    return this.http.put(this.playerUrl+"/"+p.id,p).map((res: Response)=>{
      let result = res as unknown as PlayerClass;
      return result;
    });
  }

  updateMapping(team):Observable<any>{
    // should return map details if successfully updated the details
    return this.http.put(this.mapUrl+"/"+team.id,team).map((res: Response)=>{
      let result = res as unknown as MapClass;
      return result;
    });
  }

  clear(){
    
   this.currentTeam={
      id:null,
      team:'',
      country:'',
      coach:''
    }
    return this.currentTeam;
  }
    
}
