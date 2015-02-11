/**
 * Created by Guilherme Brunhole on 08/02/2015.
 */
(function() {

    'use strict';

    module.exports = function(userRepository) {

        function errorThrown(res) {

            console.error(res);
            res.status(500).send('An error ocurred, please contact support. Thank you!');
        }

        return {
            getAll: function(req, res) {

                userRepository.getAll().then(function(results) {

                    res.send(results);
                }, function() {

                    errorThrown(res);
                });
            },
            addNew: function(req, res) {

                userRepository.add(req.body).then(function(createdUserId) {

                    res.send('User created with Id: ' + createdUserId);
                }, function() {

                    errorThrown(res);
                });
            },
            getById: function(req, res) {

                userRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1)
                        res.status(404).send('User not found :(');
                    else
                        res.send(result[0]);
                }, function() {

                    errorThrown(res);
                });
            },
            update: function(req, res) {

                userRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('User not found :(');
                    } else {

                        userRepository.update(req.params.id, req.body).then(function () {

                            res.send('User updated!');
                        }, function () {

                            errorThrown(res);
                        });
                    }
                }, function() {

                    errorThrown(res);
                });
            },
            remove: function(req, res) {

                userRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('User not found :(');
                    } else {

                        userRepository.removeById(req.params.id).then(function() {

                            res.send('User removed!');
                        }, function() {

                            errorThrown(res);
                        });
                    }
                }, function() {

                    errorThrown(res);
                });
            }
        };
    };
})();