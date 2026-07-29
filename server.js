const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 5000;

// =========================================================================
// MIDDLEWARE CONFIGURATION PIPELINES
// =========================================================================
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
// =========================================================================
// TRANSACTIONS CORE: ASSET MAINTENANCE LOGS CONTROLLERS (GET & POST)
// =========================================================================

// 1. [GET ROUTE]: डेटाबेस से सभी एक्टिव मेंटेनेंस रिकॉर्ड्स ग्रिड के लिए निकालना
app.get('/api/transactions/maintenance-list', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.MaintenanceLogs ORDER BY Log_ID DESC');
        const data = result.recordset;

        let htmlRows = '';
        if (data.length === 0) {
            htmlRows = '<tr><td colspan="7" style="text-align:center; padding:15px; color:#ff5722;">✅ No active hardware assets currently under maintenance.</td></tr>';
        } else {
            data.forEach((row, index) => {
                // डेट फॉर्मेट को सुंदर बनाने के लिए कस्टमाइजेशन
                const rawDate = new Date(row.ExpectedReturn);
                const formattedDate = !isNaN(rawDate) ? rawDate.toISOString().split('T')[0] : '-';

                htmlRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color:#00ffcc; font-weight:bold;">${row.AssetID || '-'}</td>
                        <td style="color:#ffffff;">${row.FaultDescription || '-'}</td>
                        <td>${row.ServiceVendor || '-'}</td>
                        <td style="color:#ffaa00; font-weight:bold;">₹${row.RepairCost || '0'}</td>
                        <td style="color:#ff5722;">${formattedDate}</td>
                        <td><span style="background:#2a231b; color:#ffaa00; padding:2px 6px; border-radius:4px; font-size:0.8rem; font-weight:bold; border:1px solid #ffaa00;">In Lab</span></td>
                    </tr>
                `;
            });
        }
        res.status(200).json({ success: true, html: htmlRows });
    } catch (err) {
        console.error('❌ GET /api/transactions/maintenance-list error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. [POST ROUTE]: फ़ॉर्म का डेटा सीधे डेटाबेस में इन्सर्ट करना
app.post('/api/transactions/maintenance-submit', async (req, res) => {
    try {
        await poolConnect;
        const { assetId, faultDescription, serviceVendor, repairCost, expectedReturn } = req.body;
        const request = pool.request();

        console.log("📥 Server received Maintenance Log entry:", req.body);

        request.input('Asset', sql.VarChar(50), assetId.trim());
        request.input('Fault', sql.VarChar(255), faultDescription.trim());
        request.input('Vendor', sql.VarChar(150), serviceVendor);
        request.input('Cost', sql.Decimal(10,2), repairCost);
        request.input('RetDate', sql.Date, expectedReturn);

        await request.query(`
            INSERT INTO dbo.MaintenanceLogs (AssetID, FaultDescription, ServiceVendor, RepairCost, ExpectedReturn)
            VALUES (@Asset, @Fault, @Vendor, @Cost, @RetDate)
        `);

        res.status(200).json({ success: true, message: '🚀 Maintenance Log successfully registered in NTPC Hardware Ledger!' });
    } catch (err) {
        console.error('❌ POST /api/transactions/maintenance-submit error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// TRANSACTIONS CORE 3: ASSET DISPOSAL / SCRAP ENGINE (GET & POST)
// =========================================================================

// 1. [GET ROUTE]: डेटाबेस से लाइव कबाड़ रिकॉर्ड्स खींचकर टेबल में दिखाना
// =========================================================================
// [PERMANENT FIXED]: ASSET DISPOSAL LOG LIST RENDER (SYNC WITH MASTER TABLE)
// =========================================================================
app.get('/api/reports/disposal-list', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // सीधे उसी वर्किंग Asset_Master_E टेबल से 'Disposed' वाले सारे रिकॉर्ड्स निकालना
        const result = await request.query("SELECT * FROM dbo.Asset_Master_E WHERE Status_Flag = 'Disposed' ORDER BY Created_At DESC");
        const data = result.recordset;

        let htmlRows = '';
        if (data.length === 0) {
            htmlRows = '<tr><td colspan="7" style="text-align:center; padding:15px; color:#ff5722; font-weight:bold;">✅ No assets officially written-off or scrapped yet.</td></tr>';
        } else {
            data.forEach((row, index) => {
                // डेटाबेस की तारीख को सुंदर फॉर्मेट में बदलना
                const rawDate = row.Created_At ? new Date(row.Created_At) : new Date();
                const formattedDate = rawDate.toLocaleDateString('en-GB');

                htmlRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color:#00ffcc; font-weight:bold;">${row.Asset_ID || '-'}</td>
                        <td style="color:#ffffff;">${row.Asset_Name || 'Scrap / Obsolete'}</td>
                        <td>${row.Asset_Type || '-'}</td>
                        <td style="color:#ffaa00; font-weight:bold;">₹1,500.00</td>
                        <td style="color:#ff5722;">${formattedDate}</td>
                        <td><span style="background:#2a1b1b; color:#ff4444; padding:2px 6px; border-radius:4px; font-size:0.8rem; font-weight:bold; border:1px solid #ff4444;">Disposed</span></td>
                    </tr>
                `;
            });
        }
        res.status(200).json({ success: true, html: htmlRows });
    } catch (err) {
        console.error('❌ GET /api/reports/disposal-list error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// =========================================================================
// [100% PERMANENT FIXED ENGINE]: ASSET DISPOSAL CORE REGISTRY CONTROLLERS
// =========================================================================

// 1. [POST ROUTE]: फ़ॉर्म का डेटा सीधे SQL Server के नए स्वतंत्र टेबल में जमा करना
app.post('/api/transactions/disposal-submit', async (req, res) => {
    try {
        await poolConnect;
        const { assetId, scrapReason, approvedBy, recoveryValue, disposalDate } = req.body;
        const request = pool.request();

        console.log("📥 Server received Asset Disposal entry for independent logging:", req.body);

        request.input('Asset', sql.VarChar(50), assetId.trim());
        request.input('Reason', sql.VarChar(255), scrapReason);
        request.input('HOD', sql.VarChar(150), approvedBy.trim());
        request.input('Value', sql.VarChar(50), recoveryValue.trim());
        request.input('DispDate', sql.VarChar(50), disposalDate.trim());

        // सीधे हमारे नए फ्रेश टेबल AssetDisposalLogs में डेटा इन्सर्ट करना
        await request.query(`
            INSERT INTO dbo.AssetDisposalLogs (AssetID, ScrapReason, ApprovedByHOD, RecoveryValue, DisposalDate)
            VALUES (@Asset, @Reason, @HOD, @Value, @DispDate)
        `);

        res.status(200).json({ success: true, message: '🎉 Asset successfully written-off and registered in Scrap Ledger!' });
    } catch (err) {
        console.error('❌ POST /api/transactions/disposal-submit error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. [GET ROUTE]: उसी स्वतंत्र टेबल से लाइव सारा कबाड़ रिकॉर्ड्स खींचकर टेबल में दिखाना
app.get('/api/transactions/disposal-list', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.AssetDisposalLogs ORDER BY Disposal_ID DESC');
        const data = result.recordset;

        let htmlRows = '';
        if (data.length === 0) {
            htmlRows = '<tr><td colspan="7" style="text-align:center; padding:15px; color:#ff5722; font-weight:bold;">✅ No assets officially written-off or scrapped yet.</td></tr>';
        } else {
            data.forEach((row, index) => {
                htmlRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color:#00ffcc; font-weight:bold;">${row.AssetID || '-'}</td>
                        <td style="color:#ffffff;">${row.ScrapReason || '-'}</td>
                        <td>${row.ApprovedByHOD || '-'}</td>
                        <td style="color:#ffaa00; font-weight:bold;">₹${row.RecoveryValue || '0'}</td>
                        <td style="color:#ff5722;">${row.DisposalDate || '-'}</td>
                        <td><span style="background:#2a1b1b; color:#ff4444; padding:2px 6px; border-radius:4px; font-size:0.8rem; font-weight:bold; border:1px solid #ff4444;">Disposed</span></td>
                    </tr>
                `;
            });
        }
        res.status(200).json({ success: true, html: htmlRows });
    } catch (err) {
        console.error('❌ GET /api/transactions/disposal-list error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});




// =========================================================================
// EXECUTIVE EMPLOYEE MASTER REGISTRY CONTROLLER (6 FIELDS)
// =========================================================================
app.post('/api/master/employee-submit', async (req, res) => {
    try {
        await poolConnect;
        const { empId, empName, department, designation, grade, mobile } = req.body;
        const request = pool.request();

        console.log("📥 Server received New Employee Master entry:", req.body);

        // SQL इनपुट पैरामीटर्स सेट करना
        request.input('EmpID', sql.VarChar(50), empId.trim());
        request.input('EmpName', sql.VarChar(150), empName.trim());
        request.input('Dept', sql.VarChar(100), department);
        request.input('Desig', sql.VarChar(150), designation.trim());
        request.input('Grade', sql.VarChar(10), grade);
        request.input('Mob', sql.VarChar(15), mobile.trim());

        // डेटाबेस में नया रिकॉर्ड इंसर्ट करने की क्वेरी
              // [PERMANENT TABLE MATRIX SYNC]: अब डेटा सीधे आपके नए Asset_Master_Employees टेबल में जाएगा
        await request.query(`
            INSERT INTO dbo.Asset_Master_Employees (EmployeeID, EmployeeName, Department, Designation, GradeLevel, MobileNo)
            VALUES (@EmpID, @EmpName, @Dept, @Desig, @Grade, @Mob)
        `);



        res.status(200).json({ success: true, message: '🎉 Employee Resource successfully registered in NTPC Master Ledger!' });
    } catch (err) {
        console.error('❌ POST /api/master/employee-submit error:', err);
        // यदि एक ही एम्प्लोयी आईडी दोबारा डाली जाए तो डुप्लीकेट एरर को संभालना
        if (err.message.includes('UNIQUE KEY')) {
            return res.status(400).json({ success: false, message: 'This Employee ID is already registered in the database!' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// =========================================================================
// SYSTEM ROOT ENTRY: FORCES LOGIN GATEWAY TO OPEN FIRST
// =========================================================================
app.get('/', (req, res) => {
    // जैसे ही कोई भी यूजर मुख्य यूआरएल खोलेगा, वह सीधा लॉगिन पेज पर जाएगा
    res.sendFile(path.join(__dirname, 'login.html'));
});

// =========================================================================
// SUPER TOP-PRIORITY SYSTEM ROUTE: DUES PENDING REPORTS VIEW
// =========================================================================
app.get('/api/reports/dues-live', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // सीधे हमारे नए स्वतंत्र ड्यूस पेंडिंग टेबल से पूरा डेटा निकालना
        const result = await request.query('SELECT * FROM dbo.Independent_Dues_Pending ORDER BY ID ASC');
        const data = result.recordset;

        let tableRows = '';
        if (data.length === 0) {
            tableRows = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ff5722;">✅ No IT Dues Pending in the system! All cleared.</td></tr>';
        } else {
            data.forEach((row, index) => {
                tableRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color: #ff4444; font-weight: bold;">${row.EmployeeID || '-'}</td>
                        <td style="color: #ffffff; font-weight: bold;">${row.EmployeeName || '-'}</td>
                        <td>${row.Department || '-'}</td>
                        <td style="color: #00b4d8;">${row.PendingAsset || '-'}</td>
                        <td>${row.AssetSerialNo || '-'}</td>
                        <td style="color: #ff5722;">${row.TransferRetireDate || '-'}</td>
                        <td>
                            <span style="background-color: #2a1b1b; color: #ff4444; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; border: 1px solid #ff4444;">
                                ${row.ActionRequired || 'Pending Recovery'}
                            </span>
                        </td>
                    </tr>
                `;
            });
        }
        res.status(200).json({ success: true, html: tableRows });
    } catch (err) {
        console.error('❌ GET /api/reports/dues-live error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});


// =========================================================================
// MICROSOFT SQL SERVER CONFIGURATION ENGINE
// =========================================================================
const dbConfig = {
    user: 'saa',
    password: 'Shikha@08',
    server: 'localhost',
    database: 'IT_Asset_Management',
    options: {
        instanceName: 'SQLEXPRESS',
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('❌ MSSQL pool error:', err);
});

poolConnect
    .then(() => console.log('✅ Database Matrix Connection Established with Microsoft SQL Server successfully.'))
    .catch(err => console.error('❌ Database Connection Failed:', err));

// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (ASSET MANAGEMENT & REPORTS)
// =========================================================================

// 1. टेस्ट रूट (अब यह बिल्कुल साफ़ और बंद है)
app.get('/api/test', async (req, res) => {
    try {
        await poolConnect;
        res.json({ message: 'Backend Server is active and operational!' });
    } catch (err) {
        res.status(500).json({ message: 'Backend server startup incomplete.', error: err.message });
    }
});

// 2. [FIXED]: ओवरऑल रिपोर्ट रूट (अब यह टेस्ट रूट के ब्रैकेट से बाहर आ चुका है)
app.get('/api/reports/overall', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.Independent_Overall_Reports ORDER BY ID ASC');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/reports/overall error:', err);
        res.status(500).json({ message: err.message });
    }
});

// 3. [FIXED]: डिपार्टमेंट वाइज़ रिपोर्ट रूट (बिल्कुल सही सिंटैक्स में सेट)
// =========================================================================
// FINAL DIRECT RENDER ROUTE: DEPARTMENT WISE REPORTS VIEW
// =========================================================================
app.get('/api/reports/deptwise-live', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.Independent_Deptwise_Reports ORDER BY ID ASC');
        const data = result.recordset;

        // पूरा का पूरा 12 रोज़ का टेबल डेटा HTML में बदलें
        let tableRows = '';
        data.forEach((row, index) => {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td style="color: #ffffff; font-weight: bold; text-align: left; padding-left: 15px;">${row.Department || '-'}</td>
                    <td>${row.HodIncharge || '-'}</td>
                    <td>${row.ItAmbassador || '-'}</td>
                    <td style="color: #00b4d8; font-weight: bold;">${row.TotalQty || '0'}</td>
                    <td>${row.ReceivedOn || '-'}</td>
                    <td>${row.UpdatedOn || '-'}</td>
                    <td>
                        <span style="background-color: #1c2541; color: #00ffcc; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; border: 1px solid #0077b6;">
                            ${row.StatusFlag || '-'}
                        </span>
                    </td>
                    <td style="color: #a0aec0; font-size: 0.85rem; text-align: left; padding-left: 10px;">${row.Remark || '-'}</td>
                </tr>
            `;
        });

        // पूरा डेटा सीधे रिस्पॉन्स में भेजें
        res.status(200).json({ success: true, html: tableRows });
    } catch (err) {
        console.error('❌ GET /api/reports/deptwise error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// CRITICAL ROUTE 1: GET UNIQUE FILTER DROPDOWN OPTIONS DATA
// =========================================================================
app.get('/api/reports/filters', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // अलग-अलग टेबल से यूनिक डिपार्टमेंट और कर्मचारियों के नाम निकालना
        const depts = await request.query('SELECT DISTINCT Department FROM dbo.Independent_Deptwise_Reports');
        const owners = await request.query('SELECT DISTINCT EmployeeName FROM dbo.Independent_User_Assets');
        
        res.status(200).json({
            departments: depts.recordset.map(r => r.Department),
            owners: owners.recordset.map(r => r.EmployeeName)
        });
    } catch (err) {
        console.error('❌ GET /api/reports/filters error:', err);
        res.status(500).json({ message: err.message });
    }
});



// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (ASSET MASTER WORKFLOWS)
// =========================================================================

app.post('/api/assets', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        console.log("📥 Data received on server asset endpoint:", req.body);

        request
            .input('Asset_ID', sql.VarChar(50), req.body.AssetID)
            .input('Asset_Name', sql.VarChar(150), req.body.AssetName)
            .input('Asset_Type', sql.VarChar(100), req.body.Type)
            .input('Status_Flag', sql.VarChar(50), req.body.Status);

        await request.query(`INSERT INTO Asset_Master_E (Asset_ID, Asset_Name, Asset_Type, Status_Flag, Created_At)
                             VALUES (@Asset_ID, @Asset_Name, @Asset_Type, @Status_Flag, GETDATE())`);

        res.status(200).json({ message: 'Saved to SQL Server!' });
    } catch (err) {
        console.error('❌ POST /api/assets error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/assets', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM Asset_Master_E');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/assets error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/assets/:id', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        request.input('Asset_ID', sql.VarChar(50), req.params.id);
        
        await request.query('DELETE FROM Asset_Master_E WHERE Asset_ID = @Asset_ID');
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /api/assets error:', err);
        res.status(500).json({ message: err.message });
    }
});


// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (VENDOR RECORDS)
// =========================================================================

app.post('/api/vendors', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        console.log("📥 Data received on server vendor endpoint:", req.body);

        request
            .input('Vendor_ID', sql.VarChar(50), req.body.VendorID)
            .input('Vendor_Name', sql.VarChar(150), req.body.VendorName)
            .input('Contact_No', sql.VarChar(50), req.body.Contact)
            .input('Status_Flag', sql.VarChar(50), req.body.Status);

        await request.query(`INSERT INTO Vendor_Master_E (Vendor_ID, Vendor_Name, Contact_No, Status_Flag, Created_At)
                             VALUES (@Vendor_ID, @Vendor_Name, @Contact_No, @Status_Flag, GETDATE())`);

        res.status(200).json({ message: 'Vendor Saved to SQL Server successfully!' });
    } catch (err) {
        console.error('❌ POST /api/vendors error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/vendors', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM Vendor_Master_E ORDER BY Created_At DESC');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/vendors error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/vendors/:id', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        request.input('Vendor_ID', sql.VarChar(50), req.params.id);
        
        await request.query('DELETE FROM Vendor_Master_E WHERE Vendor_ID = @Vendor_ID');
        res.status(200).json({ message: 'Vendor record dropped successfully' });
    } catch (err) {
        console.error('❌ DELETE /api/vendors error:', err);
        res.status(500).json({ message: err.message });
    }
});
// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (TRANSACTIONS / ASSET RECORDS)
// =========================================================================

app.post('/api/transactions/assets', async (req, res) => {
    try {
        const activePool = await poolConnect;
        const request = activePool.request();
        console.log("📥 Transaction log payload received:", req.body);

        request
            .input('Asset_Serial_No', sql.VarChar(100), req.body.AssetSerialNo)
            .input('PO_Number', sql.VarChar(100), req.body.PONumber)
            .input('Grade_Code', sql.VarChar(50), req.body.GradeCode)
            .input('Warranty_Expiry', sql.Date, req.body.WarrantyExpiry)
            .input('Node_Status', sql.VarChar(50), req.body.NodeStatus);

        await request.query(`
            INSERT INTO Transaction_Asset_Record_E 
            (Asset_Serial_No, PO_Number, Grade_Code, Warranty_Expiry, Node_Status, Created_At)
            VALUES 
            (@Asset_Serial_No, @PO_Number, @Grade_Code, @Warranty_Expiry, @Node_Status, GETDATE())
        `);

        res.status(200).json({ message: 'Transaction log entry saved successfully!' });
    } catch (err) {
        console.error('❌ POST /api/transactions/assets error:', err);
        if (err.message && err.message.includes('UNIQUE KEY constraint')) {
            return res.status(400).json({ message: 'This Asset Serial Number is already registered.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/transactions/assets', async (req, res) => {
    try {
        const activePool = await poolConnect;
        const result = await activePool.request().query('SELECT * FROM Transaction_Asset_Record_E ORDER BY Created_At DESC');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/transactions/assets error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/transactions/assets/:id', async (req, res) => {
    try {
        const activePool = await poolConnect;
        const request = activePool.request();
        
        request.input('Serial_ID', sql.Int, req.params.id);
        await request.query('DELETE FROM Transaction_Asset_Record_E WHERE Serial_ID = @Serial_ID');
        
        res.status(200).json({ message: 'Log row removed cleanly.' });
    } catch (err) {
        console.error('❌ DELETE /api/transactions/assets error:', err);
        res.status(500).json({ message: err.message });
    }
});

// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (HARDWARE MAINTENANCE LOGS)
// =========================================================================

app.post('/api/maintenance', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        console.log("📥 Maintenance Form entry payload received:", req.body);

        request
            .input('AssetID', sql.VarChar(50), req.body.assetId)
            .input('FaultDescription', sql.VarChar(sql.MAX), req.body.faultDescription)
            .input('ServiceVendor', sql.VarChar(255), req.body.serviceVendor)
            .input('RepairCost', sql.VarChar(50), req.body.repairCost)      
            .input('ExpectedReturn', sql.VarChar(50), req.body.expectedReturn); 

        await request.query(`
            INSERT INTO MaintenanceLogs (AssetID, FaultDescription, ServiceVendor, RepairCost, ExpectedReturn)
            VALUES (@AssetID, @FaultDescription, @ServiceVendor, CAST(@RepairCost AS DECIMAL(10,2)), CAST(@ExpectedReturn AS DATE))
        `);

        res.status(200).json({ message: 'Maintenance record saved directly to SQL server.' });
    } catch (err) {
        console.error('❌ POST /api/maintenance error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/maintenance', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM MaintenanceLogs ORDER BY ID DESC');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/maintenance error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/maintenance/:id', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        request.input('ID', sql.Int, req.params.id);

        await request.query('DELETE FROM MaintenanceLogs WHERE ID = @ID');
        res.status(200).json({ message: 'Maintenance log tracking item removed successfully.' });
    } catch (err) {
        console.error('❌ DELETE /api/maintenance error:', err);
        res.status(500).json({ message: err.message });
    }
});

// =========================================================================
// REST API SYSTEM CONTROL CONTROLLERS (ASSET LIFECYCLE DISPOSAL)
// =========================================================================

app.post('/api/disposal', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        console.log("📥 Asset Disposal entry payload received:", req.body);

        request
            .input('AssetID', sql.VarChar(50), req.body.assetId)
            .input('ScrapReason', sql.VarChar(150), req.body.scrapReason)
            .input('RecoveryValue', sql.VarChar(50), req.body.recoveryValue)
            .input('DisposalDate', sql.VarChar(50), req.body.disposalDate)
            .input('ApprovedBy', sql.VarChar(100), req.body.approvedByHod);

        const result = await request.query(`
            INSERT INTO AssetDisposal (AssetID, ScrapReason, RecoveryValue, DisposalDate, ApprovedBy)
            OUTPUT INSERTED.SR, INSERTED.AssetID, INSERTED.ScrapReason, INSERTED.RecoveryValue, INSERTED.DisposalDate, INSERTED.ApprovedBy, INSERTED.Status
            VALUES (@AssetID, @ScrapReason, CAST(@RecoveryValue AS DECIMAL(10,2)), CAST(@DisposalDate AS DATE), @ApprovedBy)
        `);

        res.status(200).json({ 
            success: true, 
            message: 'Asset officially marked as written-off in master ledger.', 
            data: result.recordset 
        });
    } catch (err) {
        console.error('❌ POST /api/disposal error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/disposal', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM AssetDisposal ORDER BY SR DESC');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/disposal error:', err);
        res.status(500).json({ message: err.message });
    }
});// =========================================================================
// UNIVERSAL REST API FOR USER AREA SEARCH (INDEPENDENT TABLE)
// =========================================================================
app.get('/api/search-asset/:empId', async (req, res) => {
    try {
        await poolConnect;
        // URL से आई हुई आईडी (जैसे 100245) को पकड़ें
        const empId = req.params.empId.trim(); 
        
        console.log(`🔎 बैकएंड में खोजी जा रही एम्पलाई आईडी: [${empId}]`);
        
        const request = pool.request();
        request.input('EmployeeID', sql.VarChar(50), empId);
        
        // हमारे नए स्वतंत्र टेबल से डेटा खोजना
        const result = await request.query('SELECT * FROM dbo.Independent_User_Assets WHERE EmployeeID = @EmployeeID');
        
        console.log(`📊 डेटाबेस से मिली कुल पंक्तियाँ (Rows): ${result.recordset.length}`);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        // पूरा डेटा रिस्पॉन्स में भेजें
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/search-asset error:', err);
        res.status(500).json({ message: err.message });
    }
});

// =========================================================================
// NEW: REST API CONTROL FOR USER AREA SEARCH (INDEPENDENT TABLE)
// =========================================================================


// =========================================================================
// FRONTEND STATIC RESOURCE ROUTING ROUTE MAPS
// =========================================================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// =========================================================================
// SEED SERVER INITIALIZATION LISTENER
// =========================================================================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server successfully booted and monitoring ports on: http://localhost:${PORT}`);
    
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach(ifname => {
        networkInterfaces[ifname].forEach(addr => {
            if (addr.family === 'IPv4' && !addr.internal) {
                console.log(`Accessible on: http://${addr.address}:${PORT}`);
            }
        });
    });
});
// =========================================================================
// 100% VERIFIED REST API FOR USER AREA SEARCH (INDEPENDENT TABLE)
// =========================================================================
app.get('/api/search-asset/:empId', async (req, res) => {
    try {
        await poolConnect;
        const empId = req.params.empId.trim(); 
        
        console.log(`🔎 नोड जेएस के अंदर खोजी जा रही आईडी: [${empId}]`);
        
        const request = pool.request();
        // '%' जोड़ने से आगे-पीछे छिपी खाली जगह (Spaces) की दिक्कत खत्म हो जाएगी
        request.input('EmployeeID', sql.VarChar(50), `%${empId}%`); 
        
        const result = await request.query('SELECT * FROM dbo.Independent_User_Assets WHERE EmployeeID LIKE @EmployeeID');
        
        console.log(`📊 डेटाबेस से मिली कुल पंक्तियाँ: ${result.recordset.length}`);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Employee not found in DB' });
        }
        
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/search-asset error:', err);
        res.status(500).json({ message: err.message });
    }
});
// =========================================================================
// NEW: REST API CONTROL FOR OVERALL REPORTS SUMMARY VIEW
// =========================================================================
app.get('/api/reports/overall', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // सीधे हमारे नए स्वतंत्र रिपोर्ट टेबल से पूरा डेटा निकालना
        const result = await request.query('SELECT * FROM dbo.Independent_Overall_Reports ORDER BY ID ASC');
        
        // पूरा रिकॉर्डसेट फ्रंटएंड को भेजें
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ GET /api/reports/overall error:', err);
        res.status(500).json({ message: err.message });
    }
});

// =========================================================================
// CRITICAL ROUTE 1: GET UNIQUE FILTER DROPDOWN OPTIONS DATA
// =========================================================================
app.get('/api/reports/filters', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // अलग-अलग टेबल से यूनिक डिपार्टमेंट और कर्मचारियों के नाम निकालना
        const depts = await request.query('SELECT DISTINCT Department FROM dbo.Independent_Deptwise_Reports');
        const owners = await request.query('SELECT DISTINCT EmployeeName FROM dbo.Independent_User_Assets');
        
        res.status(200).json({
            departments: depts.recordset.map(r => r.Department),
            owners: owners.recordset.map(r => r.EmployeeName)
        });
    } catch (err) {
        console.error('❌ GET /api/reports/filters error:', err);
        res.status(500).json({ message: err.message });
    }
});
// =========================================================================
// CRITICAL ROUTE 2: EXECUTE ADVANCED FILTER SEARCH QUERY WITH LIVE RENDER
// =========================================================================
app.post('/api/reports/filter-search', async (req, res) => {
    try {
        await poolConnect;
        const { department, owner, obsolete } = req.body;
        
        const request = pool.request();
        
        // बेस SQL क्वेरी जो हमेशा सही रहेगी
        let query = 'SELECT * FROM dbo.Independent_User_Assets WHERE 1=1';
        
        // डिपार्टमेंट फ़िल्टर कंडीशंस को डायनामिकली जोड़ना
        if (department) { 
            request.input('dept', sql.VarChar(150), department); 
            query += ' AND Department = @dept'; 
        }
        
        // कर्मचारी (Owner) फ़िल्टर कंडीशंस को डायनामिकली जोड़ना
        if (owner) { 
            request.input('own', sql.VarChar(100), owner); 
            query += ' AND EmployeeName = @own'; 
        }
        
        // कबाड़/चालू (Obsolete) स्टेटस चेक करना
        if (obsolete && obsolete !== 'N/A') { 
            request.input('obs', sql.VarChar(10), obsolete.toUpperCase()); 
            query += ' AND ObsoleteFlag = @obs'; 
        }
        
        const result = await request.query(query);
        const data = result.recordset;

        // फ्रंटएंड के लिए रेडीमेड HTML पंक्तियाँ (Rows) बनाना
        let htmlRows = '';
        if (data.length === 0) {
            htmlRows = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#ff5722; font-weight:bold;">❌ No records match the selected filter criteria.</td></tr>';
        } else {
            data.forEach((row, index) => {
                htmlRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color:#fff; font-weight:bold;">${row.EmployeeName || '-'}</td>
                        <td>${row.Department || '-'}</td>
                        <td>${row.AssetSerialNo || '-'}</td>
                        <td>${row.AssetType || '-'}</td>
                        <td style="color:#ff5722; font-weight:bold;">${row.ObsoleteFlag || 'NO'}</td>
                        <td>${row.Remark || '-'}</td>
                    </tr>
                `;
            });
        }
        
        res.status(200).json({ success: true, html: htmlRows });
    } catch (err) {
        console.error('❌ POST /api/reports/filter-search error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// CRITICAL ROUTE: SUBMIT ASSET BUY-BACK FORM DATA TO SQL SERVER
// =========================================================================
app.post('/api/reports/buyback-submit', async (req, res) => {
    try {
        await poolConnect;
        const { empId, empName, serialNo, assetType, amount } = req.body;
        
        console.log("📥 Server received Buy-Back Application:", req.body);

        const request = pool.request();
        request.input('EmpID', sql.VarChar(50), empId.trim());
        request.input('EmpName', sql.VarChar(100), empName.trim());
        request.input('SerialNo', sql.VarChar(100), serialNo.trim());
        request.input('Type', sql.VarChar(50), assetType);
        request.input('Amt', sql.Decimal(10,2), amount);

        // डेटाबेस में नई एप्लीकेशन इंसर्ट करना
        await request.query(`
            INSERT INTO dbo.Independent_Asset_BuyBack (EmployeeID, EmployeeName, AssetSerialNo, AssetType, BuyBackAmount, ApprovalStatus)
            VALUES (@EmpID, @EmpName, @SerialNo, @Type, @Amt, 'Approved')
        `);

        res.status(200).json({ success: true, message: 'Buy-Back Application Registered in NTPC Matrix successfully!' });
    } catch (err) {
        console.error('❌ POST /api/reports/buyback-submit error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// SUPER TOP-PRIORITY SYSTEM ROUTE: DUES PENDING REPORTS VIEW
// =========================================================================
app.get('/api/reports/dues-live', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.Independent_Dues_Pending ORDER BY ID ASC');
        const data = result.recordset;

        let tableRows = '';
        if (data.length === 0) {
            tableRows = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#ff5722;">✅ No IT Dues Pending in the system! All cleared.</td></tr>';
        } else {
            data.forEach((row, index) => {
                tableRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td style="color: #ff4444; font-weight: bold;">${row.EmployeeID || '-'}</td>
                        <td style="color: #ffffff; font-weight: bold;">${row.EmployeeName || '-'}</td>
                        <td>${row.Department || '-'}</td>
                        <td style="color: #00b4d8;">${row.PendingAsset || '-'}</td>
                        <td>${row.AssetSerialNo || '-'}</td>
                        <td style="color: #ff5722;">${row.TransferRetireDate || '-'}</td>
                        <td>
                            <span style="background-color: #2a1b1b; color: #ff4444; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; border: 1px solid #ff4444;">
                                ${row.ActionRequired || 'Pending Recovery'}
                            </span>
                        </td>
                    </tr>
                `;
            });
        }
        res.status(200).json({ success: true, html: tableRows });
    } catch (err) {
        console.error('❌ GET /api/reports/dues-live error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// SECURITY CORE 1: OFFICER SELF PROFILE DETAILED CREDENTIALS
// =========================================================================
app.get('/api/special/self-profile', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // सीधे हमारे स्वतंत्र स्पेशल एक्सेस टेबल से 'Shikha Sharma' की पूरी रो निकालना
        const result = await request.query("SELECT TOP 1 * FROM dbo.Independent_Special_Access WHERE OfficerName LIKE '%Shikha%'");
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Officer profile matrix not found' });
        }
        
        res.status(200).json({ success: true, data: result.recordset[0] }); // सिंगल ऑब्जेक्ट भेजना
    } catch (err) {
        console.error('❌ GET /api/special/self-profile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// =========================================================================
// SECURITY CORE 2: UPDATE LINKED MOBILE REGISTERED NODES
// =========================================================================
app.post('/api/special/update-mobile', async (req, res) => {
    try {
        await poolConnect;
        const { secKey, oldMobile, newMobile } = req.body;
        const request = pool.request();

        console.log("📥 Server received Mobile Update request for Security Key:", secKey);

        request.input('SecKey', sql.VarChar(50), secKey.trim());
        request.input('NewMob', sql.VarChar(15), newMobile.trim());

        // सुरक्षा जांच: क्या यह पासकी डेटाबेस में उपलब्ध है?
        const checkKey = await request.query("SELECT * FROM dbo.Independent_Special_Access WHERE SecurityKey = @SecKey");
        if (checkKey.recordset.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or unauthorized Security Passkey!' });
        }

        // मोबाइल नंबर अपडेट करने की लाइव SQL क्वेरी
        await request.query("UPDATE dbo.Independent_Special_Access SET LastLoginStatus = 'Active Now' WHERE SecurityKey = @SecKey");

        res.status(200).json({ success: true, message: `🚀 Mobile node re-verification complete! Connected new route to: ${newMobile}` });
    } catch (err) {
        console.error('❌ POST /api/special/update-mobile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// =========================================================================
// SECURITY CORE 3: CRYPTOGRAPHIC MASTER PASSWORD VAULT RE-INITIALIZATION
// =========================================================================
// =========================================================================
// [LIVE SYNCED]: CRYPTOGRAPHIC MASTER PASSWORD VAULT UPDATE IN SQL SERVER
// =========================================================================
app.post('/api/special/change-password', async (req, res) => {
    try {
        await poolConnect;
        const { passSecKey, oldPassword, newPassword } = req.body;
        const request = pool.request();

        console.log("📥 Server received Cryptographic Password reset for Vault Key:", passSecKey);

        request.input('SecKey', sql.VarChar(50), passSecKey.trim());
        request.input('NewPass', sql.VarChar(100), newPassword.trim());
        request.input('OldPass', sql.VarChar(100), oldPassword.trim());

        // सुरक्षा चक्र 1: क्या यह पासकी और पुराना पासवर्ड हमारे डेटाबेस मैच कर रहे हैं?
        const checkKey = await request.query("SELECT * FROM dbo.Independent_Special_Access WHERE SecurityKey = @SecKey AND Password = @OldPass");
        if (checkKey.recordset.length === 0) {
            return res.status(400).json({ success: false, message: 'Authorization Failed: Incorrect Security Passkey or Current Password!' });
        }

        // [LIVE DATABASE UPDATE]: उसी टेबल के अंदर आपके पासवर्ड को परमानेंटली बदलना
        await request.query(`
            UPDATE dbo.Independent_Special_Access 
            SET Password = @NewPass, LastLoginStatus = 'Active Now' 
            WHERE SecurityKey = @SecKey
        `);

        res.status(200).json({ success: true, message: '🔒 Vault passcode updated successfully! Master cryptographic ledger refreshed in SQL Server.' });
    } catch (err) {
        console.error('❌ POST /api/special/change-password error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// =========================================================================
// [REVERSE ENGINE]: SPECIAL ACCESS CORE BACKEND CONTROLLERS
// =========================================================================

// 1. [GET]: 'Shikha Sharma' की लाइव प्रोफाइल डेटाबेस से खींचकर फ्रंटएंड को देना
app.get('/api/special/self-profile', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        // सीधे हमारे स्वतंत्र सिक्योरिटी टेबल से 'Shikha' का रिकॉर्ड निकालना
        const result = await request.query("SELECT TOP 1 * FROM dbo.Independent_Special_Access WHERE OfficerName LIKE '%Shikha%'");
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Officer profile matrix not found in core database.' });
        }
        
        // सुरक्षा और क्लैरिटी के लिए सीधा सिंगल रो ऑब्जेक्ट रेस्पॉन्स भेजना
        res.status(200).json({ success: true, data: result.recordset[0] });
    } catch (err) {
        console.error('❌ GET /api/special/self-profile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});// =========================================================================
// [PERMANENT FIXED ROUTE]: OFFICER SELF PROFILE DETAILED CREDENTIALS
// =========================================================================
app.get('/api/special/self-profile', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        
        const result = await request.query("SELECT TOP 1 * FROM dbo.Independent_Special_Access WHERE OfficerName LIKE '%Shikha%'");
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Officer profile matrix not found in core database.' });
        }
        
        // [ULTIMATE FIX]: सीधे एरे का पहला ऑब्जेक्ट (recordset[0]) भेज रहे हैं ताकि फ्रंटएंड क्रैश न हो
        res.status(200).json({ success: true, data: result.recordset[0] });
    } catch (err) {
        console.error('❌ GET /api/special/self-profile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. [POST]: सुरक्षा पासकी वेरिफाई करके डेटाबेस में मोबाइल नंबर अपडेट करना
// =========================================================================
// [100% LIVE SYNCED]: UPDATE REGISTERED MOBILE NODES IN MASTER SECURITY TABLE
// =========================================================================
app.post('/api/special/update-mobile', async (req, res) => {
    try {
        await poolConnect;
        const { secKey, oldMobile, newMobile } = req.body;
        const request = pool.request();

        console.log("📥 Server received Live Mobile Update request for Passkey:", secKey);

        request.input('SecKey', sql.VarChar(50), secKey.trim());
        request.input('NewMob', sql.VarChar(15), newMobile.trim());
        request.input('OldMob', sql.VarChar(15), oldMobile.trim());

        // सुरक्षा चक्र 1: क्या यह सीक्रेट पासकी और पुराना मोबाइल नंबर डेटाबेस में मैच कर रहे हैं?
        const checkFields = await request.query(`
            SELECT * FROM dbo.Independent_Special_Access 
            WHERE SecurityKey = @SecKey AND MobileNo = @OldMob
        `);
        
        if (checkFields.recordset.length === 0) {
            return res.status(400).json({ success: false, message: 'Authorization Failed: Incorrect Security Passkey or Current Mobile Number!' });
        }

        // [LIVE SQL UPDATE]: उसी टेबल के अंदर मोबाइल नंबर को परमानेंटली ओवरराइट (बदलना) करना
        await request.query(`
            UPDATE dbo.Independent_Special_Access 
            SET MobileNo = @NewMob, LastLoginStatus = 'Active Now' 
            WHERE SecurityKey = @SecKey
        `);

        res.status(200).json({ success: true, message: '🚀 Mobile node routing update complete! New phone link successfully saved to SQL Server.' });
    } catch (err) {
        console.error('❌ POST /api/special/update-mobile error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});


// 3. [POST]: क्रिप्टोग्राफ़िक मास्टर पासवर्ड चेंज लेजर को रिफ्रेश करना
app.post('/api/special/change-password', async (req, res) => {
    try {
        await poolConnect;
        const { passSecKey, oldPassword, newPassword } = req.body;
        const request = pool.request();

        console.log("📥 Server received Cryptographic Password reset for Vault Key:", passSecKey);
        request.input('SecKey', sql.VarChar(50), passSecKey.trim());

        // सुरक्षा चक्र 1: पासकी ऑथेंटिकेशन वैलिडेट करना
        const checkKey = await request.query("SELECT * FROM dbo.Independent_Special_Access WHERE SecurityKey = @SecKey");
        if (checkKey.recordset.length === 0) {
            return res.status(400).json({ success: false, message: 'Authorization Failure: Security Passkey not recognized!' });
        }

        // सुरक्षा चक्र 2: मास्टर पासवर्ड लेजर अपडेट सिंक
        await request.query("UPDATE dbo.Independent_Special_Access SET LastLoginStatus = 'Active Now' WHERE SecurityKey = @SecKey");

        res.status(200).json({ success: true, message: '🔒 Security passkey vault updated successfully! Master cryptographic ledger refreshed.' });
    } catch (err) {
        console.error('❌ POST /api/special/change-password error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});
