import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SentenceComponent } from './components/sentence/sentence.component';

import { ConnectorService } from './services/connector.service';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: BaseComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'add', component: AddComponent },
    { path: 'sentence', component: SentenceComponent }
  ] },
  { path: '', component: LoadingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    AddComponent,
    LoadingComponent,
    SentenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ConnectorService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
