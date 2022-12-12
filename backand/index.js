const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express()
const port = 5000
app.get('/', (req, res) => {
    res.send('Hello Joblifts')
})

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/application", require("./routes/application"));
app.use("/api/cart", require("./routes/cart"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})