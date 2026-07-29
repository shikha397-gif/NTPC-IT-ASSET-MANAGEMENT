USE IT_Asset_Management;
GO

-- Safely drop old versions to prevent collision mistakes
IF OBJECT_ID('dbo.AssetDisposal', 'U') IS NOT NULL
    DROP TABLE dbo.AssetDisposal;
GO

CREATE TABLE AssetDisposal (
    SR INT IDENTITY(1,1) PRIMARY KEY,
    AssetID VARCHAR(50) NOT NULL,
    ScrapReason VARCHAR(150) NOT NULL,
    RecoveryValue DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    DisposalDate DATE NOT NULL,
    ApprovedBy VARCHAR(100) NOT NULL,
    Status VARCHAR(30) DEFAULT 'Disposed',
    Created_At DATETIME DEFAULT GETDATE()
);
GO

-- Query to verify your configuration table initializes blank
SELECT * FROM AssetDisposal;
GO

