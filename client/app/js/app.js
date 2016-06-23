'user strict';
//global variable is very bad but for now it's better then hardcode app name in each file [anuglar.module('pmp')].
//todo: use amd modules as option.
var pmpApp = angular.module('pmp', ['ngRoute', 'ngResource', 'ds.clock']);
