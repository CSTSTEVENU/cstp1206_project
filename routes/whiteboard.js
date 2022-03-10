var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()


router.get('/', function(req, res, next) {
    res.render('whiteboard', { title: 'Whiteboard' });
  });
  
  
  module.exports = router;
  