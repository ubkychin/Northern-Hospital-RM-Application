USE NORTHERNHEALTH

SELECT categoryName,M.measurementName FROM CategoryMeasurement CM
INNER JOIN Category C ON CM.categoryID = C.categoryID
INNER JOIN Measurement M ON M.measurementID = CM.measurementID;

SELECT * FROM Measurement

SELECT * FROM MeasurementDataPoint

SELECT * FROM Patient

SELECT * FROM PatientCategory

SELECT * FROM  MeasurementResult