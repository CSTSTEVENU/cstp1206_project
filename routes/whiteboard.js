const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()
/* When user clicks the Create a New Degsin button, go to whiteboard page.
   Find the default folder first, when user wants to save their images, the images will save in the default_folder.*/
router.get('/', function(req, res) {
    res.render('whiteboard', { title: 'Whiteboard' });
  });
  

  router.post('/', async function(req){
    let defaultFolder = await prisma.folder.findFirst({where: {user_id: req.session.user.user_id, isDefault: true }});
    await prisma.image.create({data: {
        data : req.body.data,
        folder_id: defaultFolder.id
    }});
    // console.info(req.body.data);

  });
  module.exports = router;
  