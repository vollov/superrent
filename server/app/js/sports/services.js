angular.module('sportsServices',[])
.factory("CartService", function () {
	var cartData = [];
	return {
		addProduct : function(id, name, price) {
			var addedToExistingItem = false;
			for (var i = 0; i < cartData.length; i++) {
				if (cartData[i].id == id) {
					cartData[i].count++;
					addedToExistingItem = true;
					break;
				}
			}
			
			console.log("cartData=>%j", cartData);
			
			if (!addedToExistingItem) {

				cartData.push({
					count : 1,
					id : id,
					price : price,
					name : name
				});
			}
		},
		removeProduct : function(id) {
			for (var i = 0; i < cartData.length; i++) {
				if (cartData[i].id == id) {
					cartData.splice(i, 1);
					break;
				}
			}
		},
		getProducts : function() {
			return cartData;
		}
	}
});