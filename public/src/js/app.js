'use strict';

angular.module('ark_explorer',[
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngProgress',
    'ui.bootstrap',
    'gettext',
    'ark_explorer.system',
    'ark_explorer.socket',
    'ark_explorer.blocks',
    'ark_explorer.transactions',
    'ark_explorer.address',
    'ark_explorer.search',
    'ark_explorer.tools'
]);

angular.module('ark_explorer.system', []);
angular.module('ark_explorer.socket', []);
angular.module('ark_explorer.blocks', []);
angular.module('ark_explorer.transactions', []);
angular.module('ark_explorer.address', []);
angular.module('ark_explorer.search', []);
angular.module('ark_explorer.tools', ['naturalSort']);
