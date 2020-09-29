USE NORTHERNHEALTH

INSERT INTO Category
    (categoryName)
VALUES('Indwelling Pleural Catheter');

INSERT  INTO Measurement
    (measurementName)
VALUES('ECOG Status'),
    ('Likert Scale'),
    ('Breathlessness'),
    ('Level of Pain'),
    ('Fluid Drain'),
    ('Quality of Life');

INSERT INTO CategoryMeasurement
VALUES('1', '1'),
    ('2', '1'),
    ('3', '1'),
    ('4', '1'),
    ('5', '1'),
    ('6', '1');

INSERT INTO MeasurementDataPoint
VALUES(1, 1, 4, 0, 'ECOG Status'),
    (2, 1, 5, 1, 'Likert Scale'),
    (3, 1, 10, 0, 'Breathlessness'),
    (4, 1, 10, 0, 'Level of Pain'),
    (5, 1, 600, 1, 'Fluid Drain'),
    (6, 1, 5, 1, 'Mobility'),
    (6, 2, 5, 1, 'Self-Care'),
    (6, 3, 5, 1, 'Usual-Activies'),
    (6, 4, 5, 1, 'Pain/Discomfort'),
    (6, 5, 5, 1, 'Anxiety/Depression'),
    (6, 6, 100, 0, 'Health');

INSERT INTO Patient
VALUES('123456789', 'Mhenry', 'Mr', 'Henry', 'Mitchell', 'Male', GETDATE(), '123 Trump street', 'Cheltenham'
,'3192', '102661522@student.swin.edu.au', '123456789', '123456789', 'Australia', 'English', HASHBYTES('SHA2_512','password'), 'salt', 0)

INSERT INTO PatientCategory
VALUES('123456789','1');