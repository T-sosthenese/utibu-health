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

CREATE TABLE medication.categories (
	categoryId INT IDENTITY (1, 1) PRIMARY KEY,
	categoryName VARCHAR (255) NOT NULL
);

CREATE TABLE medication.products (
	productId INT IDENTITY (1, 1) PRIMARY KEY,
	productName VARCHAR (255) NOT NULL,
	categoryId INT NOT NULL,
	listPrice DECIMAL (10, 2) NOT NULL,
	FOREIGN KEY (categoryId) REFERENCES medication.categories (categoryId) ON DELETE CASCADE ON UPDATE CASCADE,
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
	orderStatus tinyint NOT NULL,
	-- Order status: 1 = Unconfirmed; 2 = Confirmed;
	orderDate DATE NOT NULL,
	FOREIGN KEY (customerId) REFERENCES medication.customers (customerId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE medication.orderItems (
	orderId INT,
	itemId INT,
	productId INT NOT NULL,
	quantity INT NOT NULL,
	listPrice DECIMAL (10, 2) NOT NULL,
	PRIMARY KEY (orderId, itemId),
	FOREIGN KEY (orderId) REFERENCES medication.orders (orderId) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (productId) REFERENCES medication.products (productId) ON DELETE CASCADE ON UPDATE CASCADE
);