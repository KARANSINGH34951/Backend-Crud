const express = require("express")
const users= require("./models/user")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/read",async (req, res) => {
   let allusers= await users.find({});
    res.render("read",{users:allusers})
})


app.post("/create", async (req,res)=>{
  let {name,email,image} = req.body;
  // res.render("create")

  let createduser= await users.create({
    name,
    email,
    image
  })
  
  // res.send(createduser)
  res.redirect("/read")
})

app.get("/delete/:id",async (req, res) => {
  // let allusers= await users.find({});
  let deleteuser= await users.findOneAndDelete({_id: req.params.id})
  //  res.render("read",{users:allusers})
  res.redirect("/read")
})



app.listen(3000, () => {
  console.log("Server is running on port 3000")
})