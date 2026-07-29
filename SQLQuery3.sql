ALTER SERVER ROLE sysadmin ADD MEMBER saa;
GO


ALTER LOGIN saa ENABLE;
GO
ALTER LOGIN saa WITH PASSWORD = 'Shikha@08';
GO

USE IT_Asset_Management;
GO

CREATE TABLE Asset_Master_E (
    Sr_No INT IDENTITY(1,1) PRIMARY KEY,
    Asset_ID VARCHAR(50) NOT NULL UNIQUE,
    Asset_Name VARCHAR(150) NOT NULL,
    Asset_Type VARCHAR(100) NOT NULL,
    Status_Flag VARCHAR(50) NOT NULL,
    Created_At DATETIME DEFAULT GETDATE()
);
GO

select * from Asset_Master_E;