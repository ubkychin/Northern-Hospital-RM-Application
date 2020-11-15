export class ConditionDetails {
    diagnosis: string;
    procedureDate: Date;
    nextAppointment: Date;
    myDrainage?: MyDrainage;
}

export class MyDrainage {
    frequency: number;
    fluidScore: number;
    drainageDate: Date;
    breathScore: number;
    painScore: number;
}
