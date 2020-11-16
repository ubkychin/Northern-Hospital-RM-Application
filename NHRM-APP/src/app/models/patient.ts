export class Patient {
    name: string;
    urNumber: string;
    categoryId: number;
    patientCategories: PatientCategory[];
}

export class PatientCategory {
    categoryId: number;
    measurementIds: number[];
}

