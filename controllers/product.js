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
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            hasProducts: products.length > 0,
            products: products,
            pageTitle: 'Shop',
            path: '/',
            activeShop: true
        })
    })
    
}