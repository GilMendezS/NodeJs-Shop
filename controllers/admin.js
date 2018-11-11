const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        productCSS: true,
        formsCSS: true,
        path: '/admin/add-product',
        activeAddProduct: true
    })
}
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            hasProducts: products.length > 0,
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            activeShop: true
        })
    })
}