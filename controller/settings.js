
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
const util = require('util');
const fs = require('fs').promises;
const path = require('path');
const fsExtra = require('fs-extra');

const profileCreate = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
            id: req.body.id,
            company_name: req.body.companyName,
            company_logo: req.files['companyLogo'][0].filename,
            background: req.files['background'][0].filename,
            company_email: req.body.companyEmail,
            company_linkedin: req.body.companyLinkedin,
            company_phone: req.body.companyPhone,
            company_facebook: req.body.companyFacebook,
            company_instagram: req.body.companyInstagram,
            created_at: new Date()
        };

        db.query("INSERT INTO companyprofile SET ?", [data], function (err, rows) {
            console.log('profile', err);
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

// single member
const profileSingle = async (req, res, next) => {
    try {
        var db = req.db;
        let results = await db.query("SELECT * FROM companyprofile", function (error, rows) {
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

const updateProfile = async (req, res, next) => {
    try {
        var db = req.db;
        const profileId = req.params.id;
        const dataToUpdate = req.body;

        if (req.files && req.files['companyLogo'] && req.files['companyLogo'][0].filename) {
            dataToUpdate.company_logo = req.files['companyLogo'][0].filename;
        }
        if (req.files && req.files['background'] && req.files['background'][0].filename) {
            dataToUpdate.background = req.files['background'][0].filename;
        }


        db.query("UPDATE companyprofile SET ? WHERE id = ?", [dataToUpdate, profileId], function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    statusCode: 500,
                    message: "Error updating course",
                });
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Profile Information Updated"
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
}

const customCreate = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
            id: req.body.id,
            dashboard: req.body.dashboard,
            members: req.body.members,
            assets: req.body.assets,
            tasks: req.body.tasks,
            message: req.body.message,
            calender: req.body.calender,
            files: req.body.files,
            finance: req.body.finance,
            settings: req.body.settings,
            created_at: new Date()
        };

        db.query("INSERT INTO customization SET ?", [data], function (err, rows) {
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
}

module.exports = {
    profileCreate,
    profileSingle,
    updateProfile,
    customCreate
};
