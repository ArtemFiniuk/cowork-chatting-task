const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
const transporter = require('../emailTemplate/emailAuth');
const constructMailOptions  = require("../emailTemplate/memberTemplate");


// member add
const memberCreate = async (req, res, next) => {
    try {
        var db = req.db;
        var email = req.body.email;

        // Check if email already exists in the database
        db.query("SELECT COUNT(*) AS count FROM member WHERE email = ?", [email], function (err, rows) {
            if (err) {
                res.status(500).send({
                    statusCode: 500,
                    message: "Error",
                });
            } else {
                if (rows[0].count > 0) {
                    // Email already exists, return an error
                    res.status(400).send({
                        statusCode: 400,
                        message: "Email already exists",
                    });
                } else {
                    // Email doesn't exist, proceed with insertion into member table
                    var memberData = {
                        id: req.body.id,
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        phone_number: req.body.phoneNumber,
                        email: req.body.email,
                        member_image: req.file.filename,
                        business_name: req.body.businessName,
                        business_phone: req.body.businessPhone,
                        business_email: req.body.businessEmail,
                        notes: req.body.notes,
                        created_at: new Date()
                    };
                    db.query("INSERT INTO member SET ?", [memberData], function (err, rows) {
                        if (err) {
                            res.status(500).send({
                                statusCode: 500,
                                message: "Error",
                            });
                        } else {
                            // After successfully inserting into member table, insert into admin table
                            var adminData = {
                                email: req.body.email,
                                role: "user",
                                name: req.body.firstName + ' ' + req.body.lastName,
                                password: "" // or you can set it to some default value or generate a random one
                            };
                            db.query("INSERT INTO admin SET ?", [adminData], function (err, rows) {
                                if (err) {
                                    res.status(500).send({
                                        statusCode: 500,
                                        message: "Error",
                                    });
                                } else {
                                    const mailOptions = constructMailOptions(req.body);
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent');
                                        }
                                    });
                                    res.status(201).send({
                                        statusCode: 201,
                                        message: "Success",
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Error catch",
        });
    }
};

// single member
const memberSingle = async (req, res, next) => {
    try {
        var db = req.db;
        const memberId = req.params.id;

        let results = await db.query("SELECT * FROM member WHERE id = ?", [memberId], function (error, rows) {
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
                        message: "Member Information",
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
// member list
const memberList = async (req, res, next) => {
    try {
        const db = req.db;
        const sql = 'SELECT * FROM member ORDER BY created_at DESC';

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
                    message: "Member List",
                    members: rows,
                });
            }
        });
    } catch (error) {
        console.error('Error fetching referral data:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error.' });
    }
}
// Update single member
const editMember = async (req, res, next) => {
    try {
        var db = req.db;
        const memberId = req.params.id;
        const dataToUpdate = req.body;

        if (req.file && req.file.filename) {
            dataToUpdate.member_image = req.file.filename;
        }

        db.query("UPDATE member SET ? WHERE id = ?", [dataToUpdate, memberId], function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    statusCode: 500,
                    message: "Error updating course",
                });
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Member Information Updated"
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
// search member
const memberSearch = async (req, res, next) => {
    var db = req.db;
    const searchTerm = req.params.id;

    if (!searchTerm) {
        return res.status(400).json({ statusCode: 400, error: 'Search term is required' });
    }

    const query = `SELECT * FROM member WHERE first_name LIKE ?`;
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue], (err, results) => {
        if (err) {
            return res.status(500).json({ statusCode: 500, error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ statusCode: 404, message: 'No users found' });
        }

        res.json({ statusCode: 200, results });
    });
};


module.exports = {
    memberCreate,
    memberList,
    memberSingle,
    editMember,
    memberSearch
};
