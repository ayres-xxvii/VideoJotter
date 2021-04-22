// Bring in the database configuration and the 2 User and Video entities. 

const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const video = require('../models/Video');

// The setUpDB function takes in a drop parameter. If set to true, it will drop all existing tables and re-create them. 
// Be careful when calling this method as it may wipe away all tables in the vidjot database.

// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
    .then(() => {
        console.log('Vidjot database connected');
    })
    .then(() => {

        /*
        Defines the relationship where a user has many videos.
        In this case the primary key from user will be a foreign key
        in video.
        */

        user.hasMany(video);
        mySQLDB.sync({ // Creates table if none exists
            force: drop
        }).then(() => {
            console.log('Create tables if none exists')
        }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
};
module.exports = { setUpDB };