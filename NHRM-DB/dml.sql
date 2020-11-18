INSERT INTO StaffRole
    (StaffType)
VALUES('Admin'),
    ('Clinician');

INSERT INTO Staff
    (Email,FirstName,Surname,[Password],Salt,RoleID)
VALUES('staff@staff.com', 'Staff', 'One', HASHBYTES('SHA2_512', CONCAT('password', 'salt', 'this15myp3pper')), 'salt', 1),
    ('staff2@staff.com', 'Staff', 'Two', HASHBYTES('SHA2_512', CONCAT('password', 'salt', 'this15myp3pper')), 'salt', 2);

INSERT INTO Patient
    (URNumber,Email,Title,SurName,FirstName,Gender,DOB,[Address],Suburb,PostCode,MobileNumber,HomeNumber,CountryOfBirth,PreferredLanguage,[Password],Salt,LivesAlone,RegisteredBy,Active)
VALUES('123456789', 'patient@patient.com', 'Mrs', 'Doe', 'Jane', 'Female', GETDATE(), '123 Evergreen Terrace', 'Springfield', '1234', '0123456789', '0123456789', 'Australia', 'English', HASHBYTES('SHA2_512', CONCAT('password', 'salt', 'this15myp3pper')), 'salt', 0, 1, 1),
    ('987654321', 'patient2@patient.com', 'Mr', 'Doe', 'John', 'Male', GETDATE(), '123 Evergreen Terrace', 'Springfield', '1234', '0123456789', '0123456789', 'Australia', 'English', HASHBYTES('SHA2_512', CONCAT('password', 'salt', 'this15myp3pper')), 'salt', 0, 1, 1);

INSERT INTO Measurement
    (MeasurementName, Frequency)
VALUES('ECOG Status', 28),
    ('Breathlessness', 1),
    ('Level of Pain', 1),
    ('Fluid Drain', 1),
    ('Quality of Life', 7);

INSERT INTO DataPoint
    (MeasurementID,DataPointNumber,UpperLimit,LowerLimit,[Name])
VALUES(1, 1, 4, 0, 'ECOG Status'),
    (2, 1, 5, 1, 'Breathlessness'),
    (3, 1, 5, 1, 'Level of Pain'),
    (4, 1, 600, 0, 'Fluid Drain'),
    (5, 1, 5, 1, 'Mobility'),
    (5, 2, 5, 1, 'Self-Care'),
    (5, 3, 5, 1, 'Usual-Activies'),
    (5, 4, 5, 1, 'Pain/Discomfort'),
    (5, 5, 5, 1, 'Anxiety/Depression'),
    (5, 6, 100, 0, 'QoL Vas Health Slider');

INSERT INTO ResourceType
    (TypeName)
VALUES('phone'),
    ('pdf'),
    ('link'),
    ('dialog');

INSERT INTO [Resource]
    (Title,Prompt,Content,TypeID)
VALUES('Pleural Nurse Clinical Consultant', '0428-167-972', '', 1),
    ('How to drain your Indwelling Pleural Catheter', 'Click Here', '', 4),
    ('Northern Health Respiratory Medicine', 'Click Here', 'https://www.nh.org.au/service/respiratory-medicine/', 3),
    ('Indwelling Pleural Catheter Information Sheet', 'Click Here', 'IPC.pdf', 2),
    ('Northern Health Telehealth', 'Click Here', 'https://www.nh.org.au/telehealth/', 3);

INSERT INTO ResourceDialog
    (Heading,Content,Video,ResourceID)
VALUES('How to drain your Indwelling Pleural Catheter', 'Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>', 'https://player.vimeo.com/video/270685188', 2);

INSERT INTO RecordCategory
    (Category)
VALUES('Immunisation');

INSERT INTO RecordType
    (RecordType,RecordCategoryID)
VALUES('MMR', 1);

INSERT INTO PatientRecord
    (DateTimeRecorded,Notes,URNumber,RecordTypeID)
VALUES(GETDATE(), 'No Notes', '123456789', 1);

INSERT INTO Treating
    (StartDate,EndDate,URNumber,StaffID)
VALUES(GETDATE(), GETDATE(), '123456789', 1);

INSERT INTO TemplateCategory
    (CategoryName)
VALUES('Indwelling Pleural Catheter'),
    ('Asthma'),
    ('COPD');

INSERT INTO PatientCategory
    (CategoryID,URNumber)
VALUES(1, '123456789'),
    (1, '987654321'),
    (2, '987654321'),
    (3, '987654321');

INSERT INTO ConditionDetails 
(CategoryID, URNumber, Diagnosis, ProcedureDate, NextAppointment)
VALUES(1, '123456789', 'There has been a build-up of fluid around your lungs. Therefore, it is important for us to know and monitor how you are feeling by using this app  to allow us to best optimise your care. The app will be used in hospital and in clinic during follow-up.', GETDATE(), GETDATE()), 
(1, '987654321', 'There has been a build-up of fluid around your lungs. Therefore, it is important for us to know and monitor how you are feeling by using this app  to allow us to best optimise your care. The app will be used in hospital and in clinic during follow-up.', GETDATE(), GETDATE())

INSERT INTO PatientResource
    (CategoryID,URNumber,ResourceID)
VALUES(1, '123456789', 1),
    (1, '123456789', 2),
    (1, '123456789', 3),
    (1, '123456789', 4),
    (1, '123456789', 5),
    (1, '987654321', 1),
    (1, '987654321', 2),
    (1, '987654321', 3),
    (1, '987654321', 4),
    (1, '987654321', 5);

INSERT INTO TemplateResource
    (CategoryID,ResourceID)
VALUES(1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);

INSERT INTO TemplateMeasurement
    (MeasurementID,CategoryID)
VALUES(1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1);

INSERT INTO PatientMeasurement
    (MeasurementID,CategoryID,URNumber,Frequency,FrequencySetDate)
VALUES(1, 1, '123456789', 28, GETDATE()),
    (2, 1, '123456789', 1, GETDATE()),
    (3, 1, '123456789', 1, GETDATE()),
    (4, 1, '123456789', 1, GETDATE()),
    (5, 1, '123456789', 7, GETDATE()),
    (1, 1, '987654321', 28, GETDATE()),
    (2, 1, '987654321', 1, GETDATE()),
    (3, 1, '987654321', 1, GETDATE()),
    (4, 1, '987654321', 1, GETDATE()),
    (5, 1, '987654321', 7, GETDATE());
