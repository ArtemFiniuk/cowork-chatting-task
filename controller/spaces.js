const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");



// spaces add
const spacesCreate = async (req, res, next) => {
  try {
    var db = req.db;
    var data = {
      id: req.body.id,
      name: req.body.name,
      rate: req.body.rate,
      size: req.body.size,
      tag: req.body.tag,
      space_image: req.file.filename,
      notes: req.body.notes,
      created_at: new Date()
    };

    db.query("INSERT INTO spaces SET ?", [data], function (err, rows) {
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

// spaces list
const spacesList = async (req, res, next) => {
  try {
    const db = req.db;
    const { limit = 10, page = 1 } = req.query; // Set default limit to 10 and default page to 1
    const offset = (page - 1) * limit;

    // Explicitly convert limit and offset to numbers
    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    // Query to get paginated results
    const sql = `
      SELECT * FROM spaces
      ORDER BY created_at DESC
      LIMIT ${db.escape(numericLimit)} OFFSET ${db.escape(numericOffset)};
    `;

    // Query to get total count
    const totalCountSql = 'SELECT COUNT(*) AS total FROM spaces;';

    // Execute both queries using Promises
    const [spaces, totalResult] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(sql, (error, rows) => {
          if (error) {
            console.error('Error executing SQL query:', error);
            reject(error);
          } else {
            resolve(rows);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(totalCountSql, (error, totalRows) => {
          if (error) {
            console.error('Error executing total count query:', error);
            reject(error);
          } else {
            resolve(totalRows[0].total);
          }
        });
      }),
    ]);

    const totalCount = totalResult;

    res.status(200).send({
      statusCode: 200,
      message: "Spaces List",
      spaces,
      limit: numericLimit,
      page: Number(page),
      total: totalCount,
    });

  } catch (error) {
    console.error('Error fetching spaces data:', error);
    return res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
};

// single spaces
const spacesSingle = async (req, res, next) => {
  try {
    var db = req.db;
    const spacesId = req.params.id;

    let results = await db.query("SELECT * FROM spaces WHERE id = ?", [spacesId], function (error, rows) {
      if (error) {
        res.status(500).send({
          statusCode: 500,
          message: "Internal Server Error",
        });
      } else {
        if (rows.length > 0) {
          res.status(200).send({
            statusCode: 200,
            message: "Spaces Information",
            data: rows[0],
          });
        } else {
          res.status(404).send({
            statusCode: 404,
            message: "Course Not Found",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}

// Update single spaces
const editSpaces = async (req, res, next) => {
    try {
        var db = req.db;
        const memberId = req.params.id;
        const dataToUpdate = req.body;

        if (req.file && req.file.filename) {
            dataToUpdate.space_image = req.file.filename;
        }

        db.query("UPDATE spaces SET ? WHERE id = ?", [dataToUpdate, memberId], function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    statusCode: 500,
                    message: "Error updating spaces",
                });
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Spaces Information Updated"
                });
            }
        });

    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
};


module.exports = {
  spacesCreate,
  spacesList,
  spacesSingle,
  editSpaces
};
