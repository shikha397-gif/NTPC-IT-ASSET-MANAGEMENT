ALTER SERVER ROLE sysadmin ADD MEMBER saa;
GO

create database IT_Asset_Management;

ALTER LOGIN saa ENABLE;
GO
ALTER LOGIN saa WITH PASSWORD = 'Shikha@08';
GO