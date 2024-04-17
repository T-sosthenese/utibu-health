-- Insert sample products
INSERT INTO medication.products (productName, listPrice) VALUES ('Lisinopril', 25.13);
INSERT INTO medication.products (productName, listPrice) VALUES ('Amlodipine', 65.12);
INSERT INTO medication.products (productName, listPrice) VALUES ('Metformin', 74.03);
INSERT INTO medication.products (productName, listPrice) VALUES ('Lamivudine', 44.01);

-- Insert sample stock data
INSERT INTO medication.stocks (productId, productName, quantity) VALUES (1, 'Lisinopril', 100);
INSERT INTO medication.stocks (productId, productName, quantity) VALUES (2, 'Amlodipine', 150);
INSERT INTO medication.stocks (productId, productName, quantity) VALUES (3, 'Metformin', 200);
INSERT INTO medication.stocks (productId, productName, quantity) VALUES (4, 'Lamivudine', 250);
