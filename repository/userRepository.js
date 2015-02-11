/**
 * Created by Guilherme Brunhole on 08/02/2015.
 */
(function () {

    'use strict';

    var q = require('q');

    module.exports = function(dbPool){

        function queryFromPool(queryCallback) {
            var deferred = q.defer();

            dbPool.getConnection(function(connectionError, connection){

                if(connectionError) {

                    deferred.reject();
                } else {
                    queryCallback(deferred, connection);
                    connection.release();
                }
            });

            return deferred.promise;
        }

        return{
            getAll: function() {

                return queryFromPool(function(deferred, connection) {

                    connection.query('SELECT * FROM users', null, function(queryError, rows) {

                        if(queryError)
                            deferred.reject();
                        else
                            deferred.resolve(rows);
                    });
                });
            },
            add: function(newUser) {

                return queryFromPool(function(deferred, connection) {
//falta colocar o 'last_login'
                    connection.query('INSERT INTO users (name, login, password, email) VALUES (?, ?, ?, ?)',
                        [newUser.name, newUser.login || null, newUser.password || null, newUser.email || null], function(queryError, resultInfo) {

                            if(queryError)
                                deferred.reject();
                            else
                                deferred.resolve(resultInfo.insertId);
                        });
                });
            },
            getById: function(userId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('SELECT * FROM users WHERE id = ?', [userId], function(queryError, row) {

                        if(queryError)
                            deferred.reject();
                        else
                            deferred.resolve(row);
                    });
                });
            },
            update: function(userId, updatedUser) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('UPDATE users SET name = ?, login = ?, password = ?, email = ? WHERE id = ?',
                        [updatedUser.name, updatedUser.login|| null, updatedUser.password || null, updatedUser.email || null, userId], function(queryError) {

                            if(queryError)
                                deferred.reject();
                            else
                                deferred.resolve();
                        });
                });
            },
            removeById: function(userId) {

                return queryFromPool(function(deferred, connection) {

                    connection.query('DELETE FROM users WHERE id = ?', [userId], function(queryError) {

                        if(queryError)
                            deferred.reject();
                        else
                            deferred.resolve();
                    });
                });
            }
        };
    };
})();