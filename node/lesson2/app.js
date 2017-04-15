var express = require('express'),
	utility = require('utility');

var app = express();

app.get('/',function (req,res) {
	if (req.query.q){
		var q = req.query.q;
	}else {
		var q = "西瓜呱呱";
	}

	var md5Value = utility.sha1(q);

	res.send(md5Value);
});

app.listen(3000,function (req,res) {
	console.log("app is running at port 3000");
});