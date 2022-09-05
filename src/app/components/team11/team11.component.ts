import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamdataService } from '../../services/teamdata.service';
import { PlayerClass } from '../../model/PlayerClass';
import { TeamClass } from '../../model/TeamClass';

@Component({
  selector: 'app-team11',
  templateUrl: './team11.component.html',
  styleUrls: ['./team11.component.css']
})
export class Team11Component implements OnInit {

  teamId:number;
  playerArray:PlayerClass[];
  teamArray:TeamClass;
  count11:number = 0;
  ids:number;  
  center="center";
  

  constructor(private actRoute:ActivatedRoute,private _teamService:TeamdataService) { }

  ngOnInit(): void {
    //should call the respective team-'getMyTeam(id)' by fetching the id from url using activated route  
    this.teamId = this.actRoute.snapshot.params['id'];  
    this.getMyTeam(this.teamId);
    //should call getPlayers
    this.getPlayers();
    
  }

  getMyTeam(id){
        //should retrieve specific team details by id
        this._teamService.getSpecificTeam(id).subscribe((data:TeamClass)=>{
          console.log(data);
          this.teamArray = data;
        })

  }
  
  getPlayers(){
        //should retreive player details
        this._teamService.getPlayers().subscribe((data:PlayerClass[])=>{
          console.log(data);
          this.playerArray = data;
        });

  }

  checkTeam11():boolean{
    //check no of players less than 11 or not,if <11 return true else false
    this.check();
    if(this.count11<11){
      return true;
    }
    return false;
  }

  check(){
    this.count11 = 0;
    for(let player of this.playerArray){
      if(player.teamId==this.teamId && player.team11status==true){
        this.count11++;
        console.log("count-"+this.count11);
      }
    }
  }

  toTeam11(player){
    if(this.checkTeam11()){
      player.team11status = true;
      this._teamService.updatePlayer(player).subscribe((data:PlayerClass)=>{
        console.log(data);
      });
    }
    else{
      window.alert('There are already 11 players');
    }
    //update the team11 players by assign team11status=true after checking no of players, 
    //if there is already 11,then should display alert message "There are already 11 players"
  }
    
  initialise(){
    this.ids=0;
  }
  increment(){
    this.ids++;
  }

  clearFromTeam11(player){
    player.team11status = false;
    console.log(player);
    this._teamService.updatePlayer(player).subscribe((data:PlayerClass)=>{
      console.log(data);
    });
    //update the team11 players by assign team11status=false
   
  }
  
}
