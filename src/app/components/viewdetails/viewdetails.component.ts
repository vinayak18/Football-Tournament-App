import { Component, OnInit } from '@angular/core';
import { TeamClass } from '../../model/TeamClass';
import { Router } from '@angular/router';
import { TeamdataService } from '../../services/teamdata.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {


  teamArray:TeamClass[];

  constructor(private _teamService: TeamdataService,private router: Router) { }
  
  getTeams(){
    //should retrieve team details and store in teamArray
    this._teamService.getTeams().subscribe((data:TeamClass[])=>{
      this.teamArray = data;
    });
  }
  

  deleteTeam(id:number){
      //should delete the specific team by id
      this._teamService.deleteTeam(id).subscribe((data:TeamClass)=>{
        console.log(data);
      });
  }

  editTeam(team:TeamClass){
       //should assign in the form in registration component by object assign for edit
       this._teamService.editTeam(team);
      //should navigate to registration component with the id 1234
      this.router.navigate(['/register/'+team.id]);  

  }

  PlayerDetails(team){
    this.router.navigate(['/players/'+team.id]);
   //should route to the players component with the specific team id
  }

  team11(team){
    this.router.navigate(['/team11/'+team.id]);
   //should route to the team11 component with the specific team id
  }

  ngOnInit(): void {
   //should call getTeams
   this.getTeams();
  }

}
