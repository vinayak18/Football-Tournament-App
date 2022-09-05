import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlayersComponent } from './components/players/players.component';
import { Team11Component } from './components/team11/team11.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';


export const routes: Routes = [
  {path:"register",component:RegistrationComponent},
  {path:"viewdetails",component:ViewdetailsComponent},
  {path:"map",component:MappingComponent},
  {path:"register/:id",component:RegistrationComponent},
  {path:"players/:id",component:PlayersComponent},
  {path:"team11/:id",component:Team11Component},
  {path:"",redirectTo:"register",pathMatch:"full"}
];