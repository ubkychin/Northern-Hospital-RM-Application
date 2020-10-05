
DROP TABLE IF EXISTS [User];

DROP TABLE IF EXISTS MeasurementResult;

DROP TABLE IF EXISTS PatientCategory;

DROP TABLE IF EXISTS MeasurementDataPoint;

DROP TABLE IF EXISTS CategoryMeasurement;

DROP TABLE IF EXISTS Category;

DROP TABLE IF EXISTS Measurement;

DROP TABLE IF EXISTS Patient;

DROP TABLE IF EXISTS ResourceDialog;

DROP TABLE IF EXISTS PatientResource;

GO

CREATE TABLE [User]
(
    username VARCHAR(50) NOT NULL,
    [password] BINARY(64) NOT NULL,
    salt NVARCHAR(max) NOT NULL,
    userType VARCHAR(50) NOT NULL,
    CONSTRAINT PK_Admin PRIMARY KEY (username)
);

GO

CREATE TABLE Category
(
    categoryID INT IDENTITY(1,1) NOT NULL,
    categoryName NVARCHAR(50) NOT NULL,
    CONSTRAINT PK_Category PRIMARY KEY (categoryID)
)

GO

CREATE TABLE Measurement
(
    measurementID INT IDENTITY(1,1) NOT NULL,
    measurementName VARCHAR(50),
    CONSTRAINT PK_Measurement PRIMARY KEY (measurementID)
)

GO

CREATE TABLE CategoryMeasurement
(
    measurementID INT,
    categoryID INT,
    CONSTRAINT FK_CategoryMeasurement_Category FOREIGN KEY (categoryID) REFERENCES dbo.Category,
    CONSTRAINT FK_CategoryMeasurement_Measurement FOREIGN KEY (measurementID) REFERENCES dbo.Measurement
)

GO

CREATE TABLE MeasurementDataPoint
(
    measurementID INT NOT NULL,
    dataPointNumber INT NOT NULL,
    upperLimit INT NOT NULL,
    lowerLimit INT NOT NULL,
    [description] VARCHAR(50),
    CONSTRAINT FK_MeasurementDataPoint_Measurement FOREIGN KEY (measurementID) REFERENCES dbo.Measurement,
    CONSTRAINT PK_MeasurementDataPoint PRIMARY KEY (measurementID,dataPointNumber)
)

GO

CREATE TABLE Patient
(
    hospitalNumber VARCHAR(50) NOT NULL,
    userID VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    [address] NVARCHAR(50) NOT NULL,
    suburb VARCHAR(50) NOT NULL,
    postcode VARCHAR(4) NOT NULL,
    email VARCHAR(100),
    mobileNumber VARCHAR(10),
    homeNumber VARCHAR(10),
    countryOfBirth VARCHAR(100) NOT NULL,
    preferredLanguage VARCHAR(100) NOT NULL,
    [password] BINARY(64) NOT NULL,
    salt NVARCHAR(max) NOT NULL,
    livesAlone BIT NOT NULL,
    CONSTRAINT PK_Patient PRIMARY KEY (hospitalNumber)
)

GO 

CREATE TABLE PatientCategory
(
    hospitalNumber VARCHAR(50) NOT NULL,
    categoryID INT NOT NULL,
    CONSTRAINT FK_PatientCategory_Category FOREIGN KEY (categoryID) REFERENCES dbo.Category,
    CONSTRAINT FK_PatientCategory_Patient FOREIGN KEY (hospitalNumber) REFERENCES dbo.Patient,
    CONSTRAINT PK_PatientCategory PRIMARY KEY (categoryID,hospitalNumber)
)

GO

CREATE TABLE MeasurementResult
(
    hospitalNumber VARCHAR(50) NOT NULL,
    categoryID INT NOT NULL,
    measurementID INT NOT NULL,
    dataPointNumber INT NOT NULL,
    [timeStamp] DATETIME NOT NULL,
    [value] INT NOT NULL,
    CONSTRAINT FK_MeasurementResult_MeasurementDataPoint FOREIGN KEY (measurementID,dataPointNumber) REFERENCES dbo.MeasurementDataPoint,
    CONSTRAINT FK_MeasurementResult_PatientCategory FOREIGN KEY (categoryID,hospitalNumber) REFERENCES dbo.PatientCategory,
    CONSTRAINT PK_MeasurementResult PRIMARY KEY (measurementID,dataPointNumber,hospitalNumber,categoryID,[timeStamp])
) 

GO

CREATE TABLE PatientResource
(
  PatientResourceID INT NOT NULL,
  heading VARCHAR(100) NOT NULL,
  [type] VARCHAR(100) NOT NULL,
  prompt VARCHAR NOT NULL,
  pdfFileName VARCHAR NOT NULL,
  CONSTRAINT PK_PatientResource PRIMARY KEY (PatientResourceID)
)

GO

CREATE TABLE ResourceDialog
(
  ResourceDialogID INT NOT NULL,
  heading VARCHAR(100) NOT NULL,
  content VARCHAR NOT NULL,
  video VARCHAR,
  PatientResourceID INT NOT NULL,
  CONSTRAINT FK_ResourceDialog_PatientResource FOREIGN KEY (PatientResourceID) REFERENCES dbo.PatientResource,
  CONSTRAINT PK_ResourceDialog PRIMARY KEY (ResourceDialogID,PatientResourceID)
)