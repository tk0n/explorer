'use strict';

var Header = function ($rootScope) {
    this.updateBlockStatus = function (res) {
        if (res.success) {
            $rootScope.blockStatus = {
                height:    res.height,
                fee:       res.fee,
                milestone: res.milestone,
                reward:    res.reward,
                supply:    res.supply,
                nethash:   res.nethash
            };
        }
    };

    this.updatePriceTicker = function (res) {
        if (res.success) {
            $rootScope.btc_usd  = res.btc_usd;
            $rootScope.ark_btc = res.ark_btc;
            $rootScope.ark_usd = res.ark_usd;
        } else {
            $rootScope.btc_usd = $rootScope.ark_btc = $rootScope.ark_usd = 0.0;
        }
    };
};

angular.module('ark_explorer.system').factory('header',
  function ($rootScope, $socket) {
      return function ($scope) {
          var header = new Header($rootScope),
              ns = $socket('/header');

          ns.on('data', function (res) {
              if (res.status) { header.updateBlockStatus(res.status); }
              if (res.ticker) { header.updatePriceTicker(res.ticker); }
          });

          $scope.$on('$destroy', function (event) {
              ns.removeAllListeners();
          });

          return header;
      };
  });
