var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

/* GET home page. */
router.get('/', async function(req, res, next) {
  //  let folderList = await prisma.folder.findMany({where: {user_id: req.session.user.user_id}} );
  res.render('dashboard', { user: req.session.user, folders: folderList });

});

router.get('/logout', function(req, res, next) {
  res.render('logout');
});






module.exports = router;