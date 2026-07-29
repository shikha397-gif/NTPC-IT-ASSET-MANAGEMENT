USE IT_Asset_Management;
GO

-- पुराना कोई भी गलत नाम का डिस्पोजल टेबल हो तो उसे हटाएँ
IF OBJECT_ID('dbo.AssetDisposalLogs', 'U') IS NOT NULL DROP TABLE dbo.AssetDisposalLogs;
IF OBJECT_ID('dbo.AssetDisposal', 'U') IS NOT NULL DROP TABLE dbo.AssetDisposal;
GO

-- बिल्कुल फ्रेश और सटीक कॉलम वाला टेबल बनाएं
CREATE TABLE AssetDisposalLogs (
    Disposal_ID INT IDENTITY(1,1) PRIMARY KEY,
    AssetID VARCHAR(50) NOT NULL,
    ScrapReason VARCHAR(255) NOT NULL,
    ApprovedByHOD VARCHAR(150) NOT NULL,
    RecoveryValue DECIMAL(10,2) NOT NULL,
    DisposalDate DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO
