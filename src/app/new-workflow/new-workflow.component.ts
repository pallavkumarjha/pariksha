import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { workflow } from '../models/workflow.model';
import { AppState } from '../app.state';
import * as WorkflowActions from '../actions/workflow.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.scss']
})
export class NewWorkflowComponent implements OnInit {
  workflow: workflow = {
    isComplete: false,
    name: "t",
    nodes: [],
    stage: 'ts'
  };

  workflowForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private _bottomSheet: MatBottomSheet, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  openBottomSheet(formValue?): void {
    let bottomSheetRef = this._bottomSheet.open(formBottomSheet, {
     data: {data: formValue, closeOnNavigation: true}
    });
    bottomSheetRef.afterDismissed().subscribe(data => {
      console.log("fvvvvvvvvv",formValue);
      if(!formValue){
        this.addNode(data);
      }
      else{
        this.editNode(formValue,data);
      }
    });
  }

  addNode(data){
    let object = {
      content: data.content,
      name: data.name,
      state: 'pending'
    }
    this.workflow.nodes.push(object);
  }

  editNode(prevdata,newdata){
    this.workflow.nodes.forEach(ele => {
      if(prevdata.name == ele.name){
        ele.name = newdata.name;
        ele.content = newdata.content;
      }
    });
  }

  changeState(item){
    console.log(item);
      if(item.state == 'pending'){
        item.state = 'In Progress';
      }
      else if(item.state == 'In Progress'){
        item.state = 'completed';
      }
      else if(item.state == 'completed'){
        item.state = 'pending';
      }
      this.checkIsComplete();
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
    console.log("workflowwwww",this.workflow);
    let workflow = {
      isComplete:  this.workflow.isComplete,
      name: this.workflowForm.value.name,
      nodes: this.workflow.nodes,
      stage: 'pending'
    }
    this.store.dispatch(new WorkflowActions.AddWorkflow(workflow));
    this.router.navigate([`workflow`]);
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
        console.log(data);
        this.nodeForm.controls['name'].setValue(data.data.name);
        this.nodeForm.controls['content'].setValue(data.data.content);
      }
    }

  nodeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  nodeFormSubmit(form){
    this._bottomSheetRef.dismiss(form);
  }
}
