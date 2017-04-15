var eventproxy = require('eventproxy'),
	superagent = require('superagent'),
	cheerio = require('cheerio'),
	express = require('express');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

var app = express();


app.get('/',function (req,res) {
	superagent.get(cnodeUrl)
		.end(function (err,sres) {
			if (err){
				return console.error(err);
			}
			var topicUrls = [];
			var $ = cheerio.load(sres.text);
			$("#topic_list .topic_title").each(function (index ,element) {
				var $element = $(element);
				var herf = url.resolve(cnodeUrl,$element.attr('href'));
				topicUrls.push(herf);
			});

			topicUrls = topicUrls.slice(0,3);
			//res.send(topicUrls);
			var ep = new eventproxy(),
				len = topicUrls.length,
				comment = [];
			ep.after('get_url',len,function (list) {
				list.forEach(function (obj) {
					var $ = cheerio.load(obj[1]);
					comment.push({
						href:obj[0],
						title:$(".topic_full_title").clone().children().remove().end().text().trim(),
						comment1:$('.markdown-text').eq(0).find('p').eq(0).text(),
					})
				});
				res.send(comment);
			});
			topicUrls.forEach(function (topicUrl) {
				superagent.get(topicUrl)
					.end(function (err ,res) {
						if(err){
							return console.error(err);
						}
						ep.emit('get_url',[topicUrl,res.text]);
					})
			})
		});

});

app.listen(3000,function (req,res) {
	console.log('success');
});