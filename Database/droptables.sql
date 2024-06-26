-- Drop tables in reverse order to avoid foreign key constraint errors
DROP TABLE IF EXISTS medication.orderItems;
DROP TABLE IF EXISTS medication.orders;
DROP TABLE IF EXISTS medication.stocks;
DROP TABLE IF EXISTS medication.products;
DROP TABLE IF EXISTS medication.customers;

-- Drop the schema
DROP SCHEMA IF EXISTS medication;
