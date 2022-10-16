const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const connectUri = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUri)

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('aaa')
})
//写数据
app.post('/articles', async (req, res, next) => {
    try {
        const { article } = req.body
        if (!article || !article.title || !article.content || !article.description) {
            return res.status(422).json({
                msg: '数据不符合规范'
            })
        }
        await dbClient.connect()
        const collection = dbClient.db('abc').collection('articles')
        article.createAt = new Date()
        article.updateAt = new Date()
        const ret = collection.insertOne(article)
        article._id = (await ret).insertedId
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
})
//分页查数据
app.get('/articles', async (req, res, next) => {
    try {
        let { pageIdx = 1, pageSize = 10 } = req
        pageIdx = Number.parseInt(pageIdx)
        pageSize = Number.parseInt(pageSize)
        await dbClient.connect()
        const collection = dbClient.db('abc').collection('articles')
        const ret = await collection
            .find() //查询数据
            .skip((pageIdx - 1) * pageSize) //跳过多少数据
            .limit(pageSize) //拿多少数据
        const article = await ret.toArray()
        const articleCount = await collection.countDocuments()
        res.status(200).json({
            article,
            articleCount
        })
    } catch (error) {
        next()
    }
})
//id获取数据
app.get('/articles/:id', async (req, res, next) => {
    try {
        await dbClient.connect()
        const collection = dbClient.db('abc').collection('articles')
        const article = await collection.findOne({
            _id: ObjectId(req.params.id)
        })
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
})
//更新数据
app.patch('/articles/:id', async (req, res, next) => {
    try {
        await dbClient.connect()
        const collection = dbClient.db('abc').collection('articles')
        await collection.updateOne({
            _id: ObjectId(req.params.id),
        }, {
            $set: req.body.article
        })
        const article = await collection.findOne({
            _id: ObjectId(req.params.id)
        })
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
})
app.delete('/articles/:id', async (req, res, next) => {
    try {
        await dbClient.connect()
        const collection = dbClient.db('abc').collection('articles')
        const article = await collection.deleteOne({
            _id: ObjectId(req.params.id),
        })
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
})

// 统一的错误处理
app.use((err, req, res, next) => {
    res.status(500).json({
        msg: error.message
    })
})

app.listen(3001, () => {
    console.log('server is running')
})