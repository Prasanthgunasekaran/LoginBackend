const demomodel = require('../model/demomodel');
const bcrypt = require('bcrypt');
const webtoken = require("jsonwebtoken");

const create_demo = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
            if (err) {
                res.json(
                    {
                        message: err
                    }
                )
            }
            let user = new demomodel(
                {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPassword
                }
            )
            let existuser = await demomodel.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
            if (existuser) {
                res.json({
                    message: "user already exist"
                })
            } else {
                let saving = await user.save();
                res.json({
                    message: "user Regitered Successfully", saving
                })
            }
        })
    }
    catch (error) {
        res.json({
            message: "Something Went Wrong"
        })
    }
}

const demo_login = async (req, res) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let types = {}
        if (typeof username === 'String') {
            types = { email: username }
        }
        if (typeof username === 'number') {
            types = { phone: username }

        }
        console.log(types)
        let user = await demomodel.findOne(types)
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({
                        message: err
                    })
                } else if (result) {
                    let token = webtoken.sign({ _id: user.id }, 'secretvalue', { expiresIn: '5m' })
                    res.json({
                        message: "Login Sucessfully",
                        token
                    })
                } else {
                    res.json({
                        message: "Password incorrect"
                    })
                }
            })
        } else {
            res.json({
                message: "User Not Found"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Error" })
    }
}
module.exports = { create_demo, demo_login };
