import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowsComponent } from './workflows/workflows.component';
import { LoginComponent } from './login/login.component';
import { NewWorkflowComponent } from './new-workflow/new-workflow.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'workflow',
    component: WorkflowsComponent,
  },
  {
    path: 'add-workflow/:id',
    component: NewWorkflowComponent,
  },
  {
    path: 'add-workflow',
    component: NewWorkflowComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
