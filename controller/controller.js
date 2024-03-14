const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");



// admin registration
const adminRegistration = async (req, res, next) => {
  var db = req.db;
  // Validate request body using Joi
  const Joi = require('joi'); // Make sure to require Joi
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(), // Use email validation for the email field
    name: Joi.string().min(3).required(),
    role: Joi.string().min(1).required(),
    password: Joi.string().min(2).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, name, role, password } = value;

  // Check if the email is already taken
  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Insert the user into the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password: ", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      db.query(
        "INSERT INTO admin (email, name, role, password) VALUES (?, ?, ?, ?)",
        [email, name, role, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error executing query: ", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          return res.status(201).json({ message: "Registration successful!" });
        }
      );
    });
  });
};

// login
const adminLogin = async (req, res, next) => {
  // Validate request body using Joi
  var db = req.db;
  const { email, password } = req.body;

  // Retrieve the user from the database based on the username
  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ statusCode: 500, message: "Internal server error" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ statusCode: 401, message: "Authentication failed" });
    }

    const admin = rows[0];

    // Check if the password exists and has a length greater than 0
    if (!admin.password || admin.password.length === 0) {
      return res.status(200).json({ statusCode: 200, passwordCheck: true });
    }

    // Compare the provided password with the stored hash
    bcrypt.compare(password, admin.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords: ", err);
        return res.status(500).json({ statusCode: 500, message: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ statusCode: 401, message: "Authentication failed" });
      }
      const token = jwt.sign(
        {
          email: admin.email,
          role: admin.role,
          name: admin.name
        },
        process.env.JWT_SECRET, // Use a secure random secret
        { expiresIn: "1h" } // Token expires in 1 hour
      );
      // Passwords match, authentication successful
      return res.status(200).json({
        statusCode: 200,
        message: "Authentication successful!",
        token: token,
        user: {
          email: admin.email,
          role: admin.role,
          name: admin.name
        }
      });
    });
  });
};

// admin password

const memberPassword = async (req, res, next) => {
  try {
    var db = req.db;
    const { userEmail, password } = req.body;
    // Retrieve admin record based on email
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [userEmail], async (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the password in the database
      const updateQuery = 'UPDATE admin SET password = ? WHERE email = ?';
      db.query(updateQuery, [hashedPassword, userEmail], (err, results) => {
        if (err) throw err;
        return res.status(200).json({ message: 'Password updated successfully' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  adminLogin,
  adminRegistration,
  memberPassword
};
