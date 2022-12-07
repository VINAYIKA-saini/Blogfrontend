const express = require('express')
const app = express()

const sequelize = require('./db/database');
const blog = require('./models/blog')
const db = require('./db/newDatabase');
const { async } = require('q');

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', 'views')

//Routes

//Home page routes for all blogs

app.get('/',async(req,res)=>{
  
  const blog =  await db.executeSelectQuery('select * from blogs')
  
    res.render('index',{blog})
})


// Add A new blog

app.get('/addblog',(req,res)=>{
  res.render('addblog')
})

//Insert a new blog to database

app.post('/addnewblog',async(req,res)=>{
    try {
      await db.executeSelectQuery(`insert into blogs (title,description,createdAt,updatedAt) values ('${req.body.title}','${req.body.description}',now(),now())`).then(()=>{
       res.redirect('/')
      })
    } catch (error) {
      console.log(error);
    }
})


//select a blog with id for edit
 
app.get('/edit/:id',async(req,res)=>{
  console.log(req.params);
  const blogdetails = await db.executeSelectQuery(`select * from blogs where id=${req.params.id}`)
  res.render('editblog',{
    blogdetails: blogdetails[0]
  })
})

//Update Blog by id 
app.post('/updateblog/:id',async(req,res)=>{
  try {
    await db.executeSelectQuery(`update blogs set title='${req.body.title}', description='${req.body.description}' where id=${req.params.id}`).then(()=>{
      res.redirect('/')
    })
  } catch (error) {
    console.log(error);
  }
})

//Delete a blog by id 

app.get('/delete/:id',async(req,res)=>{
  try {
    await db.executeSelectQuery(`delete from blogs where id=${req.params.id}`).then(()=>{
      res.redirect('/')
    })
  } catch (error) {
    console.log(error);
  }
})



sequelize.sync()
  .then(result => {

    console.log("tables created")
    app.listen(process.env.PORT || 8000);
   
    //console.log(result);

  })
  .catch(err => {
    console.log(err)
  })

app.listen(3000,()=>{
    console.log('server is up and running.');
})