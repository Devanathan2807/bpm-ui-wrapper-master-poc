import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { TaskComponent } from './Task/task.component';
import { CamundaDialogueModelComponent } from './camunda-dialogue-model/camunda-dialogue-model.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'Task',component:TaskComponent},
  { path: 'camundaDialogueModeule',component:CamundaDialogueModelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
