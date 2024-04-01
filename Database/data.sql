-- Insert data into medication.customers
INSERT INTO medication.customers (firstName, lastName, phone, email, street, city, state, zipcode, password)
VALUES
    ('John', 'Doe', '123-456-7890', 'john.doe@example.com', '123 Main St', 'Anytown', 'CA', '12345', 'password123'),
    ('Jane', 'Smith', '987-654-3210', 'jane.smith@example.com', '456 Elm St', 'Otherville', 'NY', '54321', 'password456');

-- Insert data into medication.categories
INSERT INTO medication.categories (categoryName)
VALUES
    ('Prescription Medications'),
    ('Over-the-Counter Medications'),
    ('Personal Care Products');

-- Insert data into medication.products
INSERT INTO medication.products (productName, categoryId, listPrice)
VALUES
    ('Amoxicillin', 1, 10.99),
    ('Ibuprofen', 2, 5.99),
    ('Toothpaste', 3, 3.49);

-- Insert data into medication.stocks
INSERT INTO medication.stocks (productId, quantity)
VALUES
    (1, 50),
    (2, 100),
    (3, 200);

-- Insert data into medication.orders
INSERT INTO medication.orders (customerId, orderStatus, orderDate)
VALUES
    (1, 1, '2023-01-01'),
    (2, 1, '2023-01-02');

-- Insert data into medication.order_items
INSERT INTO medication.orderItems (orderId, itemId, productId, quantity, listPrice)
VALUES
    (1, 1, 1, 2, 10.99),
    (2, 1, 1, 3, 10.99),
    (2, 2, 2, 1, 5.99);