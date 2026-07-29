USE IT_Asset_Management;
GO

IF OBJECT_ID('Transaction_Asset_Record_E', 'U') IS NOT NULL 
    DROP TABLE Transaction_Asset_Record_E;
GO

CREATE TABLE Transaction_Asset_Record_E (
    Serial_ID INT IDENTITY(1,1) PRIMARY KEY,
    Asset_Serial_No VARCHAR(100) NOT NULL UNIQUE,
    PO_Number VARCHAR(100) NOT NULL,
    Grade_Code VARCHAR(50) NOT NULL,
    Warranty_Expiry DATE NOT NULL,
    Node_Status VARCHAR(50) NOT NULL,
    Created_At DATETIME DEFAULT GETDATE()
);

GO

-- Verify table creation
SELECT * FROM Transaction_Asset_Record_E;
