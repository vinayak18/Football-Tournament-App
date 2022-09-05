import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamClass } from '../../model/TeamClass';
import { TeamdataService } from '../../services/teamdata.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  IsValidateSuccess:boolean=true;
  substr = '';
  teamArray:TeamClass[] = []
  @ViewChild(NgForm) ngForm: NgForm;
  id:number = null;
  currentTeam:TeamClass = this._teamService.currentTeam; // getValue from service
  

  constructor(private router:Router,private actRoute:ActivatedRoute,private _teamService:TeamdataService) { }

  ngOnInit(): void {
   console.log(this.currentTeam);
   //should get the id 1234 by fetching the id from url using activated route for not reseting the form if it routed from edit option     
    this.id = this.actRoute.snapshot.params['id'];
    console.log('id'+this.id);
    //should call getTeams()
    this.getTeams();
   //reset the form
   if(this.id===undefined || this.id===null || this.id==1234){
     this.clear();
   }
   
  }
  getTeams(){
    //should retrieve team details
    this._teamService.getTeams().subscribe((data:TeamClass[])=>{
      console.log(data);
      this.teamArray = data;
    });
  }

  checkTeamCountryDuplicates(data):boolean{
    //check team and country name is already exists or not. if exists return true
     for(let x of this.teamArray){
       console.log("x--");
       console.log(x);
      if(x.team === data.team || x.country === data.country){
        window.alert("Team Name or Country Name Already Exists");
        return true;
      }
    }
     return false;
  }
  
  createOrUpdate(form:NgForm,team:TeamClass){
    
      //should call checkTeamCountryDuplicates(team) for checking team/country name already exists
    if(team!==undefined && team.id===null){
      this.currentTeam = team;
      this.checkTeamCountryDuplicates(this.currentTeam);
      this._teamService.createTeam(team).subscribe((data)=>{
        window.alert("Team Details Added");
      })
    }
    else{
      this._teamService.updateTeam(team).subscribe((data)=>{
        window.alert("Team Details Updated");
      })
    }
       //should create or update the team by checking the id,if it is null call createTeam service else call updateTeam
      
      // should navigate to viewdetails component after successfully create/update the details
    this.router.navigateByUrl('/viewdetails');
  }

  clear(){
      this.currentTeam = this._teamService.clear();
      //should assign tha current team to be undefined    
  
  } 

}
