import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {

  workflows: workflow[] = [
    {
      name: "Workflow 1",
      stage: "pending",
      canBeCompleted: false
    },
    {
      name: "Workflow 2",
      stage: "completed",
      canBeCompleted: false
    },
    {
      name: "Workflow 3",
      stage: "completed",
      canBeCompleted: true
    }
  ];

  constructor(private router: Router) { }

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

  removeWorkflow(item){
    this.workflows = this.workflows.filter(element => {
      return element.name != item.name;
    })
  }

}

export interface workflow {
  name: string;
  stage: string;
  canBeCompleted: boolean;
}
