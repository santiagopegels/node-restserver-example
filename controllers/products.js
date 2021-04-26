const { request, response } = require('express')

const { Product } = require('../models')


const getProducts = async (req = request, res = response) => {

    const { page = 1, limit = 10 } = req.query;

    const query = { status: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
    ])

    res.json({
        msg: 'Get products',
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalRegisters: total
    })
}

const getProduct = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id).populate('user', 'name')

    if (!product) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }
    if (!product.status) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }

    res.json({
        product
    })

}

const createProduct = async (req, res, next) => {
    const { price, category_id } = req.body
    const name = req.body.name.toUpperCase()

    const ProductDB = await Product.findOne({ name })

    if (Boolean(ProductDB)) {
        return res.status(400).json({
            msg: `Ya existe el producto ${ProductDB.name}`
        })
    }

    const data = {
        name,
        price,
        category: category_id,
        user: req.user._id
    }

    const product = await new Product(data)

    await product.save()

    res.status(201).json({
        product
    })
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { status, user, ...data } = req.body

    if(data.name){
        data.name = data.name.toUpperCase()
    }
    
    data.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    if (!product) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }
    if (!product.status) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }

    return res.json({
        product
    })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }
    if (!product.status) {
        return res.status(401).json({
            msg: 'No existe el producto'
        })
    }

    product.status = false
    await product.save()

    return res.json({
        product
    })
}

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}