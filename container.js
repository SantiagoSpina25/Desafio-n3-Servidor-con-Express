const fs = require("fs").promises

class Container{
    constructor(path){
        this.path = path
    }

    async save(object){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(read)

            let id
            data.length === 0 ? id = 1 : id =  data[data.length - 1].id + 1
            const newProduct ={...object, id}
            data.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8")
            return newProduct.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)

            const objFind = data.find(obj => obj.id === id)
            
            if(!objFind){
                return null
            }
            return objFind
            
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        const read = await fs.readFile(this.path, "utf-8")
        return JSON.parse(read)
    }

    async deleteById(id){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)

            const objFilter = data.filter(prod => prod.id != id)
            fs.writeFile(this.path, JSON.stringify(objFilter), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            await  fs.writeFile(this.path,JSON.stringify([]), "utf-8")
        }
        catch(error){
            console.log(error) 
        }
    }

}
module.exports = Container