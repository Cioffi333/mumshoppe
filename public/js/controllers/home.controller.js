angular.module('home.controller', [])
	.controller('homeController', function($scope, $rootScope, $state) {

		$rootScope.$state = $state;

		$scope.openLogIn = function() {
			$state.go('home.login');
		}

		$scope.openRegister = function() {
			$state.go('home.register');
		}

	})

	.controller('logoutController', function($state, $cookieStore) {

		$cookieStore.remove('customer');

		$state.go('home.login');

	});