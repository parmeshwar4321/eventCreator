const mongoose = require("mongoose")

const url = process.env.URL
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("databaseConnectionError");
    })