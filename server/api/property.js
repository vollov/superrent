var DB = require('../lib/db.js');
var Utils = require("../lib/utils");
var Prop = require('../service/property');

module.exports = function(app) {
	
	var propService = Prop(app.config);

	/**
	 * Find property list with owner email and phone
	 */
	app.get('/api/property', function(req, res) {
		
		propService.getProperties(function(err,properties){
			if (!err) {
				return res.send(properties);
			} else {
				return res.send(500, { message : err });
			}
		});
	});
	
//	app.post('/api/property', function(req, res){
//		db.save('property', req.body, function(err,doc){
//			if (!err) {
//				return res.send(doc);
//			} else {
//				return res.send(500, { message : err });
//			}
//		});
//		
//	});
//	
//	app.delete('/api/property/:id', function(req, res){
//		var id = req.params.id;
//		
//		db.remove('property', {'_id': db.getId(id)}, function(err, doc){
//			if (!err) {
//				res.json(true);
//			} else {
//				console.log(err);
//				res.json(false);
//			}
//		});
//	});
};
