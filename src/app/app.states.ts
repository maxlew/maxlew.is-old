import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Transition } from '@uirouter/core';

export const homeState = {
  name: 'app',
  component: HomeComponent,
};

export const APP_STATES = [
  homeState,
];
