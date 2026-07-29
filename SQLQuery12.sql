USE IT_Asset_Management;
GO

-- ड्यूस पेंडिंग रिपोर्ट के लिए स्वतंत्र टेबल
CREATE TABLE Independent_Dues_Pending (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID VARCHAR(50),
    EmployeeName VARCHAR(100),
    Department VARCHAR(100),
    PendingAsset VARCHAR(150),
    AssetSerialNo VARCHAR(100),
    TransferRetireDate VARCHAR(50),
    DuesAmount DECIMAL(10,2) DEFAULT 0.00,
    ActionRequired VARCHAR(100) DEFAULT 'Recovery Pending'
);
GO

-- टेस्ट करने के लिए कुछ लाइव रिकॉर्ड्स डालना
INSERT INTO Independent_Dues_Pending (EmployeeID, EmployeeName, Department, PendingAsset, AssetSerialNo, TransferRetireDate, DuesAmount)
VALUES 
('100112', 'Rajesh Kumar', 'Operation Department', 'HP ProBook Laptop', 'NTPC-LP-8844', '25/07/2026', 0.00),
('100344', 'Anjali Sharma', 'Human Resources (HR)', 'iPad Air Tablet', 'NTPC-TB-1122', '31/07/2026', 0.00),
('100223', 'Suresh Meena', 'C&I Maintenance', 'Dell Desktop System', 'NTPC-DS-9900', '15/08/2026', 0.00),
('100455', 'Vikram Malhotra', 'Finance & Accounts', 'LaserJet Printer', 'NTPC-PR-5566', '10/08/2026', 0.00);
GO

SELECT * FROM Independent_Dues_Pending;
