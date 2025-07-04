const express = require('express')
const app = express()
const port = 3000
const path = require('path');
// const userModel = require("./usermodel");
const userModel = require("./models/user")
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index')
})

app.get("/read", async (req, res) => {
    let users = await userModel.find()
    res.render('read', {users})
})

app.post("/create", async (req, res) => {
    let {username, email, image} = req.body
    let createdUser =  await userModel.create({
        name : username,
        email,
        image
    })
    res.redirect('/read')
})

app.get("/delete/:id", async (req, res) => {
    let user = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect('/read')
})

app.get("/edit/:userid", async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit", {user});
})

app.post("/update/:userid", async (req, res) => {
    let {image, name, email} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, email, image});
    res.redirect("/read");
})

// app.get('/create', async (req, res) => {
//     let createduser = await userModel.create({
//         name: "Hassan",
//         email: "hassan@gmail.com",
//         username:"hassan_mongo"
//     })
//     res.send(createduser)
//     // above code is async
// })

// app.get('/update', async (req, res) => {
//     // userModel.findOneUpdate(findone, update, {new:true})
//     let updateduser = await userModel.findOneAndUpdate({username:"hassan_mongo"}, {name:"Hassan Khan"}, {new:true})
//     res.send(updateduser)
//     // above code is async
// })

// app.get('/read', async (req,res)=>{
//     let users = await userModel.find()
//     res.send(users);
// })

// app.get('/delete', async (req,res)=>{
//     let users = await userModel.findOneAndDelete({username : "hassan_mongo"})
//     res.send(users);
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))