import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { StoreModule } from '@ngrx/store';
import { userListReducer } from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as userListEffects from "./store/user.effects"
import { EffectsModule } from '@ngrx/effects';

import { UserListService } from './user-list.service';

@NgModule({
  declarations: [AppComponent, AddUserComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    StoreModule.forRoot({
      userList: userListReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([userListEffects]),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserListService],
  bootstrap: [AppComponent],
})
export class AppModule { }
