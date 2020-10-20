INSERT INTO StaffRole
    (StaffType)
VALUES('Admin'),
    ('Clinician');

INSERT INTO Staff
    (StaffID,FirstName,SurName,[Password],Salt,RoleID)
VALUES('STAFFID', 'Stephen', 'Grouios', HASHBYTES('SHA2_512','password'), 'salt', 1),
    ('STAFFID2', 'John', 'Konstantinou', HASHBYTES('SHA2_512','password'), 'salt', 2);

INSERT INTO Patient
    (HospitalNumber,Email,Title,SurName,FirstName,Gender,DOB,[Address],Suburb,PostCode,MobileNumber,HomeNumber,CountryOfBirth,PreferredLanguage,[Password],Salt,LivesAlone,RegisteredBy,Active)
VALUES('123456789', 'patient@patient.com', 'Mr', 'Henry', 'Mitchell', 'Male', GETDATE(), '123trump St', 'Cheltenham', '1234', '0123456789', '0123456789', 'Australia', 'English', HASHBYTES('SHA2_512','password'), 'salt', 0, 'STAFFID2', 1);

INSERT INTO Measurement
    (MeasurementName, Frequency)
VALUES('ECOG Status', 1),
    ('Likert Scale', 1),
    ('Breathlessness', 1),
    ('Level of Pain', 1),
    ('Fluid Drain', 1),
    ('Quality of Life', 1),
    ('HADS',1);

INSERT INTO DataPoint
    (MeasurementID,DataPointNumber,UpperLimit,LowerLimit,[Name])
VALUES(1, 1, 4, 0, 'ECOG Status'),
    (2, 1, 5, 1, 'Likert Scale'),
    (3, 1, 10, 0, 'Breathlessness'),
    (4, 1, 10, 0, 'Vas Pain Input'),
    (4, 2, 10, 0, 'Vas Pain Slider'),
    (5, 1, 600, 1, 'Fluid Drain'),
    (6, 1, 5, 1, 'Mobility'),
    (6, 2, 5, 1, 'Self-Care'),
    (6, 3, 5, 1, 'Usual-Activies'),
    (6, 4, 5, 1, 'Pain/Discomfort'),
    (6, 5, 5, 1, 'Anxiety/Depression'),
    (6, 6, 100, 0, 'Vas Health'),
    (7,1,8,1,'Depression'),
    (7,2,8,1,'Anxiety');

INSERT INTO ResourceType
    (TypeName)
VALUES('phone'),
    ('pdf'),
    ('link'),
    ('dialog');

INSERT INTO [Resource]
    (Title,Prompt,Content,TypeID)
VALUES('Pleural Nurse Clinical Consultant', '0428-167-972', '', 1),
    ('How to perform a Visual Analogue Score', 'Click Here', '', 4),
    ('How to drain your Indwelling Pleural Catheter', 'Click Here', '', 4),
    ('Northern Health Respiratory Medicine', 'Click Here', 'https://www.nh.org.au/service/respiratory-medicine/', 3),
    ('Indwelling Pleural Catheter Information Sheet', 'Click Here', 'IPC.pdf', 2);

INSERT INTO ResourceDialog
    (Heading,Content,Video,ResourceID)
VALUES('How to perform VAS score', 'Instruction: To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today.', NULL, 2),
    ('How to drain your Indwelling Pleural Catheter', 'Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>', 'https://player.vimeo.com/video/270685188', 3);

INSERT INTO RecordCategory
    (Category)
VALUES('Immunisation');

INSERT INTO RecordType
    (RecordType,RecordCategoryID)
VALUES('MMR', 1);

INSERT INTO PatientRecord
    (DateTimeRecorded,Notes,HospitalNumber,RecordTypeID)
VALUES(GETDATE(), 'No Notes', '123456789', 1);

INSERT INTO Treating
    (StartDate,EndDate,HospitalNumber,StaffID)
VALUES(GETDATE(), GETDATE(), '123456789', 'STAFFID2');

INSERT INTO TemplateCategory
    (CategoryName)
VALUES('Indwelling Pleural Catheter');

INSERT INTO PatientCategory
    (CategoryID,HospitalNumber)
VALUES(1, '123456789');

INSERT INTO PatientResource
    (CategoryID,HospitalNumber,ResourceID)
VALUES(1, '123456789', 1);

INSERT INTO TemplateResource
    (CategoryID,ResourceID)
VALUES(1, 1);

INSERT INTO TemplateMeasurement
    (MeasurementID,CategoryID)
VALUES(1, 1);

INSERT INTO PatientMeasurement
    (MeasurementID,CategoryID,HospitalNumber)
VALUES(1, 1, '123456789');

INSERT INTO MeasurementRecord
    (DateTimeRecorded,MeasurementID,CategoryID,HospitalNumber)
VALUES(GETDATE(), 1, 1, '123456789');

INSERT INTO DataPointRecord
    (HospitalNumber,CategoryID,MeasurementID,DataPointNumber,[value],MeasurementRecordID)
VALUES('123456789', 1, 1, 1, 1, 1);