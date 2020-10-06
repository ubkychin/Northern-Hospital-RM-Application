import { ResourceDialog } from './resource-dialog';

export class PatientResource {
    heading: string;
    type: string;
    prompt: string;
    pdfFileName?: string;
    hyperlink?: string;
    dialog?: ResourceDialog;
}