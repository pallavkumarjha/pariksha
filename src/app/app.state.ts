import { workflow } from './models/workflow.model';

export interface AppState {
    readonly workflow: workflow[];
}