angular.module('sportsControllers',[])
.constant("dataUrl", "http://localhost:8800/api/products")
.constant("orderUrl", "http://localhost:8800/api/orders")
.controller('sportsStoreCtrl',['$scope', '$rootScope', '$http', 'dataUrl', 'orderUrl','CartService', 
				function($scope, $rootScope, $http, dataUrl, orderUrl, CartService) {
//	$scope.data = {
//			products: [
//			{ name: "Product #1", description: "A product",
//			category: "Category #1", price: 100 },
//			{ name: "Product #2", description: "A product",
//			category: "Category #1", price: 110 },
//			{ name: "Product #3", description: "A product",
//			category: "Category #2", price: 210 },
//			{ name: "Product #4", description: "A product",
//			category: "Category #3", price: 202 }]
//	};
	

	$scope.data = {};
	
	$http.get(dataUrl).success(function(data) {
		$scope.data.products = data;
	}).error(function(error) {
		$scope.data.error = error;
	});
	
	$scope.sendOrder = function (shippingDetails) {
		var order = angular.copy(shippingDetails);
		order.products = CartService.getProducts();
		$http.post(orderUrl, order)
		.success(function (data) {
			console.log("get order save data-> %j", data);
			$scope.data.orderId = data.id;
			CartService.getProducts().length = 0;
		})
		.error(function (error) {
			$scope.data.orderError = error;
		}).finally(function () {
			$location.path("/complete");
		});
	}
}])
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount, CartService) {
	var selectedCategory = null;
	
	$scope.selectedPage = 1;
	$scope.pageSize = productListPageCount;
	
	$scope.selectCategory = function(newCategory) {
		selectedCategory = newCategory;
		$scope.selectedPage = 1;
	}
	
	$scope.selectPage = function (newPage) {
		$scope.selectedPage = newPage;
	}
	
	$scope.categoryFilterFn = function(product) {
		return selectedCategory == null
				|| product.category == selectedCategory;
	}
	
	$scope.getCategoryClass = function (category) {
		return selectedCategory == category ? productListActiveClass : "";
	}
	
	$scope.getPageClass = function (page) {
		return $scope.selectedPage == page ? productListActiveClass : "";
	}
	
	$scope.addProductToCart = function (product) {
		console.log("addProductToCart: id->%j, name->%j, price->%j", product.id, product.name, product.price);
		CartService.addProduct(product.id, product.name, product.price);
	}
})
.controller("cartSummaryController", function($scope, CartService) {
	$scope.cartData = CartService.getProducts();
	
	$scope.total = function() {
		var total = 0;
		for (var i = 0; i < $scope.cartData.length; i++) {
			total += ($scope.cartData[i].price * $scope.cartData[i].count);
		}
		return total;
	}
	
	$scope.remove = function(id) {
		CartService.removeProduct(id);
	}
})

///////////////////Authentication///////////////////////////
.constant("authUrl", "http://localhost:8800/api/login")
.controller("authCtrl", function($scope, $http, $location, authUrl) {
	$scope.authenticate = function(user, pass) {
		$http.post(authUrl, {
			username : user,
			password : pass
		}, {
			withCredentials : true
		}).success(function(data) {
			$location.path("/admin/main");
		}).error(function(error) {
			$scope.authenticationError = error;
		});
	}
})
.controller("mainCtrl",function($scope) {
	$scope.screens = [ "Products", "Orders" ];
	$scope.current = $scope.screens[0];
	$scope.setScreen = function(index) {
		$scope.current = $scope.screens[index];
	};
	$scope.getScreen = function() {
		return $scope.current == "Products" ? "/views/sports/admin/products.html"
				: "/views/sports/admin/orders.html";
	};
})
.controller("ordersCtrl", function ($scope, $http, orderUrl) {
	$http.get(orderUrl, {
		withCredentials : true
	}).success(function(data) {
		$scope.orders = data;
	}).error(function(error) {
		$scope.error = error;
	});
	$scope.selectedOrder;
	$scope.selectOrder = function(order) {
		$scope.selectedOrder = order;
	};
	$scope.calcTotal = function(order) {
		var total = 0;
		for (var i = 0; i < order.products.length; i++) {
			total += order.products[i].count * order.products[i].price;
		}
		return total;
	}
})
.constant("productUrl", "http://localhost:8800/api/products/")
.config(function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
})
.controller("productCtrl", function ($scope, $resource, productUrl) {
	$scope.productsResource = $resource(productUrl + ":id", {
		id : "@id"
	});
	$scope.listProducts = function() {
		$scope.products = $scope.productsResource.query();
	}
	$scope.deleteProduct = function(product) {
		product.$delete().then(function() {
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	}
	$scope.createProduct = function(product) {
		new $scope.productsResource(product).$save().then(function(newProduct) {
			$scope.products.push(newProduct);
			$scope.editedProduct = null;
		});
	}
	$scope.updateProduct = function(product) {
		product.$save();
		$scope.editedProduct = null;
	}
	$scope.startEdit = function(product) {
		$scope.editedProduct = product;
	}
	$scope.cancelEdit = function() {
		$scope.editedProduct = null;
	}
	$scope.listProducts();
});