var DB = require('../lib/db.js');
var Utils = require("../lib/utils");

module.exports = function(app) {
	
	var db = DB(app.config);
	var util = Utils();
	/**
	 * Find property list with owner email and phone
	 */
	app.get('/api/property', function(req, res) {
		
		db.connect(function(err, connection){
//			connection.query( 'SELECT u.email,u.phone,p.street FROM user u, property p where p.owner_id = u.id', function(err, docs) {
			connection.query( 'SELECT *, p.active as status FROM user u, property p where p.owner_id = u.id', function(err, docs) {
				connection.release();
				
				
				if (!err) {
					properties = util.removeFields(docs, ['password','active','latitude','longitude']);
					return res.send(properties);
				} else {
					return res.send(500, { message : err });
				}
			})
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
