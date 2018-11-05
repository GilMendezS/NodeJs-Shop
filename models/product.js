const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')
module.exports = class Product {
    constructor(title){
        this.title = title
    }
    save(){
        const p = path.join(rootDir,'data','products.json')
        fs.readFile(p, (err, fileContent) => {
            let products = []
            if(!err){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)

            })
        })
    }
    static fetchAll(){
        const products = path.join(rootDir, 'data','products.json')
        fs.readFile(products, (err, fileContent) => {
            if(err){
                return []
            }
            return JSON.parse(fileContent)
        })
    }
}