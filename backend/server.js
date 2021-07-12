const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ApiRouter = require('./routes/apis');
app.use('/',ApiRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});