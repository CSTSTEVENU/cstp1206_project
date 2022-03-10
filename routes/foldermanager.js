var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

/* GET home page. */
router.post('/create/:folder_name', async function(req, res, next) {
    let folderName = (req.params["folder_name"]);
    let newFolder = await prisma.folder.create({data:{
        folderName: folderName,
        user_id: req.session.user.id
      }});
  res.json(newFolder);
});





module.exports = router;