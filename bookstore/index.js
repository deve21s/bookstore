const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const book = require('./models/book')
const Book = require('./models/book')
const User = require('./models/user')
const app = express()
app.set("view engine" , "ejs")
app.use(express.urlencoded({extended : true}))
app.use(
    session({ 
        secret : 'devendra',
        resave : false,
        saveUninitialized : false
    })
)

app.use(express.static(__dirname + "/public"));
let MONGODB_URI = "mongodb://deven:dev123@cluster0-shard-00-00.4pnhv.mongodb.net:27017,cluster0-shard-00-01.4pnhv.mongodb.net:27017,cluster0-shard-00-02.4pnhv.mongodb.net:27017/bookstore?ssl=true&replicaSet=Cluster0-shard-0'&authSource=admin&retryWrites=true&w=majority" 

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true,  useUnifiedTopology: true  })
    .then(() => app.listen(process.env.PORT || 5000, () => {
        console.log("server is started and data base is connected")
    }))
    .catch((err)=> console.log(err))

   
app.get('/', (req, res) =>{
    let book = new Book({
        isbn : 1234,
        name: "redstone",
        price: "123",
        image: "hello",
        description: "this is test",
        author: "deven"
    })
    
    book.save()
    
    res.redirect('/index')
})
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/ragister', (req,res)=> {
    res.render("ragister")
})

app.post('/ragister', async(req,res) => {
       const {email,fName,lName,gender,moblieNo,password} = req.body.ragister
        
        const user = new User({
            email,
            fName,
            lName,
            gender,
            moblieNo,
            password
        })
        await user.save();
       console.log("done")
        res.redirect('/books')
    })
app.get('/index', (req,res)=> {
    let book = new Book({
        isbn : 1234,
        name: "redstone",
        price: "123",
        image: "hello",
        description: "this is test",
        author: "deven"
    })
    
    book.save()
    res.render('index')
})
app.get('/about', (req,res)=> {
    res.render('about')
})
app.get('/contact', (req,res)=> {
    res.render('contact')
})

app.get('/books', (req,res)=> {
    book.find().exec((err, data) => {
        if(data) {
            // res.render('home', {result : data, alphabet, letter})
            res.json(data)
        }else{
            res.send('not found')
        }
    
        })
    res.render('books')
})
app.get('/book/:id', (req,res)=> {
    let id = req.params.id;
    book.findById(id)
        .then(result => {
            console.log(result)
            //res.render('book', {result: result}) 
            res.json(result)       
        })
        .catch(() => {
            res.send('not found')
        })
})

app.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    console.log('here',id)
    book.deleteOne({
        _id: id 
    }, function(err){
        if (err) {
            //console.log(err)
        }
        else {
           // res.redirect("/books")
        }
    });
})

