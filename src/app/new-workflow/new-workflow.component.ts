import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { workflow } from '../models/workflow.model';
import { AppState } from '../app.state';
import * as WorkflowActions from '../actions/workflow.actions';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.scss']
})
export class NewWorkflowComponent implements OnInit {

  private sub: any;
  workflow: workflow = {
    isComplete: false,
    name: '',
    nodes: [],
    stage: ''
  };

  workflowForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  workflowIndex: number;

  constructor(private _bottomSheet: MatBottomSheet, private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let $this = this;
    this.sub = this.route.params.subscribe(params => {
      this.workflowIndex = +params['id'];
      if(!isNaN(+params['id'])){
        $this.store.select('workflow').pipe(take(1)).subscribe(data => {
          var wfD = data.filter((ele,index) => {
            if(index == +params['id'])
            {
                return ele;
            }
          });
          let wfData = {...wfD[0]};
          if(wfData){
            $this.assignWorkflow(wfData);
          }
        });
      }
    });
  }

  assignWorkflow(wfData){
    this.workflow = {
      isComplete: wfData["isComplete"],
      name: wfData["name"],
      nodes: wfData["nodes"],
      stage: wfData["stage"]
    }
    this.workflowForm.controls['name'].setValue(wfData["name"]);
  }

  openBottomSheet(formValue?): void {
    let bottomSheetRef = this._bottomSheet.open(formBottomSheet, {
     data: {data: formValue, closeOnNavigation: true}
    });
    bottomSheetRef.afterDismissed().subscribe(data => {
      if(data){
        if(!formValue){
          this.addNode(data);
        }
        else{
          this.editNode(formValue,data);
        }
      }
    });
  }

  addNode(d){
    let data = {...d};
    let object = {
      content: data.content,
      name: data.name,
      state: 'pending'
    }
    this.workflow["nodes"] = [...this.workflow["nodes"], object];//.push(object);
    console.log(this.workflow);
  }

  editNode(prevdata,newdata){
    this.workflow.nodes.forEach(ele => {
      if(prevdata.name == ele.name){
        ele.name = newdata.name;
        ele.content = newdata.content;
      }
    });
  }

  changeState(item, index){
    console.log(this.workflow.nodes[index-1]);
    let temp = [...this.workflow.nodes];
    if(this.workflow.nodes[index-1]){
      if(this.workflow.nodes[index-1].state == 'completed')
      {
        if(item.state == 'pending'){
          this.workflow.nodes[index].state = 'In Progress';
        }
        else if(item.state == 'In Progress'){
          this.workflow.nodes[index].state = 'completed';
        }
        else if(item.state == 'completed'){
          this.workflow.nodes[index].state = 'pending';
        }
        this.checkIsComplete();
      }
      else{
        alert("Complete previous node");
      }
    }
    else{
      if(item["state"] == 'pending'){
        temp[index]["state"] = 'In Progress';
      }
      else if(item["state"] == 'In Progress'){
        temp[index]["state"] = 'completed';
      }
      else if(item["state"] == 'completed'){
        temp[index]["state"] = 'pending';
      }
      this.checkIsComplete();
    }
    this.workflow.nodes = [...temp];
    this.processAfterNodes(index);
     
  }

  processAfterNodes(index){
    let da = [...this.workflow.nodes];
    da.forEach((ele,i) => {
      if(i > index){
        ele["state"] = 'pending';
      }
    });
    this.workflow.nodes = [...da];
  }

  checkIsComplete(){
    let isComplete = true;
    this.workflow.nodes.forEach(ele => {
      if(ele.state != 'completed'){
        isComplete = false;
      }
      return;
    });
    this.workflow.isComplete = isComplete;
  }

  deleteNode(){
    this.workflow.nodes.pop();
  }

  saveWorkflow(){
    let workflow = {
      isComplete:  this.workflow.isComplete,
      name: this.workflowForm.value.name,
      nodes: this.workflow.nodes,
      stage: 'pending'
    }
    if(this.workflowForm.value.name){
      if(!isNaN(this.workflowIndex)){
        this.store.dispatch(new WorkflowActions.EditWorkflow({payload: workflow, index: this.workflowIndex }));
      }
      else{
        this.store.dispatch(new WorkflowActions.AddWorkflow(workflow));
      }
      this.router.navigate([`workflow`]);
    }
  }
}

@Component({
  selector: 'openform',
  templateUrl: 'editform.html',
  styleUrls: ['./new-workflow.component.scss']
})
export class formBottomSheet {
  matcher = new MyErrorStateMatcher();
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<formBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {
      if(data.data){
        this.nodeForm.controls['name'].setValue(data.data.name);
        this.nodeForm.controls['content'].setValue(data.data.content);
      }
    }

  nodeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  nodeFormSubmit(form){
    if(form.name && form.content){
      this._bottomSheetRef.dismiss(form);
    }
  }
}
