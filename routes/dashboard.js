const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

/* Landing page after user login successfully, show user default design folder. */
router.get('/', async function(req, res) {
  let folderList = await prisma.folder.findMany({where: {AND: [{user_id: req.session.user.id},
    { isDefault: false}]}} );
  let defaultFolder = await prisma.folder.findFirst({where: {AND: [{user_id: req.session.user.id }, 
    {isDefault: true}]}});
  const folderId = defaultFolder.id;
  const images = await prisma.image.findMany({
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

router.get('/logout', function(req, res) {
  res.render('logout');
});

module.exports = router;