const mongose = require("mongoose");
const eventScema = new mongose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    description: {
        type: String,
        required: true,

    },
    userId:{
        type:String
    },
    city: {
        type: String,
        required: true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    }
})

module.exports = mongose.model("event", eventScema);