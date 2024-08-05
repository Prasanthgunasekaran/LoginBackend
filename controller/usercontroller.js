const usermodel = require("../model/usermodel");
const bcrypt = require('bcrypt');
const { query } = require("express");

const webtoken = require('jsonwebtoken');

const create_user = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
            if (err) {
                res.json(
                    {
                        message: err
                    }
                )
            }
            let user = new usermodel(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone
                }
            )
            console.log(user);
            let existuser = await usermodel.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })

            if (existuser) {
                res.json({
                    message: "user already exist"
                })
            } else {
                let saving = await user.save();
                res.json({
                    message: "user registered successfully", saving
                })
            }

        })
    }

    catch (error) {
        console.log(error);
        res.json({
            message: "something went wrong"
        })
    }
}

const user_login = async (req, res) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let types = {}
        if (typeof username === 'string') {
            types = {
                $or: [
                    { email: username }, { phone: username }
                ]
            }
        }


        console.log(types);
        let user = await usermodel.findOne(types)
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({ message: err })
                } else if (result) {
                    let token = webtoken.sign({ _id: user.id }, 'secretvalue', { expiresIn: '5m' })
                    res.json({
                        message: "Login Sucessfully",
                        token
                    })
                } else {
                    res.json({ message: "Password Incorrect" })
                }
            })
        } else {
            res.json({ message: "User Not Found" })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" })
    }
}



module.exports = { create_user, user_login };