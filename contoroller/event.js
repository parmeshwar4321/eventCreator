
const eventdb = require("../databaseModel/event")
exports.createEvent = async (req, res) => {
    try {
        const userId = (req.userDetails)._id
        console.log("req.userDetailsreq.userDetailsreq.userDetailsreq.userDetailsreq.userDetails", userId);
        const { eventName, description, city, startDate, endDate } = req.body
        const eventData = new eventdb({
            eventName,
            description,
            city,
            userId,
            startDate,
            endDate
        });
        eventData.save()
        console.log({ message: "event create succssful.." });
        return res.status(200).json({ message: "event create succssful.." })
    } catch (er) {
        console.log(er);
    }
}


exports.updateEvent = async (req, res) => {
    try {
        if (!req.userDetails) {
            console.log({ message: "please logIn.." });
            res.json({ message: "please logIn.." })
        } else {
            if ((req.userDetails)._id === req.body.userId) {
                eventdb.findById({ _id: req.body._id }).updateOne(req.body)
                    .then(() => {
                        console.log({ message: "data update successful.." });
                        return res.status(200).json({ message: "data update successful.." })
                    })
            }
        }
    } catch (arr) {
        console.log(arr);
    }
}


exports.deleteEvent = async (req, res) => {
    try {
        if (!req.userDetails) {
            console.log({ message: "please logIn.." });
            res.json({ message: "please logIn.." })
        } else {
            if ((req.userDetails)._id === req.body.userId) {
                eventdb.findOneAndDelete({ _id: req.body._id })
                    .then((data) => {
                        console.log(data);
                        console.log({ message: "data delete successful.." });
                        return res.status(200).json({ message: "data delete successful.." })
                    })
            }
        }
    } catch (ar) {
        console.log(ar);
    }
}
