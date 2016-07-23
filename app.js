var express = require('express');
var fs = require('fs');
var s3fs = require('s3fs'),
    s3fsImpl = new s3fs('node-upload-s3', {
      accessKeyId: process.env.awsAccessKeyId,
      secretAccessKey: process.env.awsSecretAccessKey
    });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//create a new bucket
// s3fsImpl.create();

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/uploads', multipartMiddleware, function(req, res) {
  var files = req.files.files;
    var stream = fs.createReadStream(files.path);
    s3fsImpl.writeFile(files.originalFilename, stream, function() {
      fs.unlink(files.path, function() {
        res.redirect('/');
      });
    });
});

app.listen('3000', function() {
  console.log('server up!');
});
