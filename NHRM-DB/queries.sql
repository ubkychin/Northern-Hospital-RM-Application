DROP TABLE IF EXISTS DataPointRecord;

DROP TABLE IF EXISTS SurveyAnswer;

DROP TABLE IF EXISTS SurveyQuestion;

DROP TABLE IF EXISTS DataPoint;

DROP TABLE IF EXISTS CategoryMeasurement;

DROP TABLE IF EXISTS TemplateMeasurement;

DROP TABLE IF EXISTS DataPointType;

DROP TABLE IF EXISTS PatientRecord;

DROP TABLE IF EXISTS PatientResource;

DROP TABLE IF EXISTS MeasurementRecord;

DROP TABLE IF EXISTS PatientMeasurement;

DROP TABLE IF EXISTS ConditionDetails;

DROP TABLE IF EXISTS PatientCategory;

DROP TABLE IF EXISTS Treating;

DROP TABLE IF EXISTS Patient;

DROP TABLE IF EXISTS Staff;

DROP TABLE IF EXISTS StaffRole;

DROP TABLE IF EXISTS RecordType;

DROP TABLE IF EXISTS RecordCategory;

DROP TABLE IF EXISTS TemplateResource;

DROP TABLE IF EXISTS TemplateCategory;

DROP TABLE IF EXISTS ResourceDialog;

DROP TABLE IF EXISTS [Resource];

DROP TABLE IF EXISTS ResourceType;

DROP TABLE IF EXISTS Measurement;

GO

CREATE TABLE Measurement(
    MeasurementID INT IDENTITY(1,1) NOT NULL,
    MeasurementName NVARCHAR(50) NOT NULL,
    Frequency INT NOT NULL,
    CONSTRAINT PK_MeasurementID PRIMARY KEY (MeasurementID),
    CONSTRAINT UQ_MeasurementName UNIQUE (MeasurementName)
);

GO

CREATE TABLE DataPoint(
   MeasurementID INT NOT NULL,
   DataPointNumber INT NOT NULL,
   UpperLimit INT NOT NULL,
   LowerLimit INT NOT NULL,
   [Name] NVARCHAR(50),
   CONSTRAINT PK_DataPoint PRIMARY KEY (MeasurementID, DataPointNumber),
   CONSTRAINT FK_DataPoint_Measurement FOREIGN KEY (MeasurementID) REFERENCES Measurement
);

GO

CREATE TABLE SurveyQuestion(
    MeasurementID INT NOT NULL,
    DataPointNumber INT NOT NULL, 
    CategoryName NVARCHAR(MAX),
    Question NVARCHAR(MAX) NOT NULL,
    CONSTRAINT PK_SurveyQuestion PRIMARY KEY (MeasurementID, DataPointNumber),
    CONSTRAINT FK_SurveyQuestion_DataPoint FOREIGN KEY (MeasurementID, DataPointNumber) REFERENCES DataPoint (MeasurementID, DataPointNumber)
)

GO

CREATE TABLE SurveyAnswer(
    MeasurementID INT NOT NULL,
    DataPointNumber INT NOT NULL, 
    AnswerNumber INT NOT NULL,
    AnswerText NVARCHAR(MAX) NOT NULL,
    [Value] INT NOT NULL, 
    CONSTRAINT PK_SurveyAnswer PRIMARY KEY (MeasurementID, DataPointNumber, AnswerNumber),
    CONSTRAINT FK_SurveyAnswer_SurveyQuestion FOREIGN KEY (MeasurementID, DataPointNumber) REFERENCES SurveyQuestion (MeasurementID, DataPointNumber)
)

GO

CREATE TABLE StaffRole(
      RoleID INT IDENTITY(1,1) NOT NULL,
      StaffType NVARCHAR(50) NOT NULL,
      CONSTRAINT PK_StaffRole PRIMARY KEY (RoleID),
      CONSTRAINT UQ_StaffType UNIQUE (StaffType)
)

GO

CREATE TABLE Staff(
    StaffID INT IDENTITY(1,1) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Surname NVARCHAR(50) NOT NULL,
    [Password] BINARY(64) NOT NULL,
    Salt NVARCHAR(MAX) NOT NULL,
    RoleID INT NOT NULL,
    CONSTRAINT PK_Staff PRIMARY KEY (StaffID),
    CONSTRAINT UQ_Staff UNIQUE (Email),
    CONSTRAINT FK_Staff_StaffRole FOREIGN KEY (RoleID) REFERENCES StaffRole
)

GO 

CREATE TABLE Patient(
    URNumber NVARCHAR(50) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    Title NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    SurName NVARCHAR(50) NOT NULL,
    Gender NVARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    [Address] NVARCHAR(MAX) NOT NULL,
    Suburb NVARCHAR(50) NOT NULL,
    PostCode NVARCHAR(4) NOT NULL,
    MobileNumber NVARCHAR(10),
    HomeNumber NVARCHAR(10),
    CountryOfBirth NVARCHAR(50) NOT NULL,
    PreferredLanguage NVARCHAR(50) NOT NULL,
    [Password] BINARY(64) NOT NULL,
    Salt NVARCHAR(MAX) NOT NULL,
    LivesAlone BIT NOT NULL,
    RegisteredBy INT NOT NULL,
    Active BIT NOT NULL,
    CONSTRAINT PK_Patient PRIMARY KEY (URNumber),
    CONSTRAINT FK_Patient_Staff FOREIGN KEY (RegisteredBy) REFERENCES Staff,
    CONSTRAINT UQ_Email UNIQUE (Email),
    CONSTRAINT CHK_Gender CHECK (Gender = 'Male' OR Gender = 'Female' OR Gender = 'Other')
)

GO

CREATE TABLE Treating(
    StartDate DATETIME NOT NULL,
    EndDate DATETIME,
    URNumber NVARCHAR(50) NOT NULL,
    StaffID INT NOT NULL,
    CONSTRAINT PK_Treating PRIMARY KEY (StartDate, URNumber, StaffID),
    CONSTRAINT FK_Treating_Patient FOREIGN KEY (URNumber) REFERENCES Patient,
    CONSTRAINT FK_Treating_Staff FOREIGN KEY (StaffID) REFERENCES Staff
)

GO

CREATE TABLE RecordCategory(
    RecordCategoryID INT IDENTITY(1,1) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_RecordCategory PRIMARY KEY (RecordCategoryID),
    CONSTRAINT UQ_Category UNIQUE (Category)
)

GO

CREATE TABLE RecordType(
    RecordTypeID INT IDENTITY(1,1) NOT NULL,
    RecordType NVARCHAR(50) NOT NULL,
    RecordCategoryID INT NOT NULL,
    CONSTRAINT PK_RecordType PRIMARY KEY (RecordTypeID),
    CONSTRAINT FK_RecordType_RecordCategory FOREIGN KEY (RecordCategoryID) REFERENCES RecordCategory,
    CONSTRAINT UQ_RecordType UNIQUE (RecordType)
)

CREATE TABLE PatientRecord(
    DateTimeRecorded DATETIME NOT NULL,
    Notes NVARCHAR(MAX),
    URNumber NVARCHAR(50) NOT NULL,
    RecordTypeID INT NOT NULL,
    CONSTRAINT PK_PatientRecord PRIMARY KEY (DateTimeRecorded, URNumber, RecordTypeID),
    CONSTRAINT FK_PatientRecord_RecordType FOREIGN KEY (RecordTypeID) REFERENCES RecordType,
    CONSTRAINT FK_PatientRecord_Patient FOREIGN KEY (URNumber) REFERENCES Patient
)

GO

CREATE TABLE TemplateCategory(
    CategoryID INT IDENTITY(1,1) NOT NULL,
    CategoryName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_TemplateCategory PRIMARY KEY (CategoryID),
    CONSTRAINT UQ_CategoryName UNIQUE (CategoryName)
)

GO

CREATE TABLE PatientCategory(
    CategoryID INT NOT NULL,
    URNumber NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_PatientCategory PRIMARY KEY (CategoryID, URNumber),
    CONSTRAINT FK_PatientCategory_Patient FOREIGN KEY (URNumber) REFERENCES Patient,
    CONSTRAINT FK_PatientCategory_TemplateCategory FOREIGN KEY (CategoryID) REFERENCES TemplateCategory
)

GO 

CREATE TABLE ConditionDetails(
    CategoryID INT NOT NULL,
    URNumber NVARCHAR(50) NOT NULL,
    Diagnosis NVARCHAR(500),
    ProcedureDate DATETIME,
    NextAppointment DATETIME,
    CONSTRAINT PK_ConditionDetails PRIMARY KEY (CategoryID, URNumber),
    CONSTRAINT FK_ConditionDetails_PatientCategory FOREIGN KEY (CategoryID, URNumber) REFERENCES PatientCategory (CategoryID, URNumber)
)

GO

CREATE TABLE PatientMeasurement(
    MeasurementID INT NOT NULL,
    CategoryID INT NOT NULL,
    URNumber NVARCHAR(50) NOT NULL,
    Frequency INT NOT NULL,
    FrequencySetDate DATETIME NOT NULL,
    CONSTRAINT PK_PatientMeasurement PRIMARY KEY (MeasurementID, CategoryID, URNumber),
    CONSTRAINT FK_PatientMeasurement_Measurement FOREIGN KEY (MeasurementID) REFERENCES Measurement,
    CONSTRAINT FK_PatientMeasurement_PatientCategory FOREIGN KEY (CategoryID, URNumber) REFERENCES PatientCategory(CategoryID, URNumber)
)

GO 

CREATE TABLE MeasurementRecord(
    MeasurementRecordID INT IDENTITY(1,1) NOT NULL,
    DateTimeRecorded DATETIME NOT NULL,
    MeasurementID INT NOT NULL,
    CategoryID INT NOT NULL,
    URNumber NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_MeasurementRecord PRIMARY KEY (MeasurementRecordID),
    CONSTRAINT UQ_MeasurementRecord UNIQUE(DateTimeRecorded, MeasurementID, CategoryID, URNumber),
    CONSTRAINT FK_MeasurementRecord_PatientMeasurement FOREIGN KEY (MeasurementID, CategoryID, URNumber) REFERENCES PatientMeasurement (MeasurementID, CategoryID, URNumber)
)

GO

CREATE TABLE DataPointRecord(
    MeasurementID INT NOT NULL,
    DataPointNumber INT NOT NULL,
    [Value] FLOAT NOT NULL,
    MeasurementRecordID INT NOT NULL,
    CONSTRAINT PK_DataPointRecord PRIMARY KEY (MeasurementID, DataPointNumber, MeasurementRecordID),
    CONSTRAINT FK_DataPointRecord_DataPoint FOREIGN KEY (MeasurementID, DataPointNumber) REFERENCES DataPoint (MeasurementID, DataPointNumber),
    CONSTRAINT FK_DataPointRecord_MeasurementRecord FOREIGN KEY (MeasurementRecordID) REFERENCES MeasurementRecord (MeasurementRecordID)
)

GO

CREATE TABLE TemplateMeasurement(
    MeasurementID INT NOT NULL,
    CategoryID INT NOT NULL,
    CONSTRAINT PK_TemplateMeasurement PRIMARY KEY (MeasurementID, CategoryID),
    CONSTRAINT FK_TemplateMeasurement_Measurement FOREIGN KEY (MeasurementID) REFERENCES Measurement,
    CONSTRAINT FK__TemplateMeasurement_TemplateCategory FOREIGN KEY (CategoryID) REFERENCES TemplateCategory
)

GO

CREATE TABLE ResourceType(
    ResourceTypeID INT IDENTITY(1,1) NOT NULL,
    TypeName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_ResourceType PRIMARY KEY (ResourceTypeID),
    CONSTRAINT UQ_ResourceType_TypeName UNIQUE (TypeName)
)

GO 

CREATE TABLE [Resource](
    ResourceID INT IDENTITY(1,1) NOT NULL,
    Title NVARCHAR(65) NOT NULL,
    Prompt NVARCHAR(12) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    TypeID INT NOT NULL,
    CONSTRAINT PK_Resource PRIMARY KEY (ResourceID),
    CONSTRAINT FK_Resource_ResourceType FOREIGN KEY (TypeID) REFERENCES ResourceType
)

GO 

CREATE TABLE PatientResource(
    CategoryID INT NOT NULL,
    URNumber NVARCHAR(50),
    ResourceID INT NOT NULL,
    CONSTRAINT PK_PatientResource PRIMARY KEY (CategoryID, URNumber, ResourceID),
    CONSTRAINT FK_PatientResource_PatientCategory FOREIGN KEY (CategoryID, URNumber) REFERENCES PatientCategory (CategoryID, URNumber),
    CONSTRAINT FK_PatientResource_Resource FOREIGN KEY (ResourceID) REFERENCES [Resource]
)

GO

CREATE TABLE TemplateResource(
    CategoryID INT NOT NULL,
    ResourceID INT NOT NULL,
    CONSTRAINT PK_TemplateResource PRIMARY KEY (CategoryID, ResourceID),
    CONSTRAINT FK_TemplateResource_Resource FOREIGN KEY (ResourceID) REFERENCES [Resource],
    CONSTRAINT FK_TemplateResource_TemplateCategory FOREIGN KEY (CategoryID) REFERENCES TemplateCategory
)

GO

CREATE TABLE ResourceDialog(
    ResourceDialogID INT IDENTITY(1,1) NOT NULL,
    Heading NVARCHAR(60) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Video NVARCHAR(MAX),
    ResourceID INT NOT NULL,
    CONSTRAINT PK_ResourceDialog PRIMARY KEY (ResourceDialogID),
    CONSTRAINT FK_ResourceDialog_Resource FOREIGN KEY (ResourceID) REFERENCES [Resource]
)

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
VALUES(1, '123456789', 'There has been a build-up of fluid around your lungs. Therefore, it is important for us to know and monitor how you are feeling by using this app  to allow us to best optimise your care. The app will be used in hospital and in clinic during follow-up.', GETDATE(), GETDATE())

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
    (5, 1),
    (1, 2),
    (2, 2),
    (5, 2),
    (1, 3),
    (2, 3);

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
    (5, 1, '987654321', 7, GETDATE()),
    (1, 2, '987654321', 28, GETDATE()),
    (2, 2, '987654321', 1, GETDATE()),
    (5, 2, '987654321', 7, GETDATE()),
    (1, 3, '987654321', 28, GETDATE()),
    (2, 3, '987654321', 1, GETDATE());



SELECT * FROM MeasurementRecord

SELECT * FROM DataPointRecord

UPDATE PatientMeasurement SET FrequencySetDate = '2020-11-15 17:30:00.00' WHERE MeasurementID = 4 AND CategoryID = 1 AND URNumber = '123456789'