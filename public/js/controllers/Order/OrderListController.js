(function() {

    'use strict';

    function orderListCtrl($scope, OrderService, $route, $modal, $location) {

        $scope.setLocationTitle('Pedidos');

        $scope.tableDef = {
            structure: [
                { header: 'Nº Pedido', cell: 'id'},
                { header: 'Nome da Igreja', cell: 'church_name'},
                { header: 'Data', cell: 'created_at', type: 'date'}
            ],
            actions: {
                edit: {
                    onClickFunction: editOrder
                },
                remove: {
                    onClickFunction: removeOrder
                },
                view: {
                    onClickFunction: viewOrder
                }
            },
            items: []
        };

        $scope.searchByParam = function(param) {

            OrderService.getAll(param).
                success(function(orders) {

                    $scope.tableDef.items = angular.copy(orders);
                })
                .error(function(err) {

                    console.error(err);
                });
        };

        $scope.newOrder = function() {

            $location.url('/order/new');
        };

        function viewOrder(order) {

            $location.url('/order/view/' + order.id);
        }

        function editOrder(order) {

            $location.url('/order/edit/' + order.id);
        }

        function removeOrder(order) {

            OrderService.remove(order.id)
                .success(function() {

                    $route.reload();
                })
                .error(function(err) {

                    console.log(err);
                });
        }

        function fetchOrders() {

            OrderService.getAll().
                success(function(orders) {

                    $scope.tableDef.items = angular.copy(orders);
                })
                .error(function(err) {

                    console.error(err);
                });
        }

        fetchOrders();
    }

    angular.module('app.controllers').controller('OrderListController', orderListCtrl);
})();