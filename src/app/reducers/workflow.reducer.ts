import { Action } from '@ngrx/store';
import { workflow } from '../models/workflow.model';
import * as WorkflowActions from '../actions/workflow.actions';

const initialWorkflow: workflow = {
    nodes: [],
    isComplete: true,
    name: 'Test workflow',
    stage: 'completed'
}

export function reducer(state : workflow[] = [initialWorkflow], action: WorkflowActions.Actions){
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
        default:
            return state;
    }
}