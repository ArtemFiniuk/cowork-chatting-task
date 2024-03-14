const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
const util = require('util');
const fs = require('fs').promises;
const path = require('path');
const fsExtra = require('fs-extra');



// files add
const filesCreate = async (req, res, next) => {
  try {
    var db = req.db;
    var data = {
      id: req.body.id,
      name: req.body.name,
      nick_name: req.body.nickName,
      extension: req.body.extension,
      size: req.body.size,
      files_upload: req.file.filename,
      shares: req.body.shares,
      created_at: new Date()
    };

    db.query("INSERT INTO files SET ?", [data], function (err, rows) {
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

// files list
const filesList = async (req, res, next) => {
  try {
    const db = req.db;
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    // Explicitly convert limit and offset to numbers
    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    // Query to get paginated results
    const sql = `
    SELECT * FROM files
    ORDER BY 
      CASE WHEN favorite = true THEN 0 ELSE 1 END, 
      created_at DESC
    LIMIT ${db.escape(numericLimit)} OFFSET ${db.escape(numericOffset)};
  `;

    // Query to get total count
    const totalCountSql = 'SELECT COUNT(*) AS total FROM files;';
    // Execute both queries using Promises
    const [files, totalResult] = await Promise.all([
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
      message: "Files List",
      files,
      limit: numericLimit,
      page: Number(page),
      total: totalCount,
    });

  } catch (error) {
    console.error('Error fetching files data:', error);
    return res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
};

// files delete
const deleteFiles = async (req, res, next) => {
  var db = req.db;
  const filesId = req.params.id;
  db.query('DELETE FROM files WHERE id = ?', [filesId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'file not found' });
    }
    res.status(200).json({ message: 'file deleted successfully' });
  })
}

// files delete
const fileFavorite = async (req, res, next) => {
  var db = req.db;
  const fileId = req.params.id;
  db.query('SELECT favorite FROM files WHERE id = ?', [fileId], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const currentFavorite = results[0].favorite;
    const newFavorite = !currentFavorite;
    // Update the favorite column
    db.query('UPDATE files SET favorite = ? WHERE id = ?', [newFavorite, fileId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json({ message: 'Favorite updated successfully', newFavorite });
    });
  });
}

// files delete
const fileShare = async (req, res, next) => {
  var db = req.db;
  const fileId = req.params.id;
  const newShare = req.body.share;

  // Fetch the current shares from the database
  const getCurrentSharesQuery = 'SELECT shares FROM files WHERE id = ?';
  db.query(getCurrentSharesQuery, [fileId], (err, results) => {
    if (err) {
      console.error('Error fetching current shares:', err);
      res.status(500).json({ error: 'An error occurred while fetching current shares' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const currentShares = results[0].shares || ''; // Initialize to empty string if shares are null

    // Split the current shares by commas into an array
    const currentSharesArray = currentShares.split(',');

    // Check if the new share already exists in the current shares
    if (currentSharesArray.includes(newShare)) {
      res.status(400).json({ statusCode: 503, message: 'Share already exists' });
      return;
    }

    // Combine existing shares with new share
    const updatedShares = currentShares ? `${currentShares},${newShare}` : newShare;

    // Update query
    const updateSharesQuery = 'UPDATE files SET shares = ? WHERE id = ?';

    // Execute the query to update shares
    db.query(updateSharesQuery, [updatedShares, fileId], (err, updateResults) => {
      if (err) {
        console.error('Error updating shares:', err);
        res.status(500).json({ error: 'An error occurred while updating shares' });
        return;
      }
      res.status(200).json({ statusCode: 200, message: 'Shares updated successfully' });
    });
  });
};

// favorite list
const favoriteList = async (req, res, next) => {
  try {
    const db = req.db;
    const sql = 'SELECT * FROM files WHERE favorite = true';
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).send({
                statusCode: 500,
                message: "Internal Server Error",
            });
        } else {
            res.status(200).send({
                statusCode: 200,
                message: "Favorite List",
                favorite: rows,
            });
        }
    });
} catch (error) {
    console.error('Error fetching referral data:', error);
    return res.status(500).json({ status: 500, error: 'Internal server error.' });
}
}


module.exports = {
  filesCreate,
  filesList,
  deleteFiles,
  fileFavorite,
  fileShare,
  favoriteList
};
