const express = require('express');
const {port} = require('./config');
const db = require('./utils/database');

const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const categoryRouter = require( './categories/categories.router');
const postRouter = require('./posts/posts.router')

const initModels = require('./models/initModels');

const app = express();

app.use(express.json());

db.authenticate()
    .then(()=> {
        console.log('Database Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(()=> {
        console.log('Database Synced')
    })
    .catch(err => {
        console.log(err)
    })

initModels();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
});

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});