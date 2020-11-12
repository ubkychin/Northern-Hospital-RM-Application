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
    breathScore: number;
    painScore: number;
    drainageDate: Date;

}
