var Q = require("q");
var defer = Q.defer();

function getInitialPromise() {
	return defer.promise;
}

getInitialPromise().then(function (success) {
	console.log('success');
},function (error) {
	console.log(error);
},function (progress) {
	console.log(progress);
});
defer.notify('in progress');//控制台打印in progress
defer.resolve('resolve');   //控制台打印resolve
defer.reject('reject');		//没有输出。promise的状态只能改变一次

var outputPromise = getInitialPromise().then(function (fulfilled) {
	return 'fulfilled';
},function (rejected) {
	return 'rejected';
});
defer.reject();