
//server.js
const Redis = require('ioredis')

const redis = new Redis({
    host : '127.0.0.1',
    port: 6379
})
const express = require('express');
const app = express();
const test = require('./Router/test');

const cors = require('cors');

// app.use('/api', test);
app.use(cors());
app.use(express.json())


const port = 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('백엔드 루트 페이지입니다!')

});

app.get('/get', (req, res) => {
    res.json({ message : 'React와 Express가 연결되었습니다!!!!' })
});

// 닉네임 중복 확인 API + redis데이터베이스에 저장
app.post('/api/nickname-check', async(req, res) => {
    const { nickname } = req.body
    
    if(!nickname || typeof nickname !== 'string'){
        return res.status(400).json({ success: false, error: 'Invalid nickname' })
    }

    const isTaken = await redis.sismember('active_nicknames', nickname)

    if(isTaken) {
        return res.json({ success: true, duplicate: true })
    }

    // 중복이 아니면 추가
    await redis.sadd('active_nicknames', nickname)
    return res.json({ success: true, duplicate: false })
})