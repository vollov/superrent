'use strict';

angular.module('sportsDirectives',[])
.directive("cartSummary", function (CartService) {
	return {
		restrict : "E",
		templateUrl : "components/cart/cartSummary.html",
		controller : function($scope) {
			var cartData = CartService.getProducts();
			
			$scope.total = function() {
				
				var total = 0;
				for (var i = 0; i < cartData.length; i++) {
					total += (cartData[i].price * cartData[i].count);
				}
				return total;
			}
			
			$scope.itemCount = function() {
				var total = 0;
				for (var i = 0; i < cartData.length; i++) {
					total += cartData[i].count;
				}
				return total;
			}
		}
	};
});