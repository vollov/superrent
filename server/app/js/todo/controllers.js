
var model = {
		user: "Adam",
		items: [{ action: "Buy Flowers", done: false },
		{ action: "Get Shoes", done: false },
		{ action: "Collect Tickets", done: true },
		{ action: "Call Joe", done: false }]
};

angular.module('todoModule',[])
.controller('ToDoCtrl',['$scope', '$rootScope', '$location',
				function($scope, $rootScope, $location) {
	$scope.todo = model;

	/**
	 * count the number of completed cases.
	 * TODO: to add underscore library
	 */
	$scope.incompleteCount = function() {
		var count = 0;
		angular.forEach($scope.todo.items, function(item) {
			if (!item.done) {
				count++
			}
		});
		return count;
	}
	
	$scope.warningLevel = function () {
		return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
	}
	
	$scope.addNewItem = function (actionText) {
		$scope.todo.items.push({ action: actionText, done: false });
	}
}])
.filter("checkedItems", function() {
	return function(items, showComplete) {
//		var resultArr = [];
//		angular.forEach(items, function(item) {
//			if (item.done == false || showComplete == true) {
//				resultArr.push(item);
//			}
//		});
		
		var resultArr = _.filter(items, function(item){
			return (item.done == false || showComplete == true);
		});
		return resultArr;
	}
});