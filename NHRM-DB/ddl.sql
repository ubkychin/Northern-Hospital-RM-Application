DROP TABLE IF EXISTS DataPointRecord;

DROP TABLE IF EXISTS DataPoint

DROP TABLE IF EXISTS CategoryMeasurement;

DROP TABLE IF EXISTS TemplateMeasurement;

DROP TABLE IF EXISTS DataPointType;

DROP TABLE IF EXISTS PatientRecord;

DROP TABLE IF EXISTS PatientResource;

DROP TABLE IF EXISTS MeasurementRecord;

DROP TABLE IF EXISTS PatientMeasurement;

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
    CONSTRAINT UNIQUE_MeasurementName UNIQUE (MeasurementName)
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

CREATE TABLE StaffRole(
      RoleID INT IDENTITY(1,1) NOT NULL,
      StaffType NVARCHAR(50) NOT NULL,
      CONSTRAINT PK_StaffRole PRIMARY KEY (RoleID),
      CONSTRAINT UNIQUE_StaffType UNIQUE (StaffType)
)

GO

CREATE TABLE Staff(
    StaffID NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    SurName NVARCHAR(50) NOT NULL,
    [Password] BINARY(64) NOT NULL,
    Salt NVARCHAR(MAX) NOT NULL,
    RoleID INT NOT NULL,
    CONSTRAINT PK_Staff PRIMARY KEY (StaffID),
    CONSTRAINT FK_Staff_StaffRole FOREIGN KEY (RoleID) REFERENCES StaffRole
)

GO 

CREATE TABLE Patient(
    HospitalNumber NVARCHAR(50) NOT NULL,
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
    RegisteredBy NVARCHAR(50) NOT NULL,
    Active BIT NOT NULL,
    CONSTRAINT PK_Patient PRIMARY KEY (HospitalNumber),
    CONSTRAINT FK_Patient_Staff FOREIGN KEY (RegisteredBy) REFERENCES Staff,
    CONSTRAINT UNIQUE_Email UNIQUE (Email),
    CONSTRAINT CHK_Gender CHECK (Gender = 'Male' OR Gender = 'Female' OR Gender = 'Other')
)

GO

CREATE TABLE Treating(
    StartDate DATETIME NOT NULL,
    EndDate DATETIME,
    HospitalNumber NVARCHAR(50) NOT NULL,
    StaffID NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_Treating PRIMARY KEY (StartDate, HospitalNumber, StaffID),
    CONSTRAINT FK_Treating_Patient FOREIGN KEY (HospitalNumber) REFERENCES Patient,
    CONSTRAINT FK_Treating_Staff FOREIGN KEY (StaffID) REFERENCES Staff
)

GO

CREATE TABLE RecordCategory(
    RecordCategoryID INT IDENTITY(1,1) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_RecordCategory PRIMARY KEY (RecordCategoryID),
    CONSTRAINT UNIQUE_Category UNIQUE (Category)
)

GO

CREATE TABLE RecordType(
    RecordTypeID INT IDENTITY(1,1) NOT NULL,
    RecordType NVARCHAR(50) NOT NULL,
    RecordCategoryID INT NOT NULL,
    CONSTRAINT PK_RecordType PRIMARY KEY (RecordTypeID),
    CONSTRAINT FK_RecordType_RecordCategory FOREIGN KEY (RecordCategoryID) REFERENCES RecordCategory,
    CONSTRAINT UNIQUE_RecordType UNIQUE (RecordType)
)

CREATE TABLE PatientRecord(
    DateTimeRecorded DATETIME NOT NULL,
    Notes NVARCHAR(MAX),
    HospitalNumber NVARCHAR(50) NOT NULL,
    RecordTypeID INT NOT NULL,
    CONSTRAINT PK_PatientRecord PRIMARY KEY (DateTimeRecorded, HospitalNumber, RecordTypeID),
    CONSTRAINT FK_PatientRecord_RecordType FOREIGN KEY (RecordTypeID) REFERENCES RecordType,
    CONSTRAINT FK_PatientRecord_Patient FOREIGN KEY (HospitalNumber) REFERENCES Patient
)

GO

CREATE TABLE TemplateCategory(
    CategoryID INT IDENTITY(1,1) NOT NULL,
    CategoryName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_TemplateCategory PRIMARY KEY (CategoryID),
    CONSTRAINT UNIQUE_CategoryName UNIQUE (CategoryName)
)

GO

CREATE TABLE PatientCategory(
    CategoryID INT NOT NULL,
    HospitalNumber NVARCHAR(50),
    CONSTRAINT PK_PatientCategory PRIMARY KEY (CategoryID, HospitalNumber),
    CONSTRAINT FK_PatientCategory_Patient FOREIGN KEY (HospitalNumber) REFERENCES Patient,
    CONSTRAINT FK_PatientCategory_TemplateCategory FOREIGN KEY (CategoryID) REFERENCES TemplateCategory
)

GO 

CREATE TABLE PatientMeasurement(
    MeasurementID INT NOT NULL,
    CategoryID INT NOT NULL,
    HospitalNumber NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_PatientMeasurement PRIMARY KEY (MeasurementID, CategoryID, HospitalNumber),
    CONSTRAINT FK_PatientMeasurement_Measurement FOREIGN KEY (MeasurementID) REFERENCES Measurement,
    CONSTRAINT FK_PatientMeasurement_PatientCategory FOREIGN KEY (CategoryID, HospitalNumber) REFERENCES PatientCategory(CategoryID, HospitalNumber)
)

GO 

CREATE TABLE MeasurementRecord(
    MeasurementRecordID INT IDENTITY(1,1) NOT NULL,
    DateTimeRecorded DATETIME NOT NULL,
    MeasurementID INT NOT NULL,
    CategoryID INT NOT NULL,
    HospitalNumber NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_MeasurementRecord PRIMARY KEY (MeasurementRecordID, MeasurementID, CategoryID, HospitalNumber),
    CONSTRAINT FK_MeasurementRecord_PatientMeasurement FOREIGN KEY (MeasurementID, CategoryID, HospitalNumber) REFERENCES PatientMeasurement (MeasurementID, CategoryID, HospitalNumber)
)

GO

CREATE TABLE DataPointRecord(
    HospitalNumber NVARCHAR(50) NOT NULL,
    CategoryID INT NOT NULL,
    MeasurementID INT NOT NULL,
    DataPointNumber INT NOT NULL,
    [Value] FLOAT NOT NULL,
    MeasurementRecordID INT NOT NULL,
    CONSTRAINT PK_DataPointRecord PRIMARY KEY (HospitalNumber, CategoryID, MeasurementID, DataPointNumber),
    CONSTRAINT FK_DataPointRecord_DataPoint FOREIGN KEY (MeasurementID, DataPointNumber) REFERENCES DataPoint (MeasurementID, DataPointNumber),
    CONSTRAINT FK_DataPointRecord_MeasurementRecord FOREIGN KEY (MeasurementRecordID, MeasurementID, CategoryID, HospitalNumber) REFERENCES MeasurementRecord (MeasurementRecordID, MeasurementID, CategoryID, HospitalNumber)
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
    CONSTRAINT UNIQUE_ResourceType_TypeName UNIQUE (TypeName)
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
    HospitalNumber NVARCHAR(50),
    ResourceID INT NOT NULL,
    CONSTRAINT PK_PatientResource PRIMARY KEY (CategoryID, HospitalNumber, ResourceID),
    CONSTRAINT FK_PatientResource_PatientCategory FOREIGN KEY (CategoryID, HospitalNumber) REFERENCES PatientCategory (CategoryID, HospitalNumber),
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