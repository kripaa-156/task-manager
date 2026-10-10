const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs'  );

app.set("view engine","ejs");
app.use(express.json());
// below, this is a middleware allows Express to read the data submitted through HTML forms and make it available inside req.body
app.use(express.urlencoded({extended:true}));

//with the below line, we can perfrom these three tasks:
//1. we can access the files in public folder(images for example)
//2. we can access the css files in public folder
//3. we can access the js files in public folder
app.use(express.static(path.join(__dirname,'public')));
//means search all the static files in public folder

// app.get('/',function(req,res){
//     res.send("welcome");
// })

//to show views folder, ab koi bhi / pe jayega toh use index page dikhega
app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        console.log(files);
        //{files:files} this is an object, we can send this object to index.ejs file and we can use it there
        res.render("index",{files:files});
    })
})

app.get('/file/:filename',function(req,res){
    //we can use req.params.filename to get the filename from the url
    //utf-8 is used to read the file in text format, otherwise it will be read in binary format
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        // res.render("file",{filedata:filedata});
        res.render('show',{filename:req.params.filename, filedata:filedata}); 
    })
})

//with fs.reraddir, we can read the files in the folder and show them in the index page
app.post('/create',function(req,res){
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect('/');
    }) 
})


app.listen(3000); 