'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */

angular.module('adminApp')
	.controller('MainCtrl', function ($scope, $window) {
      
	$scope.popupHeight = $window.innerHeight + 'px';
	$scope.popupWidth = $window.innerWidth + 'px';

	$scope.isVisible = false;

	$scope.showFullPage = function(color) {
		$scope.fullpagestyle = {
			'background-color' : color
		}
		$scope.isVisible = !$scope.isVisible;
	}
      
	$scope.backHome = function () {
		$scope.isVisible = !$scope.isVisible;
		$scope.fb_integration = false;
		$scope.shownews = false;
	}
});

