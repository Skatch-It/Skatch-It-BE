//server.js
const express = require('express');
const app = express();
const test = require('./Router/test');

app.use('/api', test);

const port = 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('백엔드 루트 페이지입니다!')
});