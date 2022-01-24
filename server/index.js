const express = require('express')
const app = express()
const posts = require("./routes/posts")
const connectDB = require('./db/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')


require('dotenv').config()

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/posts', express.json())
app.use('/posts', posts)

app.get("/", (req,res) => {
    res.sendFile(path.resolve(__dirname + "/html.html"))
})

const PORT = process.env.PORT || 5000

const start = async () => {
    connectDB(process.env.CONNECTION_STRING).then(
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        )
    ).catch (error => console.log(error)) 
}
  
start();