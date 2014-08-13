angular.module('mumtypes.controller', [])
	.controller('mumtypesController', function($scope, $state) {
		
	})

	.controller('mumtypesItemsController', function($scope, $state, $modal, itemDetails, AlertsService, ConfirmService) {
		$scope.updateItems = function() {
			itemDetails.service.get()
				.success(function(data) {
					$scope.items = data;
				});
		}
		$scope.updateItems();

		for (var i=0; i<itemDetails.fetch.length; i++) {
			itemDetails.fetch[i]($scope);
		}

		$scope.addItem = function(meta) {
			$modal.open({
				templateUrl: itemDetails.form.url,
				controller: itemDetails.form.controller,
				size: 'lg',
				resolve: {
					item: function() {
						return {};
					},
					save: function() {
						return function(data) {
							return itemDetails.service.create(data);
						}
					},
					meta: function() {
						return meta;
					}
				}
			}).result.then(function() {
				$scope.updateItems();
			});
		}

		$scope.editItem = function(item, meta) {
			$modal.open({
				templateUrl: itemDetails.form.url,
				controller: itemDetails.form.controller,
				size: 'lg',
				resolve: {
					item: function() {
						return item;
					},
					save: function() {
						return function(data) {
							return itemDetails.service.update(item.Id, data);
						}
					},
					meta: function() {
						return meta;
					}
				}
			}).result.then(function() {
				$scope.updateItems();
			});
		}

		$scope.deleteItem = function(item) {
			ConfirmService.confirm({
				head: "Delete Item",
				body: "Are you sure you want to permanently delete " + item.Name + "?"
			}, function() {
				return itemDetails.service.delete(item.Id)
					.success(function() {
						AlertsService.add('success', 'Deleted successfully.');
					}).error(function(err) {
						console.log(err);
						AlertsService.add('danger', 'Error while deleting.');
					}).finally(function() {
						$scope.updateItems();
					});
			});
		}
	})

	.controller('mumtypesEditGradeController', function($scope, $state, $modalInstance, promiseTracker, AlertsService, MumtypesService, item, save) {
		$scope.grade = item;
		$scope.tracker = promiseTracker();
		$scope.invalid = {};

		$scope.validate = function(form, field) {
			$scope.invalid[field] = form[field].$invalid;
		}

		$scope.create = function(form) {
			if (form.$valid) {
				var defered = $scope.tracker.createPromise();
				save($scope.grade)
					.success(function(data) {
						$scope.grade = {};
						AlertsService.add('success', 'Successfully saved grade.');
						$modalInstance.close();
					}).error(function(data) {
						console.log('Error: ' + data);
						AlertsService.add('warning', 'An error occured while saving the grade.');
						$modalInstance.dismiss();
					}).finally(function() {
						defered.resolve();
					});
			}
		}

		$scope.cancel = function() {
			$scope.grade = {};
			$modalInstance.dismiss();
		}
	})

	.controller('mumtypesEditProductController', function($scope, $state, $modalInstance, promiseTracker, AlertsService, MumtypesService, item, save) {
		//$scope.REGEX_PRICE = /^[0-9]*(\.[0-9]{1,2})?$/
		$scope.product = item;
		$scope.tracker = promiseTracker();
		$scope.invalid = {};

		$scope.validate = function(form, field) {
			$scope.invalid[field] = form[field].$invalid;
		}

		$scope.create = function(form) {
			if (form.$valid) {
				var defered = $scope.tracker.createPromise();
				save($scope.product)
					.success(function(data) {
						$scope.grade = {};
						AlertsService.add('success', 'Successfully saved product.');
						$modalInstance.close();
					}).error(function(data) {
						console.log('Error: ' + data);
						AlertsService.add('warning', 'An error occured while saving the product.');
						$modalInstance.dismiss();
					}).finally(function() {
						defered.resolve();
					});
			}
		}

		$scope.cancel = function() {
			$scope.product = {};
			$modalInstance.dismiss();
		}
	})

	.controller('mumtypesEditSizeController', function($scope, $state, $modalInstance, promiseTracker, AlertsService, MumtypesService, meta, item, save) {
		$scope.size = item;
		$scope.size.ProductId = meta.ProductId;
		$scope.tracker = promiseTracker();
		$scope.invalid = {};

		$scope.validate = function(form, field) {
			$scope.invalid[field] = form[field].$invalid;
		}

		$scope.create = function(form) {
			if (form.$valid) {
				console.log($scope.size);
				var defered = $scope.tracker.createPromise();
				save($scope.size)
					.success(function(data) {
						$scope.size = {};
						AlertsService.add('success', 'Successfully saved size.');
						$modalInstance.close();
					}).error(function(data) {
						console.log('Error: ' + data);
						AlertsService.add('warning', 'An error occured while saving the size.');
						$modalInstance.dismiss();
					}).finally(function() {
						defered.resolve();
					});
			}
		}

		$scope.cancel = function() {
			$scope.size = {};
			$modalInstance.dismiss();
		}
	})
