angular.module('garnishes.service', [])
	.factory('GarnishesService', function($http) {
		return {
			get: function() {
				return $http.get('/mums/api/garnish');
			},
			create: function(garnishData) {
				return $http.post('/mums/api/garnish', garnishData);
			},
			delete: function(id) {
				return $http.delete('/mums/api/garnish' + id);
			},
			fetch: function(id) {
				return $http.get('/mums/api/garnish' + id);
			}
		}
	});