var request = require('request');
var querystring = require('querystring');
var schedule = require('node-schedule');

var checkinUrl = 'http://www.acfun.tv/member/checkin.aspx';
var loginUrl = 'http://www.acfun.tv/login.aspx?locale=zh_CN';

var j = request.jar();
request = request.defaults({jar: j});

exports.run = function(account, callback) {
    console.log('waiting the date for checkin...');
    var job = schedule.scheduleJob('0 0 * * *', function() {
        console.log('\n');

        var postData = querystring.stringify(account);

        request.post({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': postData.length,
                'Referer': 'http://www.acfun.tv/login.aspx?locale=zh_CN',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36'
            },
            url: loginUrl,
            body: postData
        }, function(error, response, body) {
            if (error) {
                return callback(error);
            }

            if (200 !== response.statusCode) {
                return callback(null, 'acfun signin failed.http code: ' + response.statusCode);
            }

            if (body) {
                try {
                    var bodyJson = JSON.parse(body);
                    if (bodyJson.success) {
                        var msg = 'user [ ' + account.username + ' ] login success.'; 
                        request.get({
                            url: checkinUrl
                        }, function(error, response, body) {
                            try {
                                var bodyJson = JSON.parse(body);
                                if (bodyJson.success) {
                                    msg += '\nsuccess to checkin on ACFUN.TV';
                                    callback(null, msg);
                                } else {
                                    msg += '\ncheckin faild: ' + bodyJson.result;
                                    callback(null, msg);
                                }
                            } catch (e) {
                                callback(null, e);
                            }
                        });
                    } else {
                        callback(null, 'login faild: ' + bodyJson.result);
                    }
                } catch (e) {
                    callback(null, e);
                }
            }
        });
    });
};
