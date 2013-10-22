AcFun-Checkin
=========

a little script for checkin on AcFun.tv with Node.js .

#Quick Start

    npm install request node-schedule acfun-checkin

or

    git clone git@github.com:Deloz/acfun-checkin.git
    npm install

#Example

notice: use `UTF-8(NO BOM)` while editing.

    var acfunCheckin = require('acfun-checkin');

    var account = {
        username: 'username',
        password: 'password'
    };

    acfunCheckin.run(account, function (err, checkInfo) {
        if (err) {
            console.log(err);
        } else {
            console.log(checkInfo);
        }
    });

#Public API

##p.run(account, callbackFn)

###account

+ username: the account of acfun.tv
+ password: the password 

#License
The MIT License (MIT)