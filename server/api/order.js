var DB = require('../lib/db.js');
var db = DB();
var Midware = require('../lib/midware')
var midware = Midware();

module.exports = function(app) {
	app.get('/api/orders', function(req, res) {
		db.find('orders',{},{},{},10, function(err, docs) {
			if (!err) {
				return res.send(midware.filterId(docs));
			} else {
				return res.send(500, { message : err });
			}
		});
	});
	
	app.post('/api/orders', function(req, res){
		db.save('orders', req.body, function(err,doc){
			if (!err) {
				return res.send(doc);
			} else {
				return res.send(500, { message : err });
			}
		});
		
	});
};