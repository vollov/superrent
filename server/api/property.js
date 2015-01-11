var DB = require('../lib/db.js');
var db = DB();
var Midware = require('../lib/midware')
var midware = Midware();

module.exports = function(app) {
	
	
	/**
	 * Find property list, 
	 * then find unique owners ids, 
	 * then query owner table to get owner
	 */
	app.get('/api/property', function(req, res) {
		db.find('property',{},{},{},10, function(err, docs) {
			if (!err) {
				return res.send(midware.filterId(docs));
			} else {
				return res.send(500, { message : err });
			}
		});
	});
	
	app.post('/api/property', function(req, res){
		db.save('property', req.body, function(err,doc){
			if (!err) {
				return res.send(doc);
			} else {
				return res.send(500, { message : err });
			}
		});
		
	});
	
	app.delete('/api/property/:id', function(req, res){
		var id = req.params.id;
		
		db.remove('property', {'_id': db.getId(id)}, function(err, doc){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});
};
