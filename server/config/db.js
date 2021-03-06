/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoConnectionString = 'mongodb://localhost/qest';

if (process.env.DATABASE_SERVICE_NAME) {
  var USER = process.env.MONGODB_USER;
  var PASSWORD = process.env.MONGODB_PASSWORD;

  var serviceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
  var HOST = process.env[serviceName + "_SERVICE_HOST"] + ":" + process.env[serviceName + "_SERVICE_PORT"];

  var DATABASE = process.env.MONGODB_DATABASE;
  var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL

  var mongoConnectionString = 'mongodb://' + USER + ':' + PASSWORD + "@" + HOST + '/' + DATABASE;
  console.log("Openshift deployment");
}
else console.log("Local deployment");


module.exports = {
  //url : 'mongodb://localhost/qest'
  url: mongoConnectionString
};