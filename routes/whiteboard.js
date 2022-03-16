var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()


router.get('/', function(req, res, next) {
    res.render('whiteboard', { title: 'Whiteboard' });
  });
  

  router.post('/', async function(req, res, next){
    
    await prisma.image.create({data: {
        data : req.body.data,
        folder_id: 1
    }});
    // console.info(req.body.data);

  });
  module.exports = router;
  