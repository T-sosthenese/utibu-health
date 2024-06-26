-- create schemas
CREATE SCHEMA medication;
go

-- create tables
CREATE TABLE medication.customers (
	customerId INT IDENTITY (1, 1) PRIMARY KEY,
	firstName VARCHAR (255) NOT NULL,
	lastName VARCHAR (255) NOT NULL,
	phone VARCHAR (25),
	email VARCHAR (255) NOT NULL,
	street VARCHAR (255),
	city VARCHAR (50),
	state VARCHAR (25),
	zipcode VARCHAR (5),
	password VARCHAR (255) NOT NULL
);

CREATE TABLE medication.products (
	productId INT IDENTITY (1, 1) PRIMARY KEY,
	productName VARCHAR (255) NOT NULL,
	listPrice DECIMAL (10, 2) NOT NULL,
);

CREATE TABLE medication.stocks (
	productId INT,
	quantity INT,
	PRIMARY KEY (productId),
	FOREIGN KEY (productId) REFERENCES medication.products (productId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE medication.orders (
	orderId INT IDENTITY (1, 1) PRIMARY KEY,
	customerId INT,
	productName VARCHAR (255) NOT NULL,
	listPrice DECIMAL (10, 2) NOT NULL,
	quantity INT NOT NULL,
	total DECIMAL (10, 2) NOT NULL,
	FOREIGN KEY (customerId) REFERENCES medication.customers (customerId) ON DELETE CASCADE ON UPDATE CASCADE
);

