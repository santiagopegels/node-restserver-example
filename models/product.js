const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {
        type:String
    }
})

ProductSchema.methods.toJSON = function(){
    const {__v, _id, status, ...product} = this.toObject()
    product.uid = _id
    return product
}

module.exports = model( 'Product', ProductSchema )