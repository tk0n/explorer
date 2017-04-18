'use strict';

angular.module ('lisk_explorer.currency').controller ('CurrencyController',
  function ($scope, $rootScope) {
    $rootScope.currency.symbol = localStorage && localStorage.getItem ('ark_explorer-currency') || 'ARK';

    $scope.setCurrency = function(currency) {
      $rootScope.currency.symbol = currency;
      if (localStorage) {
        localStorage.setItem ('ark_explorer-currency', currency);
      }
    };
  });
