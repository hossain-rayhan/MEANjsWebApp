myApp.controller('empController', function($scope, $http, $route, $routeParams){
	
	$scope.getEmployees = function(){
		$http.get('/api/employees').then(function(response){
			$scope.employees = response.data;
		});
	};
});
