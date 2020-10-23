export class Patient {
    URNumber: string;
    categoryId: number;
    patientCategories: PatientCategory [];
}

export class PatientCategory{
    categoryId: number;
    measurementIds: number [];
}

