var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
var moment = require('moment');
var sha1 = require('sha1');
var s3Bucket = "";

exports.handler = function(event, context) {
  var body = "";
  var dir = moment().format("YYYYMMDDHH");
  var fname = "";
  if(body.length > 0){
    body += "\n";
  }
  body += JSON.stringify(event);
  s3.putObject({
    Bucket: s3Bucket,
    Key: dir + '/' + sha1(body) + ".log",
    Body: new Buffer(body, 'binary'),
    ContentType: 'application/octet-stream'
  }, function(err, result){
       if(err){
         context.done(err, "s3 put error");
       }else{
         context.done(null, 'success');
       }
     });
};

// exports.handler({hoge: 'bar'}, {done: function(){}});
