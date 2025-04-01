//server.js
const express = require('express');
const app = express();
const test = require('./Router/test');

const cors = require('cors');

// app.use('/api', test);
app.use(cors());


const port = 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('백엔드 루트 페이지입니다!')

});

app.get('/api', (req, res) => {
    res.json({ message : 'React와 Express가 연결되었습니다!!!!' })
});