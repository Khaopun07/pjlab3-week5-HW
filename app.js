const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const writeReads = require('./routes/writeReads');
const updateDelete = require('./routes/updateDelete');

app.use('/wr', writeReads);
app.use('/ud', updateDelete);
app.use('/', function (req, res, next) {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
