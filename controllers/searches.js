const { response } = require("express");
const { ObjectId } = require('mongoose').Types

const {User, Category, Product} = require('../models')
const collectionAllowed = [
    'users',
    'categories',
    'products'
]


const searchUsers = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)
    
    if(isMongoID){
        const user = await User.findById(term)
       
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = RegExp(term, 'i')

    const users = await User.find({
         $or:[{name: regex}, {email: regex}],
         $and: [{status: true}]
        })

    return res.json({
        results: users
    })
}

const searchCategories = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)
    
    if(isMongoID){
        const category = await Category.findById(term)
       
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = RegExp(term, 'i')

    const categories = await Category.find({
        name: regex,
        status:true
        })

    return res.json({
        results: categories
    })
}

const searchProducts = async (term = '', res) => {

    const isMongoID = ObjectId.isValid(term)
    
    if(isMongoID){
        const product = await Product.findById(term)
        .populate('category', 'name')
       
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = RegExp(term, 'i')

    const products = await Product.find({
         $or:[{name: regex}, {email: regex}],
         $and: [{status: true}]
        })
        .populate('category', 'name')

    return res.json({
        results: products
    })
}

const search = (req, res = response) => {
    const { collection, term } = req.params
    
    if (!collectionAllowed.includes(collection)) {
        return res.status(400).json({
            msg: 'Colección desconocida'
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
            break;
        case 'categories':
            searchCategories(term, res)
            break;
        case 'products':
            searchProducts(term, res)
            break;
        default:
            return res.status(500).json({
                msg: 'Ocurrió un error'
            })
            break
    }
}

module.exports = {
    search
}