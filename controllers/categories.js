const { request, response } = require('express')

const Category = require('../models/category')


const getCategories = async (req = request, res = response) => {

    const { page = 1, limit = 10 } = req.query;

    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
    ])

    res.json({
        msg: 'Get Categories',
        categories,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalRegisters: total
    })
}

const getCategory = async (req, res) => {
    const { id } = req.params

    const category = await Category.findById(id)

    if (!category) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }
    if (!category.status) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }

    res.json({
        category
    })

}

const createCategory = async (req, res, next) => {
    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (Boolean(categoryDB)) {
        return res.status(400).json({
            msg: `Ya existe la categoría ${categoryDB.name}`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = await new Category(data)

    await category.save()

    res.status(201).json({
        category
    })
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const category = await Category.findByIdAndUpdate(id, { 'name': name.toUpperCase() }, { new: true })

    if (!category) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }
    if (!category.status) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }

    return res.json({
        category
    })
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)

    if (!category) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }
    if (!category.status) {
        return res.status(401).json({
            msg: 'No existe la categoría'
        })
    }

    category.status = false
   await  category.save()

    return res.json({
        category
    })

}

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}