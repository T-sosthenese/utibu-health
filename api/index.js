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
          const token = jwt.sign({ email: user.email }, secretKey);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
