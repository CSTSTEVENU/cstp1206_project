const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

/* Add new folder when the user clicks the add folder button; 
each user has his own folder_id and it shows all images under the given folder id.
  */
router.post('/create/:folder_name', async function(req, res) {
    let folderName = (req.params["folder_name"]);
    let newFolder = await prisma.folder.create({data:{
        folderName: folderName,
        user_id: req.session.user.id
      }});
  res.json(newFolder);
});

router.get('/get/:folder_id', async function (req, res) {
  const folderId = parseInt(req.params["folder_id"].trim());
  if (isNaN(folderId)) {
    var images = {};
  }
  else {
     images = await prisma.image.findMany({
      where: {
        folder_id: {
          equals: folderId
        }
      }
    });
    
  }
  res.render("folder", { images: images });

});
module.exports = router;