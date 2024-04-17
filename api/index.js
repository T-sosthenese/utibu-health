const express = require("express");
const bodyParser = require("body-parser");
const sql = require("msnodesqlv8");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Customer = require("./Customers/RegisterCustomer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectionString =
  "Server=DESKTOP-OUFJNIL\\SQLEXPRESS;Database=utibu;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};";

// Endpoint handler to register a new user
app.post("/register", (req, res) => {
  // Extract user data from the request body
  const userData = req.body;

  // Create a new Customer instance with the provided user data
  const customer = new Customer(
    userData.firstName,
    userData.lastName,
    userData.phone,
    userData.email,
    userData.street,
    userData.city,
    userData.state,
    userData.zipcode,
    userData.password
  );

  try {
    // Attempt to register the customer
    customer.create();

    // Send a success response
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    // Handle errors
    console.error("Error registering customer:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login a registered user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database to check if the email exists
    const query = `
      SELECT * FROM medication.customers
      WHERE email = ?
    `;
    const values = [email];

    sql.query(connectionString, query, values, (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Check if the email exists in the database
      if (result && result.length > 0) {
        const user = result[0];

        // Compare the password
        if (user.password === password) {
          // Passwords match, user is authenticated
          const token = jwt.sign({ customerId: user.customerId }, secretKey);
          console.log(token);
          return res.status(200).json({ token });
        } else {
          // Passwords do not match
          return res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        // Email not found in the database
        return res.status(401).json({ message: "Email not found" });
      }
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Login failed" });
  }
});

// Endpoint to update the customer addresses in the backend
app.post("/addresses", async (req, res) => {
  try {
    const { customerId, address } = req.body;

    // Check if customerId and addresses are provided in the request body
    if (!customerId || !address) {
      return res
        .status(400)
        .json({ message: "customerId and addresses are required" });
    }

    // Find the customer by the given customerId
    const findCustomerQuery = `
      SELECT * FROM medication.customers
      WHERE customerId = ?
    `;
    const findCustomerValues = [customerId];

    sql.query(
      connectionString,
      findCustomerQuery,
      findCustomerValues,
      (err, result) => {
        if (err) {
          console.error("Error querying customer:", err);
          return res.status(404).json({ message: "User not found" });
        }

        // Check if the customer exists
        if (result && result.length > 0) {
          const customer = result[0];

          // Update the customer's address fields
          const updateCustomerQuery = `
          UPDATE medication.customers
          SET firstName = ?, lastName = ?, phone = ?, state = ?, city = ?, street = ?, zipcode = ?
          WHERE customerId = ?
        `;
          const updateCustomerValues = [
            address.firstName || customer.firstName,
            address.lastName || customer.lastName,
            address.phone || customer.phone,
            address.state || customer.state,
            address.city || customer.city,
            address.street || customer.street,
            address.zipcode || customer.zipcode,
            customerId,
          ];

          sql.query(
            connectionString,
            updateCustomerQuery,
            updateCustomerValues,
            (updateErr, updateResult) => {
              if (updateErr) {
                console.error("Error updating customer:", updateErr);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }

              console.log("Customer updated:", updateResult);
              return res
                .status(200)
                .json({ message: "Customer addresses updated successfully" });
            }
          );
        } else {
          // Customer not found
          return res.status(404).json({ message: "Customer not found" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating customer addresses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to get all the addresses of a particular client
app.get("/addresses/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Check if customerId is provided
    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    // Query the database to retrieve customer information based on customerId
    const query = `
      SELECT * FROM medication.customers
      WHERE customerId = ?
    `;
    const values = [customerId];

    sql.query(connectionString, query, values, (err, result) => {
      if (err) {
        console.error("Error retrieving customer addresses:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Check if customer exists
      if (result && result.length > 0) {
        const customer = result[0];
        // Remove sensitive data such as password before sending the response
        delete customer.password;
        return res.status(200).json(customer);
      } else {
        // Customer not found
        return res.status(404).json({ message: "Customer not found" });
      }
    });
  } catch (error) {
    console.error("Error retrieving customer addresses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to create orders in the database
app.post("/orders", async (req, res) => {
  const { customerId, cartItems, totalPrice, paymentMethod } = req.body;

  try {
    // Check if customerId exists in the medication.customers table
    const customerCheckQuery =
      "SELECT COUNT(*) AS customerCount FROM medication.customers WHERE customerId = ?";
    const customerCheckValues = [customerId];

    // Execute the customer check query
    const customerCheckResult = await new Promise((resolve, reject) => {
      sql.query(
        connectionString,
        customerCheckQuery,
        customerCheckValues,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const customerCount = customerCheckResult[0].customerCount;

    if (customerCount === 0) {
      // If customerId does not exist, return an error
      return res.status(400).json({ message: "Invalid customerId" });
    }

    // Calculate total quantity
    const totalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    // Insert order into medication.orders table
    const insertOrderQuery =
      "INSERT INTO medication.orders (customerId, quantity, total, paymentOption, orderStatus) VALUES (?, ?, ?, ?, ?)";
    const orderValues = [
      customerId,
      totalQuantity,
      totalPrice,
      paymentMethod,
      null,
    ];

    // Execute the order insertion query
    await new Promise((resolve, reject) => {
      sql.query(
        connectionString,
        insertOrderQuery,
        orderValues,
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    // Fetch the last orderId for the current customerId
    const fetchOrderIdQuery = `SELECT TOP 1 orderId FROM medication.orders WHERE customerId = ? ORDER BY orderId DESC`;
    const fetchOrderIdValues = [customerId];

    const orderIdResult = await new Promise((resolve, reject) => {
      sql.query(
        connectionString,
        fetchOrderIdQuery,
        fetchOrderIdValues,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const orderId = orderIdResult[0].orderId;

    if (!orderId) {
      return res.status(500).json({ message: "Failed to retrieve orderId" });
    }

    // Define the insertOrderItemsQuery within the route handler function
    const insertOrderItemsQuery =
      "INSERT INTO medication.orderItems (orderId, productName, listPrice, quantity) VALUES (?, ?, ?, ?)";

    // Function to insert order item
    const insertOrderItem = async (item) => {
      const { productName, listPrice, quantity } = item;

      const orderItemValues = [orderId, productName, listPrice, quantity];

      return new Promise((resolve, reject) => {
        sql.query(
          connectionString,
          insertOrderItemsQuery,
          orderItemValues,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    };

    // Insert order items sequentially using Promise.all
    await Promise.all(cartItems.map((item) => insertOrderItem(item)));

    // All order items inserted successfully
    res
      .status(200)
      .json({ message: "Order successfully stored in the database" });
  } catch (error) {
    // Handle errors
    console.error("Error storing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to retrieve all orders associated with the current customerId
app.get("/orders/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Query the database to retrieve all orders associated with the current customerId
    const query = `
      SELECT * FROM medication.orders
      WHERE customerId = ?
    `;
    const values = [customerId];

    sql.query(connectionString, query, values, (err, result) => {
      if (err) {
        console.error("Error querying orders:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Check if orders are found
      if (result && result.length > 0) {
        // Orders found, return them
        return res.status(200).json({ orders: result });
      } else {
        // No orders found for the specified customerId
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
