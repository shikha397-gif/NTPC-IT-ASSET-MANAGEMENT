USE IT_Asset_Management;
GO

-- 1. ओवरऑल समरी रिपोर्ट के लिए एक स्वतंत्र टेबल बनाएं
CREATE TABLE Independent_Overall_Reports (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    AssetType VARCHAR(100),
    MakeModelLot VARCHAR(150),
    PoQty INT,
    ActiveQty INT,
    DisposedQty INT,
    TypeTotal INT
);
GO

-- 2. इसमें टेस्ट करने के लिए पूरे प्लांट का समरी डेटा एक साथ डाल दें
INSERT INTO Independent_Overall_Reports (AssetType, MakeModelLot, PoQty, ActiveQty, DisposedQty, TypeTotal)
VALUES 
('Laptop', 'HP ProBook 440 (Lot-01)', 120, 114, 6, 114),
('Laptop', 'Lenovo ThinkPad L14 (Lot-02)', 80, 80, 0, 80),
('Desktop', 'Dell OptiPlex 3090 (Lot-01)', 200, 185, 15, 185),
('Printer', 'HP LaserJet M1005 (Lot-01)', 45, 41, 4, 41),
('UPS', 'APC Back-UPS 600VA (Lot-03)', 150, 142, 8, 142);
GO

-- चेक करने के लिए कि डेटा डला या नहीं, इसे चलाकर देखें:
SELECT * FROM Independent_Overall_Reports;
