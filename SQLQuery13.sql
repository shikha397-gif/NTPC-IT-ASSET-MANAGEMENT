USE IT_Asset_Management;
GO


IF OBJECT_ID('dbo.Asset_Master_Employees', 'U') IS NOT NULL
    DROP TABLE dbo.Asset_Master_Employees;
GO


CREATE TABLE Asset_Master_Employees (
    Record_ID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID VARCHAR(50) NOT NULL UNIQUE,
    EmployeeName VARCHAR(150) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Designation VARCHAR(150) NOT NULL,
    GradeLevel VARCHAR(10) NOT NULL,
    MobileNo VARCHAR(15) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO


SELECT * FROM dbo.Asset_Master_Employees;
