const sql = require("msnodesqlv8");

const connectionString =
  "Server=DESKTOP-OUFJNIL\\SQLEXPRESS;Database=utibu;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};";

// Define a model for the customers table
class Customer {
  constructor(
    firstName,
    lastName,
    phone,
    email,
    street,
    city,
    state,
    zipcode,
    password
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.password = password;
  }

  // Method to insert a new customer into the database
  async create() {
    try {
      const query = `
        INSERT INTO medication.customers (firstName, lastName, phone, email, street, city, state, zipcode, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        this.firstName,
        this.lastName,
        this.phone,
        this.email,
        this.street,
        this.city,
        this.state,
        this.zipcode,
        this.password,
      ];

      sql.query(connectionString, query, values, (err, result) => {
        if (err) {
          console.error("Error creating customer:", err);
        } else {
          console.log("Customer created:", result);
        }
      });
    } catch (err) {
      console.error("Error creating customer:", err);
    }
  }
}

module.exports = Customer;
