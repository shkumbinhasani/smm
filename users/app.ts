import express from 'express';
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(8081, function () {
    console.log("Example app listening at http://localhost:8081")
})
