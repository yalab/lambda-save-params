var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
var moment = require('moment');
var s3Bucket = "";

exports.handler = function(event, context) {
  var body = "";
  var key = moment().format("YYYYMMDDHH") + ".txt";
  s3.getObject({Bucket: s3Bucket, Key: key})
  .on("httpData", function(chunk, response){
    if(response.httpResponse.statusCode === 200){
      body += chunk;
    }
  })
  .on("httpDone", function(){
    if(body.length > 0){
      body += "\n";
    }
    body += JSON.stringify(event);
    s3.putObject({
      Bucket: s3Bucket,
      Key: key,
      Body: new Buffer(body, 'binary'),
      ContentType: 'application/octet-stream'
    }, function(err, result){
         if(err){
           context.done(err, "s3 put error");
         }else{
           context.done(null, 'success');
         }
       });
  })
  .send();
};

//exports.handler({hoge: 'foo'}, {done: function(){}});
