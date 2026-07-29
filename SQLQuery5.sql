USE IT_Asset_Management;
GO

CREATE TABLE MaintenanceLogs (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    AssetID VARCHAR(50) NOT NULL,
    FaultDescription VARCHAR(MAX) NOT NULL,
    ServiceVendor VARCHAR(255) NOT NULL,
    RepairCost DECIMAL(10, 2) NOT NULL,
    ExpectedReturn DATE NOT NULL,
    Created_At DATETIME DEFAULT GETDATE()
);
GO
SELECT * FROM MaintenanceLogs;
