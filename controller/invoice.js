
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
const util = require('util');
const fs = require('fs').promises;
const path = require('path');
const fsExtra = require('fs-extra');

// invoice add
const invoiceCreate = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
            id: req.body.id,
            invoiceId: req.body.invoiceId,
            member: req.body.member,
            assignment: req.body.assignment,
            dueDate: req.body.dueDate,
            notes: req.body.notes,
            created_at: new Date()
        };
        db.query("INSERT INTO invoice SET ?", [data], function (err, rows) {
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
            message: "Error catch",
        });
    }
};

// invoice list
const invoicesList = async (req, res, next) => {
    try {
        const db = req.db;
        const { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const numericLimit = Number(limit);
        const numericOffset = Number(offset);

        const sql = `
      SELECT invoice.*, member.member_image, member.first_name, member.last_name
FROM invoice 
INNER JOIN member ON invoice.member COLLATE utf8mb4_general_ci = member.id COLLATE utf8mb4_general_ci
ORDER BY invoice.created_at DESC 
LIMIT ${db.escape(numericLimit)} OFFSET ${db.escape(numericOffset)};
        `;

        const totalCountSql = 'SELECT COUNT(*) AS total FROM invoice;';

        const [invoices, totalResult] = await Promise.all([
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
            invoices,
            limit: numericLimit,
            page: Number(page),
            total: totalCount,
        });

    } catch (error) {
        console.error('Error fetching spaces data:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error.', error });
    }
};

// single invoice
const invoiceSingle = async (req, res, next) => {
    try {
        var db = req.db;
        const invoiceId = req.params.id;
        const sql = `
        SELECT invoice.*, member.member_image, member.first_name, member.last_name, member.email
        FROM invoice 
      INNER JOIN member ON invoice.member COLLATE utf8mb4_general_ci = member.id COLLATE utf8mb4_general_ci
        WHERE invoice.id = ?;
      `;

        let results = await db.query(sql, [invoiceId], function (error, rows) {
            if (error) {
                console.log("Error db");
                res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error",
                });
            } else {
                if (rows.length > 0) {
                    res.status(200).send({
                        statusCode: 200,
                        message: "Invoice Information",
                        data: rows[0],
                    });
                } else {
                    res.status(404).send({
                        statusCode: 404,
                        message: "Invoice Not Found",
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

// single invoice
const invoicePayment = async (req, res, next) => {
    const db = req.db;
    const invoiceId = req.params.id;
    const { amount, method, paymentDate } = req.body;

    const sql = `UPDATE invoice SET amount = ?, method = ?, paymentDate = ? WHERE id = ?`;
    const values = [amount, method, paymentDate, invoiceId];

    db.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating invoice:', error);
            res.status(500).json({ error: 'Error updating invoice.' });
        } else {
            console.log('Invoice updated successfully');
            res.status(200).json({ message: 'Invoice updated successfully' });
        }
    });
}

module.exports = {
    invoiceCreate, invoicesList, invoiceSingle, invoicePayment
};
