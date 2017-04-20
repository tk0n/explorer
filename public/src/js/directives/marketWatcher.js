'use strict';

angular.module('ark_explorer.tools')
  .directive('orders', function () {
      return {
          restrict: 'E',
          scope: {
              orders: '=orders',
              heading: '@heading',
              name: '@name'
          },
          templateUrl: '/views/marketWatcher/orders.html',
          replace: true
      };
  });
