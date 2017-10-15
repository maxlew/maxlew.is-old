import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { HomeComponent } from './home/home.component';
import { PetraLoveComponent } from './petra-love/petra-love.component';

const appRoutes: Routes = [
  { path: 'loves/petra', component: PetraLoveComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    HomeComponent,
    PetraLoveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
