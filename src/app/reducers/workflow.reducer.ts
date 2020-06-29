import { Action } from '@ngrx/store';
import { workflow } from '../models/workflow.model';
import * as WorkflowActions from '../actions/workflow.actions';

export function reducer(state : workflow[] = [], action: WorkflowActions.Actions){
    switch(action.type){
        case WorkflowActions.ADD_WORKFLOW: 
            return [...state, action.payload];
        case WorkflowActions.REMOVE_WORKFLOW: 
            state = state.filter((ele, index) => {
                if(index != action.payload)
                {
                    return ele;
                }
            });
            return state;
        case WorkflowActions.EDIT_WORKFLOW:
            let s = [...state];
            s[action.payload.index] = {...action.payload.payload};
            state = [...s];
            return state;
        default:
            return state;
    }
}