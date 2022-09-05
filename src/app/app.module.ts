import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlayersComponent } from './components/players/players.component';
import { Team11Component } from './components/team11/team11.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { TeamdataService } from './services/teamdata.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MappingComponent,
    NavigationComponent,
    PlayersComponent,
    Team11Component,
    ViewdetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TeamdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
