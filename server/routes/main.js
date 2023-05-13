const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


router.get('',async (req,res)=>{
    try{
    const locals = {
        title: "ABlog",
        description: "Such a simple blog from not simple student."
    }

    let perPage = 3;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


//function insertPostData(){
 //   Post.insertMany([
 //      {
 //       title: "Create a Blog",
  //      body: "Put some Text"
  //     },
  //     {
  //      title: "Create",
  //      body: "PPPPut some Text"
  //     },
  //     {
  //      title: "Blog",
  //      body: "Put ssssome Text"
  //     },
  //  ])
//}
//insertPostData()












router.get('/about',(req,res)=>{
    res.render('about')
})
router.get('/contact',(req,res)=>{
    res.render('contact')
})


module.exports = router