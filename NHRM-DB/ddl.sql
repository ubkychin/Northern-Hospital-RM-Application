DROP TABLE IF EXISTS DataPointRecord;

DROP TABLE IF EXISTS DataPoint

DROP TABLE IF EXISTS CategoryMeasurement;

DROP TABLE IF EXISTS TemplateMeasurement;

DROP TABLE IF EXISTS Measurement;

DROP TABLE IF EXISTS DataPointType;

DROP TABLE IF EXISTS PatientRecord;

DROP TABLE IF EXISTS PatientResource;

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

GO

CREATE TABLE Measurement(
    MeasurementID INT NOT NULL,
    measurementName NVARCHAR(50) NOT NULL,
    frequency INT NOT NULL,
    CONSTRAINT PK_Measurement PRIMARY KEY (MeasurementID),
    CONSTRAINT UNIQUE_measurementName UNIQUE (measurementName)
);

GO

CREATE TABLE DataPointType(
    TypeID INT NOT NULL,
    typeName NVARCHAR(50),
    CONSTRAINT PK_DataPointType PRIMARY KEY (TypeID),
    CONSTRAINT UNIQUE_typeName UNIQUE (typeName)
);

GO

CREATE TABLE DataPoint(
   measurementID INT NOT NULL,
   dataPointNumber INT NOT NULL,
   upperLimit INT NOT NULL,
   lowerLimit INT NOT NULL,
   [description] NVARCHAR(50),
   typeID INT NOT NULL,
   CONSTRAINT PK_MeasurementDataPoint PRIMARY KEY (MeasurementID,dataPointNumber),
   CONSTRAINT FK_DataPoint_DataPointType FOREIGN KEY (typeID) REFERENCES DataPointType,
   CONSTRAINT FK_DataPoint_Measurement FOREIGN KEY (measurementID) REFERENCES Measurement
);

GO

CREATE TABLE StaffRole(
      roleID INT NOT NULL,
      staffType NVARCHAR(50) NOT NULL,
      CONSTRAINT PK_StaffRole PRIMARY KEY (roleID),
      CONSTRAINT UNIQUE_staffType UNIQUE (staffType)
)

GO

CREATE TABLE Staff(
    StaffID NVARCHAR(50) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    surName NVARCHAR(50) NOT NULL,
    [password] BINARY(64) NOT NULL,
    salt NVARCHAR(50) NOT NULL,
    roleID INT NOT NULL,
    CONSTRAINT PK_Admin PRIMARY KEY (StaffID),
    CONSTRAINT FK_Staff_StaffRole FOREIGN KEY (roleID) REFERENCES StaffRole
)

GO 

CREATE TABLE Patient(
    hospitalNumber NVARCHAR(50) NOT NULL,
    email NVARCHAR(256) NOT NULL,
    title NVARCHAR(50) NOT NULL,
    surName NVARCHAR(50) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    gender NVARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    [address] NVARCHAR(MAX) NOT NULL,
    suburb NVARCHAR(50) NOT NULL,
    postCode NVARCHAR(10) NOT NULL,
    mobileNumber NVARCHAR(50),
    homeNumber NVARCHAR(50),
    countryOfBirth NVARCHAR(50) NOT NULL,
    prefferedLanguage NVARCHAR(50) NOT NULL,
    [password] BINARY(64) NOT NULL,
    salt NVARCHAR(50) NOT NULL,
    livesAlone BIT NOT NULL,
    registeredBy NVARCHAR(50),
    active BIT NOT NULL,
    CONSTRAINT PK_Patient PRIMARY KEY (hospitalNumber),
    CONSTRAINT FK_Patient_Staff FOREIGN KEY (registeredBy) REFERENCES Staff
)

GO

CREATE TABLE Treating(
    startDate DATETIME NOT NULL,
    endDate DATETIME,
    hospitalNumber NVARCHAR(50) NOT NULL,
    staffID NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_Treating PRIMARY KEY (startDate,hospitalNumber,staffID),
    CONSTRAINT FK_Treating_Patient FOREIGN KEY (hospitalNumber) REFERENCES Patient,
    CONSTRAINT FK_Treating_Staff FOREIGN KEY (staffID) REFERENCES Staff
)

GO

CREATE TABLE RecordCategory(
    recordCategoryID INT NOT NULL,
    category NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_RecordCategory PRIMARY KEY (recordCategoryID)
)

GO

CREATE TABLE RecordType(
    recordTypeID INT NOT NULL,
    recordType NVARCHAR(50) NOT NULL,
    recordCategoryID INT NOT NULL,
    CONSTRAINT PK_RecordType PRIMARY KEY (recordTypeID),
    CONSTRAINT FK_RecordType_RecordCategory FOREIGN KEY (recordCategoryID) REFERENCES RecordCategory,
    CONSTRAINT UNIQUE_recordType UNIQUE (recordType)
)

CREATE TABLE PatientRecord(
    dateTimeRecorded DATETIME NOT NULL,
    notes NVARCHAR(MAX),
    hospitalNumber NVARCHAR(50) NOT NULL,
    recordTypeID INT NOT NULL,
    CONSTRAINT PK_PatientRecord PRIMARY KEY (dateTimeRecorded,hospitalNumber,recordTypeID),
    CONSTRAINT FK_PatientRecord_RecordType FOREIGN KEY (recordTypeID) REFERENCES RecordType,
    CONSTRAINT FK_PatientRecord_Patient FOREIGN KEY (hospitalNumber) REFERENCES Patient
)

GO

CREATE TABLE TemplateCategory(
    categoryID INT NOT NULL,
    categoryName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_TemplateCategory PRIMARY KEY (categoryID),
    CONSTRAINT UNIQUE_categoryName UNIQUE (categoryName)
)

GO

CREATE TABLE PatientCategory(
    categoryID INT NOT NULL,
    hospitalNumber NVARCHAR(50),
    CONSTRAINT PK_PatientCategory PRIMARY KEY (categoryID,hospitalNumber),
    CONSTRAINT FK_PatientCategory_Patient FOREIGN KEY (hospitalNumber) REFERENCES Patient,
    CONSTRAINT FK_PatientCategory_TemplateCategory FOREIGN KEY (categoryID) REFERENCES TemplateCategory
)

GO 

CREATE TABLE CategoryMeasurement(
    measurementID INT NOT NULL,
    categoryID INT NOT NULL,
    hospitalNumber NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_CategoryMeasurement PRIMARY KEY (measurementID,categoryID,hospitalNumber),
    CONSTRAINT FK_CategoryMeasurement_Measurement FOREIGN KEY (measurementID) REFERENCES Measurement,
    CONSTRAINT FK_CategoryMeasurement_PatientCategory FOREIGN KEY (categoryID,hospitalNumber) REFERENCES PatientCategory
)

GO 

CREATE TABLE DataPointRecord(
    hospitalNumber NVARCHAR(50) NOT NULL,
    categoryID INT NOT NULL,
    measurementID INT NOT NULL,
    dataPointNumber INT NOT NULL,
    [datetime] DATETIME NOT NULL,
    [value] INT NOT NULL,
    CONSTRAINT PK_DataPointRecord PRIMARY KEY (hospitalNumber,categoryID,measurementID,dataPointNumber,[datetime]),
    CONSTRAINT FK_DataPointRecord_CategoryMeasurement FOREIGN KEY (measurementID,categoryID,hospitalNumber) REFERENCES CategoryMeasurement,
    CONSTRAINT FK_DataPointRecord_DataPoint FOREIGN KEY (dataPointNumber,measurementID) REFERENCES DataPoint
)

GO

CREATE TABLE TemplateMeasurement(
    measurementID INT,
    categoryID INT,
    CONSTRAINT FK_TemplateMeasurement_Measurement FOREIGN KEY (measurementID) REFERENCES Measurement,
    CONSTRAINT FK__TemplateMeasurement_TemplateCategory FOREIGN KEY (categoryID) REFERENCES TemplateCategory
)

GO

CREATE TABLE ResourceType(
    typeID INT NOT NULL,
    typeName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_ResourceType PRIMARY KEY (typeID),
    CONSTRAINT UNIQUE_ResourceType_typeName UNIQUE (typeName)
)

GO 

CREATE TABLE [Resource](
    resourceID INT NOT NULL,
    title NVARCHAR(65),
    prompt NVARCHAR(12),
    categoryID INT NOT NULL,
    content NVARCHAR(MAX),
    typeID INT NOT NULL,
    CONSTRAINT PK_Resource PRIMARY KEY (resourceID),
    CONSTRAINT FK_Resource_ResourceType FOREIGN KEY (typeID) REFERENCES ResourceType
)

GO 

CREATE TABLE PatientResource(
    categoryID INT,
    hospitalNumber NVARCHAR(50),
    resourceID INT,
    CONSTRAINT FK_PatientResource_PatientCategory FOREIGN KEY (categoryID,hospitalNumber) REFERENCES PatientCategory,
    CONSTRAINT FK_PatientResource_Resource FOREIGN KEY (resourceID) REFERENCES [Resource]
)

GO

CREATE TABLE TemplateResource(
    categoryID INT NOT NULL,
    resourceID INT NOT NULL,
    CONSTRAINT FK_TemplateResource_Resource FOREIGN KEY (resourceID) REFERENCES [Resource],
    CONSTRAINT FK_TemplateResource_TemplateCategory FOREIGN KEY (categoryID) REFERENCES TemplateCategory
)

GO

CREATE TABLE ResourceDialog(
    resourceDialogID INT NOT NULL,
    heading NVARCHAR(60) NOT NULL,
    content NVARCHAR(250) NOT NULL,
    video NVARCHAR(MAX),
    resourceID INT NOT NULL,
    CONSTRAINT PK_ResourceDialog PRIMARY KEY (resourceDialogID),
    CONSTRAINT FK_ResourceDialog_Resource FOREIGN KEY (resourceID) REFERENCES [Resource]
)