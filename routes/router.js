const express = require("express");
const router = express.Router();

const contoroller = require("../contoroller/user");
const eventContoroller = require("../contoroller/event")
const verify = require("../comman-middilwere/verify")


router.get("/helo",contoroller.hello)
// user singUp router.
router.post("/signUp",contoroller.sign);
// user logIn router
router.post("/logIn",contoroller.login)

// create event router..
router.post("/event",verify,eventContoroller.createEvent);
// update event router..
router.put("/event",verify,eventContoroller.updateEvent);
// delete event router..
router.delete("/event",verify,eventContoroller.deleteEvent);
// all users router
router.get("/users",verify,contoroller.allUser);
// all usersAndEvent router
router.get("/usersAndEvent",verify,contoroller.userAndEvent);
// event by the user
router.get("/eventByUser",verify,contoroller.eventByUser);

router.get("/search",verify,contoroller.search);

module.exports = router;