/**
 * Created by Guilherme Brunhole on 10/02/2015.
 */
(function() {

    'use strict';

    module.exports = function(churchRepository) {

        function errorThrown(res) {

            console.error(res);
            res.status(500).send('An error ocurred, please contact support. Thank you!');
        }

        return {
            getAll: function(req, res) {

                churchRepository.getAll().then(function(results) {

                    res.send(results);
                }, function() {

                    errorThrown(res);
                });
            },
            addNew: function(req, res) {

                churchRepository.add(req.body).then(function(createdChurchId) {

                    res.send('Church created with Id: ' + createdChurchId);
                }, function() {

                    errorThrown(res);
                });
            },
            getById: function(req, res) {

                churchRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1)
                        res.status(404).send('Church not found :(');
                    else
                        res.send(result[0]);
                }, function() {

                    errorThrown(res);
                });
            },
            update: function(req, res) {

                churchRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Church not found :(');
                    } else {

                        churchRepository.update(req.params.id, req.body).then(function () {

                            res.send('Church updated!');
                        }, function () {

                            errorThrown(res);
                        });
                    }
                }, function() {

                    errorThrown(res);
                });
            },
            remove: function(req, res) {

                churchRepository.getById(req.params.id).then(function(result) {

                    if(!result || !result[0] || result.length < 1) {

                        res.status(404).send('Church not found :(');
                    } else {

                        churchRepository.removeById(req.params.id).then(function() {

                            res.send('Church removed!');
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