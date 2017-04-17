// var express = require('express');
// var cookieParser = require('cookie-parser');
// var app = express();
// app.listen(3000,function (req,res) {
// 	console.log('success');
// });
// app.use(cookieParser());
//
// app.get('/',function (req,res) {
// 	if (req.cookies.isVisit){
// 		console.log(req.cookies);
// 		res.send("不是第一次来");
// 	}else {
// 		res.cookie("isVisit", 1, {maxAge: 60 * 1000});
// 		res.send("是第一次来");
// 	}
// });

var express = require('express');
var session = require('express-session');
var redisStore  = require('connect-redis')(session);

var app = express();
app.listen(3000,function (req,res) {
	console.log('success');
});

app.use(session({
	store: new  redisStore(),
	secret:'store',
	cookie:{maxAge:60*1000},

}));

app.get('/',function (req,res) {
	if (req.session.isVisit){
		req.session.isVisit++;
		res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
	}else{
		req.session.isVisit = 1;
		res.send('<p>第一次来此页面</p>');
		console.log(req.session);
	}
});