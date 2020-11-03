const boats = require('./boats.json')
const mongoDbClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017',
    dbName = 'boats',
    collectionName = 'boats';

mongoDbClient.connect(dbUrl, {
    useUnifiedTopology: true
}, function (err, database) {
    // Set the database and collection references
    const db = database.db(dbName), collection = db.collection(collectionName);

    collection
        .find()
        .toArray(function (err, result) {
            //if the document is null
            if (!result || result.length === 0) {
                //Init DB with something
                collection.insertMany(boats, function (err, result) {
                    console.log('Inserted ' + boats.length + ' documents into the collection:');
                    console.log(result);
                    //close the database
                    database.close()
                        .then(r => {
                            console.log('DB connection closed')
                        });
                    return;
                });

            } else {
                console.log(`DB already have ${result.length} values`);
                database.close()
                    .then(r => {
                        console.log('DB connection closed')
                    });
                return;
            }
        });
});
/*
mongoDbClient.connect(dbUrl, function(err, database) {
    console.log("Connected successfully to MongoDB database");

    //set the database and collection references
    var db = database.db(dbName), collection = db.collection(collectionName);



    //insert one document into the collection
    collection.insertMany(dbDocuments, function(err, result) {
        console.log('Inserted ' + dbDocuments.length +  ' documents into the collection:');
        console.log(result);

        //close the database
        database.close();
    });
});
*/
