var request = require('request'),
    util = require('util');

module.exports = function (config) {
    var exchanges = {
        BTCUSD : {
            bitfinex  : [
                'Bitfinex',
                'https://api.bitfinex.com/v1/pubticker/BTCUSD',
                function (res, cb) {
                    if (res.message) {
                        return cb(res.message);
                    } else {
                        return cb(null, res.last_price);
                    }
                }
            ],
            bitstamp  : [
                'Bitstamp',
                'https://www.bitstamp.net/api/ticker/',
                function (res, cb) {
                    return cb(null, res.last);
                }
            ],
            btce  : [
                'Btc-e',
                'https://btc-e.com/api/3/ticker/btc_usd',
                function (res, cb) {
                  if (res.error) {
                      return cb(res.error);
                  } else {
                      return cb(null, res.btc_usd.last);
                  }
                }
            ]
        },
        ARKBTC : {
            poloniex : [
                'Poloniex',
                'https://poloniex.com/public?command=returnTicker',
                function (res, cb) {
                    if (res.error) {
                        return cb(res.error);
                    } else {
                        return cb(null, res.BTC_LSK.last);
                    }
                }
            ]
        }
    }

    if (exchanges.BTCUSD.hasOwnProperty(config.btcusdExchange)) {
        config.btcusdExchange = exchanges.BTCUSD[config.btcusdExchange];
        console.log('Exchange:', util.format('Configured %s as BTC/USD exchange', config.btcusdExchange[0]));
    } else {
        console.log('Exchange:', 'Warning: Unrecognized BTC/USD exchange!');
        console.log('Exchange:', 'Defaulting to Bitfinex...');
        config.btcusdExchange = exchanges.BTCUSD.bitfinex;
    }

    if (exchanges.ARKBTC.hasOwnProperty(config.arkbtcExchange)) {
        config.arkbtcExchange = exchanges.ARKBTC[config.arkbtcExchange];
        console.log('Exchange:', util.format('Configured %s as ARK/BTC exchange', config.arkbtcExchange[0]));
    } else {
        console.log('Exchange:', 'Warning: Unrecognized ARK/BTC exchange!');
        console.log('Exchange:', 'Defaulting to Poloniex...');
        config.arkbtcExchange = exchanges.ARKBTC.poloniex;
    }

    var requestTicker = function (type, options, cb) {
        request.get({
            url : options[1],
            json: true
        }, function (err, response, body) {
            if (err) {
                return cb(err);
            } else if (response.statusCode != 200) {
                return cb(util.format('Response code: %s!', response.statusCode));
            } else {
                return options[2](body, cb);
            }
        });
    }

    return {
        getPriceTicker: function (type, cb) {
            if (type == 'BTCUSD') {
                return requestTicker(type, config.btcusdExchange, cb);
            } else if (type == 'ARKBTC') {
                return requestTicker(type, config.arkbtcExchange, cb);
            } else {
                return cb(util.format('Unrecognized \'%s\' ticker type!', type));
            }
        }
    }
}
