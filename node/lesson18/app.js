var http = require('http');
var server = http.createServer(requestHandler);
function requsetHandler(req,res) {
	res.end("hello visitor");
}
server.listen(3000);

function parseBody(req, callback) {
	//根据http协议从req中解析body
	callback(null, body);
}
function checkIdInDatabase(body, callback) {
	//根据body.id在Database中检测，返回结果
	callback(null, dbResult);
}
function returnResult(dbResult, res) {
	if (dbResult && dbResult.length > 0) {
		res.end('true');
	} else {
		res.end('false')
	}
}
function requestHandler(req, res) {
	parseBody(req, function(err, body) {
		checkIdInDatabase(body, function(err, dbResult) {
			returnResult(dbResult, res);
		});
	});
}

var middlewares = [
	function fun1(req, res, next) {
		parseBody(req, function(err, body) {
			if (err) return next(err);
			req.body = body;
			next();
		});
	},
	function fun2(req, res, next) {
		checkIdInDatabase(req.body.id, function(err, rows) {
			if (err) return next(err);
			res.dbResult = rows;
			next();
		});
	},
	function fun3(req, res, next) {
		if (res.dbResult && res.dbResult.length > 0) {
			res.end('true');
		}
		else {
			res.end('false');
		}
		next();
	}
]

function requestHandler(req, res) {
	var i=0;

	//由middlewares链式调用
	function next(err) {

		if (err) {
			return res.end('error:', err.toString());
		}

		if (i<middlewares.length) {
			middlewares[i++](req, res, next);
		} else {
			return ;
		}
	}

	//触发第一个middleware
	next();
}