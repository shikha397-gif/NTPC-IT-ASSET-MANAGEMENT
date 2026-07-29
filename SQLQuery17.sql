USE IT_Asset_Management;
GO

-- 1. यदि किसी भी नाम से पुराना टेबल अटका हो तो उसे पूरी तरह साफ करें
IF OBJECT_ID('dbo.Independent_Special_Access', 'U') IS NOT NULL
    DROP TABLE dbo.Independent_Special_Access;
GO

-- 2. फ्रेश स्पेशल एक्सेस टेबल बनाएं जिसमें 'Password' कॉलम पहले से ही जुड़ा हुआ है
CREATE TABLE Independent_Special_Access (
    Access_ID INT IDENTITY(1,1) PRIMARY KEY,
    OfficerName VARCHAR(100),
    Designation VARCHAR(100),
    AccessLevel VARCHAR(50),
    AssignedPrivilege VARCHAR(255),
    SecurityKey VARCHAR(50) UNIQUE,
    MobileNo VARCHAR(15) NULL,
    Password VARCHAR(100) NULL, -- आपका मनपसंद पासवर्ड कॉलम बिल्कुल फ्रेश जुड़ गया है!
    LastLoginStatus VARCHAR(50) DEFAULT 'Logged Out'
);
GO

-- 3. आपकी प्रोफाइल (Shikha Sharma) का पूरा लाइव रिकॉर्ड पासवर्ड '124' के साथ इन्सर्ट करें
INSERT INTO Independent_Special_Access (OfficerName, Designation, AccessLevel, AssignedPrivilege, SecurityKey, MobileNo, Password, LastLoginStatus)
VALUES 
('Shikha Sharma', 'Core System Engineer', 'System Admin', 'Master Configuration & Log Extraction Engine Override Rights', 'NTPC-SEC-008', '9876543210', '124', 'Active Now'),
('M.K. Bhatt', 'AGM (IT Infrastructure)', 'Super Admin', 'Full Plant Asset Database Write, Modify & Purge Access', 'NTPC-SEC-991', '9988776655', '991', 'Active Now');
GO

-- 4. लाइव चेक करें (अब नीचे ग्रिड में पूरा डेटा पासवर्ड के साथ 100% साफ़ दिखेगा):
SELECT * FROM dbo.Independent_Special_Access;
GO
