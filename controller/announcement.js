const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");



// post add
const postCreate = async (req, res, next) => {
  try {
    var db = req.db;
    var data = {
        id: req.body.id,
        post: req.body.post,
        post_like: req.body.post_like,
        role: req.body.role,
        created_at: new Date()
      };
      
      // Check if req.file exists before including post_image property
      if (req.file) {
        data.post_image = req.file.filename;
      }

    db.query("INSERT INTO announcement SET ?", [data], function (err, rows) {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: "Error",
        });
      } else {
        res.status(201).send({
          statusCode: 201,
          message: "Success",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error",
    });
  }
};
// post list
const postList = async (req, res, next) => {
  try {
      const db = req.db;
      const sql = 'SELECT * FROM announcement ORDER BY created_at DESC';

      db.query(sql, (error, rows) => {
          if (error) {
              console.log("Error db");
              return res.status(500).send({
                  statusCode: 500,
                  message: "Internal Server Error",
              });
          } else {
              res.status(200).send({
                  statusCode: 200,
                  message: "Post List",
                  post: rows,
              });
          }
      });
  } catch (error) {
      console.error('Error fetching referral data:', error);
      return res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
}


module.exports = {
    postCreate,
    postList
};
