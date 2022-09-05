import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamClass } from '../../model/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';
import { PlayerClass } from '../../model/PlayerClass';
import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {

  playerArray:PlayerClass[];
  teamId;
  @ViewChild(NgForm) ngForm: NgForm;
  playerDetail:PlayerClass={
    id:null,
    teamId:null,
    team11status:null,
    name:'',
    type:'',
    age:null
  }
  typesOfPlayer=["Defender","GoalKeeper","MidFielder","Attacker"];
  teamArray:TeamClass;

  constructor(private actRoute:ActivatedRoute,private _teamService:TeamdataService) { }
   
  ngOnInit(): void {
    this.teamId = this.actRoute.snapshot.params['id'];
    console.log('id'+this.teamId);
    this.getMyTeam(this.teamId);
    this.getPlayers();
    //should call the respective team-'getMyTeam(id)' by fetching the id from url   
    //should call getPlayers
    
  }

  getMyTeam(id){
    //should retrieve specific team details by id
    this._teamService.getSpecificTeam(id).subscribe((data:TeamClass)=>{
      this.teamArray=data;
    })
  }


  getPlayers(){
    //should retreive player details store them in playerArray
    this._teamService.getPlayers().subscribe((data:PlayerClass[])=>{
      console.log(data);
      this.playerArray = data;
    });

  }
    
  editPlayers(player){
    //should assign in the form by object assign for edit
    this.playerDetail={
      id:player.id,
      teamId:player.teamId,
      team11status:player.team11status,
      name:player.name,
      type:player.type,
      age:player.age
    }
  }
  
  deletePlayer(id:number){
    //should delete the specific player
    console.log(this.playerArray);
    this._teamService.deletePlayer(id).subscribe((data:PlayerClass)=>{

    });
  }

  createOrUpdatePlayer(form:NgForm,p:PlayerClass){
    console.log(p);
    if(p.id===null){
      this._teamService.createPlayer(p).subscribe((data)=>{
        window.alert("Player Details Added");
      })
    }
    else{
      this._teamService.updatePlayer(p).subscribe((data)=>{
        window.alert("Player Details Updated");
      })
    }
    //should create or update the player by checking the id,if it is null call createTeam service else call updateTeam
  }
  
  clear(){
    //should assign tha current team to be undefined 
    this.playerDetail = undefined;
  }

}
