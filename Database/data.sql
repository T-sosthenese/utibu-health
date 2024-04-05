-- Insert data into medication.customers
INSERT INTO medication.customers (firstName, lastName, phone, email, street, city, state, zipcode, password)
VALUES
    ('John', 'Doe', '123-456-7890', 'john.doe@example.com', '123 Main St', 'Anytown', 'CA', '12345', 'password123'),
    ('Jane', 'Smith', '987-654-3210', 'jane.smith@example.com', '456 Elm St', 'Otherville', 'NY', '54321', 'password456');


-- Insert sample products
INSERT INTO medication.products (productName, listPrice) VALUES ('Lisinopril', 25.13);
INSERT INTO medication.products (productName, listPrice) VALUES ('Amlodipine', 65.12);
INSERT INTO medication.products (productName, listPrice) VALUES ('Metformin', 74.03);
INSERT INTO medication.products (productName, listPrice) VALUES ('Lamivudine', 44.01);

-- Insert sample stock data
INSERT INTO medication.stocks (productId, quantity) VALUES (1, 100);
INSERT INTO medication.stocks (productId, quantity) VALUES (2, 150);
INSERT INTO medication.stocks (productId, quantity) VALUES (3, 200);
INSERT INTO medication.stocks (productId, quantity) VALUES (4, 250);
