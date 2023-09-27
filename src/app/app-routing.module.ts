import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {path: '', component: ContainerComponent},
  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
