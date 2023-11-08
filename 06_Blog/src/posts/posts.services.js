const postControllers = require('./posts.controllers');
const { host } = require('../config');


const getAllPosts = (req, res) => {
    const offset = Number(req.query.offset || 0);
    const limit = Number(req.query.limit || 10);
    const urlBase = `${host}/api/v1/posts`

    postControllers.getAllPosts(offset, limit)
        .then(data => {
            const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null;
            const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset-limit}&limit=${limit}` : null;
                res.status(200).json({
                    next: nextPage,
                    prev: prevPage,
                    items: data.count,
                    offset,
                    limit,
                    results: data.rows
                })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getPostById = (req, res) => {
    const id = req.params.id;
    postControllers.getPostById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)


            } else {
                res.status(400).json({ message: 'Invalid Id' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const createPost = (req, res) => {
    console.log("De Service Createpost:", req.user)
    const userId = req.user.id;
    const { title, content, categoryId } = req.body;
    if (title && content && categoryId) {
        postControllers.createPost({ title, content, userId, categoryId })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: 'Missing data', fields: {
                title: 'String',
                content: 'String',
                categoryId: 'integer'
            }
        })
    }
}

const updatePost = (req, res) => {


}

const getPostsByCategory = (req, res) => {
    const id = req.params.id;
    postControllers.getPostsByCategory(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    getPostsByCategory
}