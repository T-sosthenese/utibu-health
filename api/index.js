const sql = require("msnodesqlv8");
const express = require("express");
const bodyParser = require("body-parser");
const Customer = require("./Customers/RegisterCustomer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
