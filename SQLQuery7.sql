-- 1. पहले सुनिश्चित करें कि आप सही डेटाबेस का इस्तेमाल कर रही हैं
USE IT_Asset_Management;
GO

-- 2. एक बिल्कुल नया और स्वतंत्र टेबल बनाएं (इसका किसी और टेबल से कोई कनेक्शन नहीं है)
CREATE TABLE Independent_User_Assets (
    ID INT IDENTITY(1,1) PRIMARY KEY, -- ऑटोमैटिक बढ़ने वाला नंबर
    EmployeeID VARCHAR(50) NOT NULL,  -- कर्मचारी का यूनिक नंबर (जैसे 100245)
    EmployeeName VARCHAR(100),         -- कर्मचारी का नाम
    Department VARCHAR(50),           -- विभाग
    HodIncharge VARCHAR(100),         -- बॉस का नाम
    ItAmbassador VARCHAR(100),        -- IT प्रतिनिधि
    AssetSerialNo VARCHAR(100),       -- एसेट का सीरियल नंबर
    AssetType VARCHAR(50),            -- एसेट का प्रकार (Laptop, Printer आदि)
    AssetNameModel VARCHAR(100),      -- मॉडल का नाम
    ObsoleteFlag VARCHAR(10),         -- पुराना हुआ या नहीं (YES / NO)
    ObsoleteDate VARCHAR(50),         -- पुराना होने की तारीख (आसान रखने के लिए VARCHAR लिया है)
    AssetSpecification NVARCHAR(500), -- कॉन्फ़िगरेशन
    Remark NVARCHAR(500)              -- रिमार्क
);
GO

-- 3. अब इसमें अमित कुमार का पूरा टेस्ट डेटा एक साथ डाल दें
INSERT INTO Independent_User_Assets 
(EmployeeID, EmployeeName, Department, HodIncharge, ItAmbassador, AssetSerialNo, AssetType, AssetNameModel, ObsoleteFlag, ObsoleteDate, AssetSpecification, Remark)
VALUES 
('100245', 'Amit Kumar', 'HR', 'V.K. Singh', 'Rahul Sharma', 'NTPC-LP-8849', 'Laptop', 'HP EliteBook 840', 'NO', '-', 'i5, 16GB RAM, 512GB SSD', 'New laptop issued'),
('100245', 'Amit Kumar', 'HR', 'V.K. Singh', 'Rahul Sharma', 'NTPC-PR-1122', 'Printer', 'HP LaserJet M1005', 'NO', '-', 'Monochrome Laser', 'Shared with cabin'),
('100245', 'Amit Kumar', 'HR', 'V.K. Singh', 'Rahul Sharma', 'NTPC-DK-4432', 'Desktop', 'Dell OptiPlex 3090', 'YES', '10/05/2026', 'Core i3, 4GB RAM', 'Old CPU - Scrap');
GO

-- 1. पहले सुनिश्चित करें कि आप सही डेटाबेस का इस्तेमाल कर रही हैं
USE IT_Asset_Management;
GO

-- 2. प्रिया शर्मा का डेटा डालना (इनकी EmployeeID हम '100456' रख रहे हैं)
INSERT INTO Independent_User_Assets 
(EmployeeID, EmployeeName, Department, HodIncharge, ItAmbassador, AssetSerialNo, AssetType, AssetNameModel, ObsoleteFlag, ObsoleteDate, AssetSpecification, Remark)
VALUES 
('100456', 'Priya Sharma', 'C&I', 'S.K. Verma', 'Ankit Mishra', 'NTPC-LP-5544', 'Laptop', 'Lenovo ThinkPad L14', 'NO', '-', 'i7 13th Gen, 16GB RAM, 512GB SSD', 'Issued for site operations'),
('100456', 'Priya Sharma', 'C&I', 'S.K. Verma', 'Ankit Mishra', 'NTPC-TB-2211', 'Tablet', 'iPad Air 5th Gen', 'NO', '-', 'M1 Chip, 256GB Wi-Fi', 'Approved special access device'),
('100456', 'Priya Sharma', 'C&I', 'S.K. Verma', 'Ankit Mishra', 'NTPC-MN-9988', 'Monitor', 'Dell 24 inch IPS', 'YES', '15/07/2026', 'FHD 1080p Display', 'Flickering issue - Replaced');
GO
SELECT * FROM Independent_User_Assets