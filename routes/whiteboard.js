var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()


router.get('/', function(req, res, next) {
    res.render('whiteboard', { title: 'Whiteboard' });
  });
  

  router.post('/', async function(req, res, next){
    let defaultFolder = await prisma.folder.findFirst({where: {user_id: req.session.user.user_id, isDefault: true }});
    await prisma.image.create({data: {
        data : req.body.data,
        folder_id: defaultFolder.id
    }});
    // console.info(req.body.data);

  });
  module.exports = router;
  