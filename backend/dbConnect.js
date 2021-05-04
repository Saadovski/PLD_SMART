const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  "mongodb://pldsmart:pldsmart@146.59.236.173:27017/DB_WALOU?retryWrites=true&w=majority";
const  connect  =  mongoose.connect(url, { useNewUrlParser: true  });
module.exports  =  connect;