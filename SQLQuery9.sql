USE IT_Asset_Management;
GO

-- 1. पुराना टेबल यदि बना हो तो हटा दें ताकि आपके कॉलम्स मैच हो सकें
IF OBJECT_ID('dbo.Independent_Deptwise_Reports', 'U') IS NOT NULL
    DROP TABLE dbo.Independent_Deptwise_Reports;
GO

-- 2. आपके HTML के हिसाब से नया स्वतंत्र टेबल बनाएं
CREATE TABLE Independent_Deptwise_Reports (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Department VARCHAR(150),
    HodIncharge VARCHAR(100),
    ItAmbassador VARCHAR(100),
    TotalQty INT,
    ReceivedOn VARCHAR(50),
    UpdatedOn VARCHAR(50),
    StatusFlag VARCHAR(50),
    Remark VARCHAR(255)
);
GO

-- 3. पूरे 12 रोज़ का असली दिखने वाला एनटीपीसी डेटा डालें
INSERT INTO Independent_Deptwise_Reports (Department, HodIncharge, ItAmbassador, TotalQty, ReceivedOn, UpdatedOn, StatusFlag, Remark)
VALUES 
('C&I (Control & Instrumentation)', 'S.K. Verma', 'Ankit Mishra', 105, '10/01/2026', '12/05/2026', 'Active', 'All site nodes active'),
('Operation Department', 'R.K. Joshi', 'Sumit Saini', 131, '14/01/2026', '10/06/2026', 'Active', 'Control room setups ok'),
('Human Resources (HR)', 'V.K. Singh', 'Rahul Sharma', 40, '02/02/2026', '18/04/2026', 'Active', 'Office laptops synced'),
('Information Technology (IT)', 'M.K. Bhatt', 'Deepak Kumar', 48, '01/01/2026', '05/07/2026', 'Active', 'Server room assets lock'),
('Fuel Management (FMG)', 'P.K. Pradhan', 'Vikas Jha', 35, '20/02/2026', '11/05/2026', 'Active', 'Coal track systems mapped'),
('Electrical Maintenance', 'A.K. Shukla', 'Neeraj Pal', 29, '11/02/2026', '14/06/2026', 'Active', 'Field tablets verified'),
('Technical Services', 'S.S. Rao', 'Amit Tomar', 9, '15/03/2026', '20/03/2026', 'Active', 'Plotters operational'),
('Finance & Accounts', 'N.K. Ghoshal', 'Rohit Gupta', 50, '05/01/2026', '22/02/2026', 'Active', 'Audit desktop systems cleared'),
('Safety & Environment', 'S.C. Jena', 'Alok Tiwari', 18, '22/03/2026', '30/05/2026', 'Active', 'EHS monitoring terminals ok'),
('Store & Procurement', 'B.B. Rout', 'Sanjay Giri', 24, '10/02/2026', '15/04/2026', 'Active', 'Inventory scanner devices logged'),
('Medical & Hospital', 'Dr. A. Sahay', 'Manoj Das', 15, '18/01/2026', '25/01/2026', 'Active', 'Hospital management node setup'),
('Civil Maintenance', 'R.N. Prasad', 'Tarun Soy', 32, '04/03/2026', '19/06/2026', 'Active', 'Township office setups complete');
GO

-- वेरिफाई करने के लिए देखें:
SELECT * FROM Independent_Deptwise_Reports;
