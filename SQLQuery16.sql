USE IT_Asset_Management;
GO

-- पुराना कोई भी गलत नाम का टेबल हो तो उसे पूरी तरह साफ़ करें
IF OBJECT_ID('dbo.AssetDisposalLogs', 'U') IS NOT NULL 
    DROP TABLE dbo.AssetDisposalLogs;
GO

-- नया और पूरी तरह स्वतंत्र डिस्पोजल लेज़र टेबल
CREATE TABLE AssetDisposalLogs (
    Disposal_ID INT IDENTITY(1,1) PRIMARY KEY,
    AssetID VARCHAR(50) NOT NULL,
    ScrapReason VARCHAR(255) NOT NULL,
    ApprovedByHOD VARCHAR(150) NOT NULL,
    RecoveryValue VARCHAR(50) NOT NULL,
    DisposalDate VARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- चेक करें (अभी यह बिल्कुल 0 Rows खाली दिखेगा):
SELECT * FROM dbo.AssetDisposalLogs;
