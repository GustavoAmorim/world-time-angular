import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SimpleWorldTimeComponent } from './components/simple-world-time/simple-world-time.component';
// import { TimeSelectorComponent } from './components/time-selector/time-selector.component';

const routes: Routes = [{
  path: '**',
  component: SimpleWorldTimeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
