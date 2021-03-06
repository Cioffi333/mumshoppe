angular.module('register.controller', [])
	.controller('registerController', function($scope, $state, AlertsService, CustomerService) {

		$scope.customer = {};
		$scope.invalid = {};
		$scope.REGEX_PHONE = /^(\([0-9]{3}\) |[0-9]{3}[- ]?)[0-9]{3}[- ]?[0-9]{4}$/

		$scope.validate = function(field) {
			$scope.invalid[field] = $scope.customerForm[field].$invalid;
		};

		$scope.register = function(form) {
			if (form.$valid) {
				CustomerService.register($scope.customer)
					.success(function(data) {
						AlertsService.add('success', 'Successfully registered! You may now log in.');
						$state.go('home.login');
					}).error(function(data) {
						AlertsService.add('danger', 'Something went wrong. Please try again.');
					});
			}
		}

		$scope.verifyEmail = function() {
			CustomerService.verifyEmail($scope.customer.email)
				.success(function(data) {
					console.log(data);
					if (!data.valid) {
						$scope.invalid.duplicateEmail = true;
					} else {
						$scope.invalid.duplicateEmail = false;
					}
				});
		}

		$scope.verifyPasswords = function() {
			$scope.invalid.mismatchPasswords = $scope.customer.Password != $scope.confirmPassword;
		}
	});
