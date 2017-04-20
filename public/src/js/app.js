'use strict';

angular.module('ark_explorer',[
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngProgress',
    'ui.bootstrap',
    'gettext',
    'monospaced.qrcode',
    'ark_explorer.system',
    'ark_explorer.socket',
    'ark_explorer.blocks',
    'ark_explorer.transactions',
    'ark_explorer.address',
    'ark_explorer.search',
    'ark_explorer.tools',
    'ark_explorer.currency'
]);

angular.module('ark_explorer.system', []);
angular.module('ark_explorer.socket', []);
angular.module('ark_explorer.blocks', []);
angular.module('ark_explorer.transactions', []);
angular.module('ark_explorer.address', []);
angular.module('ark_explorer.search', []);
angular.module('ark_explorer.tools', ['naturalSort']);
angular.module('ark_explorer.currency', []);
