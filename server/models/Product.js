const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },

    continents: {
        type: Number,
        default: 1
    },

    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

// 검색할 때 title과 description을 중점으로 검색하는데 중요도는 title 5, description 1 / weights의 default는 1
productSchema.index({
    title:'text',
    description:'text'
}, {
    weights:{
        title: 5,
        description: 1
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = {Product}
