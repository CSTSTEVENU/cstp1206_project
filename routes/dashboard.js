var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

/* GET home page. */
router.get('/', async function(req, res, next) {
  let folderList = await prisma.folder.findMany({where: {AND: [{user_id: req.session.user.id},
    { isDefault: false}]}} );
  let defaultFolder = await prisma.folder.findFirst({where: {AND: [{user_id: req.session.user.id }, 
    {isDefault: true}]}});
  var folderId = defaultFolder.id;
  var images = await prisma.image.findMany({
    where: {
      folder_id: {
        equals: folderId
      }
    }
  });
  res.render('dashboard', { user: req.session.user, 
    folders: folderList, 
    defaultFolder:defaultFolder,
    images: images });

});

router.get('/logout', function(req, res, next) {
  res.render('logout');
});






module.exports = router;