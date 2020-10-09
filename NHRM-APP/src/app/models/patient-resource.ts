import { ResourceDialog } from './resource-dialog';

export class PatientResource {
    title: string;
    type: string;
    prompt: string;
    action?: Action;
}

export class Action {
    value: any;
}