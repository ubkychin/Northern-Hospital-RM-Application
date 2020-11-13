export class ConditionDetails {
    urNumber: string;
    diagnosis: string;
    insertionDate: Date;
    nextAppointment: Date;
    myDrainage: MyDrainage;
}

export class MyDrainage {
    frequency: number;
    fluidScore: number;
    drainageDate: Date;
    breathScore: number;
    painScore: number;
}
