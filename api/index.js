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
    const { customerId, addresses } = req.body;

    // Check if customerId and addresses are provided in the request body
    if (!customerId || !addresses) {
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
            addresses.firstName || customer.firstName,
            addresses.lastName || customer.lastName,
            addresses.phone || customer.phone,
            addresses.state || customer.state,
            addresses.city || customer.city,
            addresses.street || customer.street,
            addresses.zipcode || customer.zipcode,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
