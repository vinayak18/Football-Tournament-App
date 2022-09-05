import { Component, OnInit } from '@angular/core';
import { TeamdataService } from '../../services/teamdata.service';
import { TeamClass } from '../../model/TeamClass';
import { MapClass } from '../../model/MapClass';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  constructor(private _teamService:TeamdataService) { }
  
  center="center";
  team1SemiFinal:string;
  team2SemiFinal:string;
  finalTeam:string;
  team1="";
  team2="";
  team3="";
  team4="";
  numberOfTeams:number;
  currentMap:MapClass={
    id:null,
    category:'',
    name:''
  }
  
  ngOnInit(): void {

    //should call getTeams and getMappings
    this.getTeams();
    this.getMappings();
  
  }
  
  onSelect1(team){
    //should update the team name with the parameter in id=1 and category as semi-final1
    //if the parameter is clear then update it with empty string ''
    if(team==='clear'){
      team = '';
    }
    this.team1SemiFinal = team;
    this.currentMap={
      id:1,
      category:"semi-final1",
      name:team
    }
    this.updateMapping(this.currentMap);
  }

  onSelect2(team){
    //should update the team name with the parameter in id=2 and category as semi-final2
    //if the parameter is clear then update it with empty string ''
    if(team==='clear'){
      team = '';
    }
    this.team2SemiFinal = team;
    this.currentMap={
      id:2,
      category:"semi-final2",
      name:team
    }
    this.updateMapping(this.currentMap);
  }  
  
  
  onSelect3(team){
    //should update the team name with the parameter in id=3 and category as final1
    //if the parameter is clear then update it with empty string ''
    if(team==='clear'){
      team = '';
    }
    this.finalTeam = team;
    this.currentMap={
      id:3,
      category:"final1",
      name:team
    }
    this.updateMapping(this.currentMap);
    
  }

  updateMapping(mapTeam){
    //update the mapping by calling service
    this._teamService.updateMapping(mapTeam).subscribe((data:any)=>{

    });
  }

  getTeams(){
    //should retrieve team details by calling service
    this._teamService.getTeams().subscribe((data:TeamClass[])=>{
      console.log(data);
      this.numberOfTeams = data.length;
      if(this.numberOfTeams>=4){
        this.team1 = data[0].team;
        this.team2 = data[1].team;
        this.team3 = data[2].team;
        this.team4 = data[3].team;
      }
    });
  }

  getMappings(){
    //should retrieve map details by calling service
    this._teamService.getMaps().subscribe((data:MapClass[])=>{
      console.log(data);
    });
          
  }

          
}
        

        
  
  

  

