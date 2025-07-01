const express = require('express')
const app = express()
const port = 3000
const userModel = require("./usermodel");
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: "Hassan",
        email: "hassan@gmail.com",
        username:"hassan_mongo"
    })
    res.send(createduser)
    // above code is async
})

app.get('/update', async (req, res) => {
    // userModel.findOneUpdate(findone, update, {new:true})
    let updateduser = await userModel.findOneAndUpdate({username:"hassan_mongo"}, {name:"Hassan Khan"}, {new:true})
    res.send(updateduser)
    // above code is async
})

app.get('/read', async (req,res)=>{
    let users = await userModel.find()
    res.send(users);
})

app.get('/delete', async (req,res)=>{
    let users = await userModel.findOneAndDelete({username : "hassan_mongo"})
    res.send(users);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))