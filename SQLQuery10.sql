USE IT_Asset_Management;
GO

-- बायबैक फॉर्म की एंट्रीज स्टोर करने के लिए टेबल
CREATE TABLE Independent_Asset_BuyBack (
    BuyBack_ID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID VARCHAR(50) NOT NULL,
    EmployeeName VARCHAR(100),
    AssetSerialNo VARCHAR(100) NOT NULL,
    AssetType VARCHAR(50),
    BuyBackAmount DECIMAL(10,2),
    ApprovalStatus VARCHAR(50) DEFAULT 'Pending',
    ApplicationDate DATETIME DEFAULT GETDATE()
);
GO
