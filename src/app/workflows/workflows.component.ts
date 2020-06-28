import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { workflow } from '../models/workflow.model';
import { AppState } from '../app.state';
import * as WorkFlowActions from '../actions/workflow.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {

  workflows: workflow[];
  completeWorkflow: workflow[];

  searchForm = new FormGroup({
    search: new FormControl(null),
    filter: new FormControl(null),
  });

  constructor(private router: Router, private store: Store<AppState>) {
    store.select('workflow').pipe(take(1)).subscribe(data =>{
      this.workflows = [...data];
      this.completeWorkflow = [...data];
    });
   }

  ngOnInit(): void {
  }

  changeState(item){
    if(item.isComplete){
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

  searchSubmit(form){
    this.workflows = [...this.completeWorkflow];
    this.workflows = this.workflows.filter(ele => {
      if(!form.search && !form.filter){
        return ele;
      }
      else if(form.search || form.filter){
        if(form.search && form.filter){
          if(form.filter == 'all'){
            if(ele.name.toLowerCase().includes(form.search.toLowerCase())){
              return ele;
            }
          }
          else{
            if(ele.name.toLowerCase().includes(form.search.toLowerCase()) && ele.stage.toLowerCase().includes(form.filter.toLowerCase())){
              return ele;
            }
          }
        }
        else if(form.search){
          if(ele.name.toLowerCase().includes(form.search.toLowerCase())){
            return ele;
          }
        }
        else if(form.filter){
          if(form.filter == 'all'){
            return ele;
          }
          else if(ele.stage.toLowerCase().includes(form.filter.toLowerCase())){
            return ele;
          }
        }
      }
    });
  }
}