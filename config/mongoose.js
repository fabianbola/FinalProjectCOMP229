let config = require('./config');
let mongoose = require('mongoose');

module.exports = function() {
    
    mongoose.connect(config.ATLASDB);

    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'connection error:'));
    mongodb.once('open', function() { 
        console.log("=======> Connected to MongoDB");
    });
}