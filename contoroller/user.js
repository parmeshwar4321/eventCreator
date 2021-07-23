
const dbUser = require("../databaseModel/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../databaseModel/user");
const event = require("../databaseModel/event");



exports.hello = async (req, res) => {
    try {
        console.log({ message: "hello" });
        return res.json({ message: "hello" })
    } catch (er) {
        console.log(er);
    }
}


exports.sign = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body
        const userData = new dbUser({
            name,
            email,
            password,
            phoneNumber,
            role
        })
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.save(function (err) {
            if (err) {
                console.log(err);
            } else {

                console.log({ message: "User SignUp successfully", signupError: false });
                return res.status(200).json({ message: "User SignUp successfully", signupError: false })
            }
        })
    } catch (error) {
        console.log(error);
    }
}


exports.login = async (req, res) => {
    try {
        await dbUser.findOne({ email: req.body.email })
            .then(async (data) => {
                // console.log("sdfghjkxcvghjk,",data);
                if (data == null) {
                    console.log({ "message": "first do signUp" });
                    return res.status(404).json({
                        "message": "first do signUp"
                    })
                } else {
                    const match = await bcrypt.compare(req.body.password, data.password)
                    // console.log("data.passworddata.passworddata.password", match);
                    if (match !== true) {
                        console.log({ message: "User not found..." });
                        return res.json({ message: "User not found..." })
                    } else {
                        const token = jwt.sign({ data: data }, "vishal")
                        // console.log(token);
                        res.cookie("token", token)
                        console.log({ message: 'User logIn successful' });
                        return res.status(200).json({ message: 'User logIn successful' })
                    }
                }
            })
    } catch (ar) {
        console.log(ar);
    }
}



exports.allUser = async (req, res) => {
    try {
        if (req.userDetails.role === "admin") {
            await user.find()
                .then((data) => {
                    console.log(data);
                    return res.status(200).json(data)
                })
        } else {
            console.log({ message: "You can't see data of users.." });
            return res.status(404).json({ message: "You can't see data of users.." })
        }
    } catch (er) {
        console.log(er);
    }
}

exports.userAndEvent = async (req, res) => {
    try {
        if (req.userDetails.role === "admin") {
            const userData = await user.find()
            const eventData = await event.find()
            console.log("users", userData);
            console.log("eventData", eventData);
            return res.status(200).json(eventData);
        } else {
            console.log({ message: "You can't see data of users.." });
            return res.status(404).json({ message: "You can't see data of users.." });
        }

    } catch (er) {
        console.log(er);
    }
}



exports.eventByUser = async (req, res) => {
    try {
        if (req.userDetails.role === "user") {
            const eventData = await event.find()
            console.log(eventData);
            return res.status(200).json(eventData);
        } else {
            console.log({ message: "You can't see event data.." });
            return res.status(404).json({ message: "You can not see event data.." })
        }
    } catch (er) {
        console.log(er);
    }
}



exports.search = async (req, res) => {
    try {
        const data = await event.find({ status: { $in: [{ eventName: req.body.eventName, city: req.body.city }] } })
        console.log(data);
    } catch (er) {
        console.log(er);
    }
}