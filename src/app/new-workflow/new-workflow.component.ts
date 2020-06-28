import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.scss']
})
export class NewWorkflowComponent implements OnInit {

  workflow: workflow = {
    nodes: [
      {
        content: "Some Content",
        name: "first node",
        state: 'pending'
      },
      {
        content: "Some Content",
        name: "second node",
        state: 'pending'
      },
      {
        content: "Some Content",
        name: "third node",
        state: 'pending'
      }
    ],
    isComplete: false,
    name: "Workflow 1"
  };

  workflowForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private _bottomSheet: MatBottomSheet) { }

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
    console.log();
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


export interface nodes {
  name: string;
  content: string;
  state: string;
}

export interface workflow {
  nodes: nodes[];
  isComplete: boolean;
  name: string;
}
