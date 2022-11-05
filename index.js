const express = require("express")
const Container = require("./container")
const products = new Container("./productos.json")

const app = express()

const PORT = 8080


app.get("/productos",(req,res)=>{

    const productGet = products.getAll().then(data => console.log(data) )


    res.send(`Los productos disponibles son: ${productGet}`)
})

app.get("/productoRandom",(req,res)=>{

    let numeroRandom =  Math.round(Math.random() * 3) 
    products.getById(numeroRandom).then(prod=> {
        
        res.send(`<h1>PRODUCTO RANDOM</h1>
                  <p>El producto random es: ${prod.name}</p>
                  <img src=${prod.thumbnail}>`)
    })
    

})


const server = app.listen(PORT, ()=>{

})