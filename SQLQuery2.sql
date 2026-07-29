-- Create database container space

USE IT_Asset_Management;
GO

-- 1. Asset Master (E) Database Table Schema Structure (master1.html)
CREATE TABLE Asset_Master_E (
    Sr_No INT IDENTITY(1,1) PRIMARY KEY,
    Asset_ID VARCHAR(50) NOT NULL UNIQUE,
    Asset_Name VARCHAR(150) NOT NULL,
    Asset_Type VARCHAR(100) NOT NULL,
    Status_Flag VARCHAR(50) NOT NULL,
    Created_At DATETIME DEFAULT GETDATE()
);
GO
