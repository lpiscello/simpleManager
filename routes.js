(function() {

    'use strict';

    module.exports = function(app, pool){

        var ProductRepository = require('./repository/productRepository')(pool);
        var ProductController = require('./controller/productController')(ProductRepository);

//<<<<<<< HEAD
        var userRepository = require('./repository/userRepository')(pool);
        var UserController = require('./controller/userController')(UserController);

//=======
        var OrderRepository = require('./repository/orderRepository')(pool);
        var OrderController = require('./controller/orderController')(OrderRepository);
//>>>>>>> origin/master

        var churchRepository = require('./repository/churchRepository')(pool);
        var ChurchController = require('./repository/churchController')(churchRepository);

        app.get('/product', ProductController.getAll);
        app.post('/product', ProductController.addNew);

        app.get('/product/:id', ProductController.getById);
        app.put('/product/:id', ProductController.update);
        app.delete('/product/:id', ProductController.remove);

//<<<<<<< HEAD
        app.get('/user', UserController.getAll);
        app.post('/user', UserController.addNew);

        app.get('/user/:id', UserController.getById);
        app.put('/user/:id', UserController.update);
        app.delete('/user/:id', UserController.remove);
//=======
        app.get('/order', OrderController.getAll);
        app.post('/order', OrderController.addNew);

        app.get('/order/:id', OrderController.getById);
        app.put('/order/:id', OrderController.update);
        app.get('/order/:id/spreadSheet', OrderController.getSpreadSheet);
//>>>>>>> origin/master
        app.get('/church', ChurchController.getAll);
        app.post('./church', ChurchController.addNew);

        app.get('/church/:id', ChurchController.getById);
        app.put('/church/:id', ChurchController.update);
        app.delete('./church/:id', ChurchController.remove);

    }
})();