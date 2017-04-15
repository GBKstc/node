var express = require('express'),
	superagent = require('superagent'),
	cheerio =require('cheerio');
var app = express();

app.get("/",function (req,res,next) {
	superagent.get('https://cnodejs.org/')
		.end(function (err,sres) {
			if (err){
				return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$('.user_avatar img').each(function (index ,element) {
				items.push({
					author:$(element).attr("title"),
				})
			});
			$('#topic_list .topic_title').each(function (index ,element) {
				var $element = $(element);
				items[index] = Object.assign({},items[index],{
					title:$element.attr('title'),
					href:$element.attr('href'),
				})
			});
			res.send(items);
		});

});
app.listen(3000,function (req,res) {
	console.log("success");
});