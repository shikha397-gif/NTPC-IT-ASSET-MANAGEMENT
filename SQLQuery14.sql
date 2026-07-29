USE IT_Asset_Management;
GO

-- यदि पुराना टेबल मौजूद हो तो उसे हटाएँ
IF OBJECT_ID('dbo.MaintenanceLogs', 'U') IS NOT NULL
    DROP TABLE dbo.MaintenanceLogs;
GO

-- एसेट्स के रिपेयर और मेंटेनेंस रिकॉर्ड्स के लिए टेबल
CREATE TABLE MaintenanceLogs (
    Log_ID INT IDENTITY(1,1) PRIMARY KEY,
    AssetID VARCHAR(50) NOT NULL,
    FaultDescription VARCHAR(255) NOT NULL,
    ServiceVendor VARCHAR(150) NOT NULL,
    RepairCost DECIMAL(10,2) NOT NULL,
    ExpectedReturn DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- टेस्टिंग के लिए 1 डिफ़ॉल्ट एंट्री डालना
INSERT INTO MaintenanceLogs (AssetID, FaultDescription, ServiceVendor, RepairCost, ExpectedReturn)
VALUES ('C101992', 'Display Flickering & Screen Replacement', 'HP Commercial Repair Lab', 4500.00, '2026-08-05');
GO

-- डेटा लाइव देखने की जादुई कमांड:
SELECT * FROM dbo.MaintenanceLogs;
