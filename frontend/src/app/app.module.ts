import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { ManageTaskComponent } from './pages/manage-task/manage-task.component';
import { CreateCatalogItemComponent } from './pages/create-catalog-item/create-catalog-item.component';
import { ManageCatalogItemComponent } from './pages/manage-catalog-item/manage-catalog-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageUserComponent,
    HomeComponent,
    LoaderComponent,
    LoginComponent,
    NavComponent,
    CreateUserComponent,
    CreateTaskComponent,
    ManageTaskComponent,
    CreateCatalogItemComponent,
    ManageCatalogItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    MenubarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent, NavComponent]
})
export class AppModule { }
