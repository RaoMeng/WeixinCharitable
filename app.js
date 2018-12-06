//app.js
var utils = require('common/utils.js');

App({
     onLaunch: function() {
          // wx.setEnableDebug({
          //      enableDebug: true
          // })
          var that = this;

          wx.getStorage({
               key: 'prUuid',
               success: function(res) {
                    let data = res.data;
                    that.globalData.prUuid = data;
               },
               fail: function() {
                    console.log('cachep', '1');
               }
          })
          wx.getStorage({
               key: 'imid',
               success: function(res) {
                    let data = res.data;
                    that.globalData.imid = data;
               },
               fail: function() {
                    console.log('cachep', '2');
               }
          })
          wx.getStorage({
               key: 'isLoginSuccess',
               success: function(res) {
                    let data = res.data;
                    console.log(data);
                    that.globalData.isLoginSuccess = data;
               },
               fail: function() {
                    console.log('cachep', '3');
               }
          })

          wx.getSystemInfo({
               success: function(res) {
                    var sdkVersion = res.SDKVersion;
                    var versionCompare = utils.compareVersion(sdkVersion, '1.9.90');
                    if (versionCompare == -1) {
                         that.globalData.isVersionHigh = false
                    } else {
                         that.globalData.isVersionHigh = true
                    }
               },
          });


          // 登录
          wx.login({
               success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
               }
          })
          // 获取用户信息
          wx.getSetting({
               success: res => {
                    if (res.authSetting['scope.userInfo']) {
                         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                         wx.getUserInfo({
                              success: res => {
                                   // 可以将 res 发送给后台解码出 unionId
                                   this.globalData.userInfo = res.userInfo

                                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                   // 所以此处加入 callback 以防止这种情况
                                   if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                   }
                              }
                         })
                    }
               }
          })
     },
     globalData: {
          userInfo: null,
          isVersionHigh: false,
          isLoginSuccess: false,
          imid: 10000,
          prUuid: 0,
          // URL_ip: 'http://nf20718343.iask.in:32004/'
          URL_ip: 'https://mobile.ubtob.com:8443/'          
     },
     func: {
          dateFormat: utils.dateFormat,
     }
})