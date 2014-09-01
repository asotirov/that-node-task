/*global db*/
'use strict';

function setupRoutes(app) {
    app.get('/db/:id', function (req, res, next) {
        var id = req.params.id;
        /*
         Get single item from the database. Response should be in the following format
         {
         Result: (Object: Item with the specified id)
         }
         If the item doest not exist then an error must be returned to the user.

         */
        next('routing.js: "Get item by id" route handler not implemented');
    });

    app.get('/db', function (req, res, next) {
        /*
         Get all items in the database. Response should be in the following format
         {
         Result: (Array of objects: all items in the database)
         }
         */
        db.getAll(function(err, items){
            if (err) {
                next(err); //calling next with an error automatically handles it and sends a response to the user.
            } else {
                res.status(200).send({
                    Result: items
                });
            }
        });
    });

    app.post('/db', function (req, res, next) {
        /*
         Creates the item. Response should be in the following format:
             {
                Result: (Object: item that was created)
             }
         If an error occurred it is shown to the user.
         */
        var item = req.body;
        db.add(item, function (err, createdItem) {
            /*
             If an error has occurred during saving the item, then the .add method calls it's callback with the error as a first parameter.
             This is an indication that something has gone wrong and we handle it.
             */
            if (err) {
                next(err); //calling next with an error automatically handles it and sends a response to the user.
            } else {
                res.status(200).send({
                    Result: createdItem
                });
            }
        });
    });

    app.post('/db/:id', function (req, res, next) {
        var id = req.params.id;
        var item = req.body;
        /*
         Updates the item with the specified id. Response should be in the following format:
             {
                 Result: (Object: New state of the item with the specified id)
             }
         If the item doest not exist then an error must be returned to the user.
         */
        db.updateById(id, item, function (err, updatedItem) {//updateById in db.js should be implemented
            if (err) {
                next(err); //calling next with the error automatically handles it and returns it to the user.
            } else {
                res.status(200).send({
                    Result: updatedItem
                });
            }
        });
    });

    app.delete('/db', function (req, res, next) {
        /*
         Delete all items in the database. Response should contain the count of the delete items like so:
             {
                Result: (Number: count of the items)
             }
         */
        next('routing.js: "Delete all items" route handler not implemented');

    });

    app.delete('/db/:id', function (req, res, next) {
        var id = req.params.id;
        /*
         Delete single item from the database by id. Response should contain the item that was deleted like so:
             {
                Result: (Object: item that was deleted)
             }
         If the item doest not exist then an error must be returned to the user.

         */
        next('routing.js: "Delete item by id" route handler not implemented');
    });
};

module.exports = {
    setup: setupRoutes
};