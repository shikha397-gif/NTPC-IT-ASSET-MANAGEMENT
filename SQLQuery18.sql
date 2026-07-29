USE IT_Asset_Management;
GO

-- यह पक्का करने के लिए कि आपकी रो में टेस्ट करने के लिए पुराना नंबर '9876543210' सेट है
UPDATE dbo.Independent_Special_Access 
SET MobileNo = '9876543210' 
WHERE SecurityKey = 'NTPC-SEC-008';
GO

-- वेरिफाई करने के लिए चेक करें:
SELECT * FROM dbo.Independent_Special_Access;
GO
