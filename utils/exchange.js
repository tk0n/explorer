'use strict';

var async = require('async');

module.exports = function (config) {
    this.BTCUSD = this.ARKBTC = '~';

    this.loadRates = function () {
        async.parallel([
            function (cb) { exchange.loadBTCUSD(cb); },
            function (cb) { exchange.loadARKBTC(cb); }
        ]);
    };

    this.loadBTCUSD = function (cb) {
        console.log('Exchange:', 'Loading BTC/USD curs from exchange...');
        getBTCUSD(function (err, result) {
            if (err) {
                console.log('Exchange:', 'Loading BTC/USD failed...');
                console.log('Error:', err);
            } else if (result !== '~') {
                this.BTCUSD = result;
                console.log('Exchange:', 'BTC/USD loaded...', result);
            }
            if (cb) {
                return cb(err, result);
            }
        }.bind(this));
    };

    this.loadARKBTC = function (cb) {
        console.log('Exchange:', 'Loading ARK/BTC curs from exchange...');
        getARKBTC(function (err, result) {
            if (err) {
                console.log('Exchange:', 'Loading BTC/ARK failed...');
                console.log('Error:', err);
            } else if (result !== '~') {
                this.ARKBTC = result;
                console.log('Exchange:', 'BTC/ARK loaded...', result);
            }
            if (cb) {
                return cb(err, result);
            }
        }.bind(this));
    };

    this.ARKUSD = function (ark) {
        if (ark && this.ARKBTC !== '~' && this.BTCUSD !== '~') {
            return (parseFloat(ark) * parseFloat(this.ARKBTC) * parseFloat(this.BTCUSD)).toFixed(3);
        } else {
            return 0;
        }
    };

    // Interval

    if (config.enableExchange) {
        setInterval(this.loadRates, config.updateExchangeInterval);
    }

    // Private

    var exchange = this;
    var api = require('./exchange-api')(config);

    var getBTCUSD = function (cb) {
        if (config.enableExchange) {
            api.getPriceTicker('BTCUSD', function (err, result) {
                return cb(err, result);
            });
        } else {
            console.log('Exchange:', 'Loading BTC/USD disabled...');
            return cb(null, '~');
        }
    };

    var getARKBTC = function (cb) {
        if (config.enableExchange) {
            api.getPriceTicker('ARKBTC', function (err, result) {
                return cb(err, result);
            });
        } else {
            console.log('Exchange:', 'Loading ARK/BTC disabled...');
            return cb(null, '~');
        }
    };
};
