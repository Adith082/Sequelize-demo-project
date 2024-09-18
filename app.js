const express = require("express")

const { sequelize, User, Post } = require("./models/index.js")

const app = express()
app.use(express.json())  // using a middle-ware

///create user
app.post("/users",async (req, res)=>{
    const {name, email, role} = req.body

    try{
        const user = await User.create({name, email, role}) //create = build + save
        return res.json(user)
    }  catch(err){
        console.log(err)
        return res.status(500).json(err)
    }

})

//find all users
app.get("/users", async(req, res) => {
    try{
        const users = await User.findAll()
        return res.json(users)
    } catch(err){
        return res.status(500).json({error: "Something went wrong"})
    }
})

//find single user
app.get("/users/:uuid", async(req, res) => {
    const uuid = req.params.uuid
    try{
        const users = await User.findOne({
            where: {uuid: uuid},
            include: ['posts'],
        })
        return res.json(users)
    } catch(err){
        return res.status(500).json({error: "Something went wrong"})
    }
})



app.post("/posts",async (req, res)=>{
    const {userUuid, body} = req.body

    try{
        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({body: body, userId: user.id})

        return res.json(post)
    }  catch(err){
        console.log(err)
        return res.status(500).json(err)
    }

})


app.get("/posts",async (req, res)=>{
    try{
        const posts = await Post.findAll({include: ['user']})  // inside array multiple model reference can be added if associated
        return res.json(posts)
    }  catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


// deleting a particular user
app.delete("/users/:uuid", async(req, res) => {
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({
            where: {uuid: uuid},
        })
        await user.destroy()
        return res.json({message: 'UserDeleted'})
    } catch(err){
        return res.status(500).json({error: "Something went wrong"})
    }
})
//updating a particular user
app.put("/users/:uuid", async(req, res) => {
    const uuid = req.params.uuid 
    const {name, email, role} = req.body
    try{
        const user = await User.findOne({
            where: {uuid: uuid},
        })
        user.name = name 
        user.email = email 
        user.role = role 
       await user.save()
        return res.json(user)
    } catch(err){
        return res.status(500).json({error: "Something went wrong"})
    }
})






app.listen({port: 5000}, async ()=>{
    console.log("server up on http://localhost:5000")
   await sequelize.authenticate()
    //await sequelize.sync({force: true})
    console.log("Database connected!")
})