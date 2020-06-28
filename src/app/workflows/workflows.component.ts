import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { workflow } from '../models/workflow.model';
import { AppState } from '../app.state';
import * as WorkFlowActions from '../actions/workflow.actions';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {

  workflows: Observable<workflow[]>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.workflows = store.select('workflow');
   }

  ngOnInit(): void {
  }

  changeState(item){
    if(item.canBeCompleted){
      if(item.stage == 'pending'){
        item.stage = 'completed';
      }
      else if(item.stage == 'completed'){
        item.stage = 'pending';
      }
    }
    else{
      alert("Complete nodes first.");
    }
  }

  addWorkflow(){
    this.router.navigate([`add-workflow`]);
  }

  editWorkflow(index){
    this.router.navigate([`add-workflow/${index}`]);
  }

  removeWorkflow(index){
    console.log(index);
    this.store.dispatch(new WorkFlowActions.RemoveWorkflow(index));
  }
}