import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { workflow } from '../models/workflow.model';

export const ADD_WORKFLOW = '[WORKFLOW] Add'
export const REMOVE_WORKFLOW = '[WORKFLOW] Remove'

export class AddWorkflow implements Action {
    readonly type = ADD_WORKFLOW
    constructor(public payload: workflow){}
}

export class RemoveWorkflow implements Action {
    readonly type = REMOVE_WORKFLOW
    constructor(public payload: number){}
}

export type Actions = AddWorkflow | RemoveWorkflow