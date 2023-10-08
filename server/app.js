const express = require("express");
const bodyParser = require("body-parser");
const widgetsRouter = require("./routes/widgetsRouter");
const connectDB = require('./config/db');
const cors = require('cors');

const app = express()
const port = 4000

connectDB()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({
        message: 'Hello World2!'
    })
})

app.use("/widgets", widgetsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
