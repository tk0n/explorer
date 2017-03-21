'use strict';

function smallAddr(fullAddr) {
    return fullAddr.slice(0, 5) + '...' + fullAddr.slice(-5)
}

angular.module('ark_explorer')
  .filter('approval', function () {
      return function (votes) {
          if (isNaN(votes)) {
              return 0;
          } else {
              return ((parseInt(votes) / 10000000000000000) * 100).toFixed(2);
          }
      };
  })
  .filter('epochStamp', function () {
      return function (d) {
          return new Date(
              (((Date.UTC(2016, 4, 24, 17, 0, 0, 0) / 1000) + d) * 1000)
          );
      };
  })
  .filter('forgingTime', function () {
      return function (seconds) {
        if (seconds === 0) {
          return 'Now!';
        }
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - (minutes * 60);
        if (minutes && seconds) {
          return minutes + ' min ' + seconds + ' sec';
        } else if (minutes) {
          return minutes + ' min ';
        } else {
          return seconds + ' sec';
        }
      };
  })
  .filter('fiat', function () {
      return function (amount) {
          if (isNaN(amount)) {
              return (0).toFixed(2);
          } else {
              return (parseInt(amount) / 100000000).toFixed(2);
          }
      };
  })
  .filter('ark', function () {
      return function (amount) {
          if (isNaN(amount)) {
              return (0).toFixed(8);
          } else {
              return (parseInt(amount) / 100000000).toFixed (8).replace (/\.?0+$/, '');
          }
      };
  })
  .filter('nethash', function () {
      return function (nethash) {
          if (nethash == "4befbd4cd1f2f10cbe69ac0b494b5ce070595ed23ee7abd386867c4edcdaf3bd") {
              return network='Testnet';
          } else if (nethash == "6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988")  {
	      return network='Mainnet';
          } else {
	      return network='Local';
	  }
      };
  })
  .filter('round', function () {
      return function (height) {
          if (isNaN(height)) {
              return 0;
          } else {
              return Math.floor(height / 51) + (height % 51 > 0 ? 1 : 0);
          }
      };
  })
  .filter('split', function () {
      return function (input, delimiter) {
          delimiter = delimiter || ',';
          return input.split(delimiter);
      };
  })
  .filter('startFrom', function () {
      return function (input, start) {
          start = +start;
          return input.slice(start);
      };
  })
  .filter('supplyPercent', function () {
      return function (amount, supply) {
          if (isNaN(amount) || !(supply > 0)) {
            return (0).toFixed(2);
          }
          return (amount / supply * 100).toFixed(2);
      };
  })
  .filter('timeAgo', function (epochStampFilter) {
      return function (timestamp) {
          return moment(epochStampFilter(timestamp)).fromNow();
      };
  })
  .filter('timeSpan', function (epochStampFilter) {
      return function (a, b) {
          return moment.duration(
              epochStampFilter(a) - epochStampFilter(b)
          ).humanize();
      };
  })
  .filter('timestamp', function (epochStampFilter) {
      return function (timestamp) {
          var d     = epochStampFilter(timestamp);
          var month = d.getMonth() + 1;

          if (month < 10) {
              month = '0' + month;
          }

          var day = d.getDate();

          if (day < 10) {
              day = '0' + day;
          }

          var h = d.getHours();
          var m = d.getMinutes();
          var s = d.getSeconds();

          if (h < 10) {
              h = '0' + h;
          }

          if (m < 10) {
              m = '0' + m;
          }

          if (s < 10) {
              s = '0' + s;
          }

          return d.getFullYear() + '/' + month + '/' + day + ' ' + h + ':' + m + ':' + s;
      };
  })
    .filter('smallId', function () {
        return function (fullId) {
            return smallAddr(fullId)
        };
    })
    .filter('txSender', function () {
        return function (tx) {
            if (tx.senderDelegate && tx.senderDelegate.username)
                return tx.senderDelegate.username
            if (tx.senderUsername)
                return tx.senderUsername
            if (tx.knownSender && tx.knownSender.owner)
                return tx.knownSender.owner

            return smallAddr(tx.senderId)
        };
    })
    .filter('txRecipient', function (txTypes) {
        return function (tx) {
            if (tx.type !== 0)
                return txTypes[parseInt(tx.type)]
            if (tx.recipientDelegate && tx.recipientDelegate.username)
                return tx.recipientDelegate.username
            if (tx.recipientUsername)
                return tx.senderUsername
            if (tx.knownRecipient && tx.knownRecipient.owner)
                return tx.knownRecipient.owner

            return smallAddr(tx.recipientId)
        };
    })
  .filter('txType', function (txTypes) {
      return function (tx) {
          return txTypes[parseInt(tx.type)];
      };
  })
  .filter('votes', function () {
      return function (a) {
          return (a.username || (a.knowledge && a.knowledge.owner) || a.address);
      };
  });
