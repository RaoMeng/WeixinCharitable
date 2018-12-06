// PersonCenter/PersonCenter.js
var app = getApp();

var API = '';
Page({

     /**
      * 页面的初始数据
      */
     data: {
          newDic: {
               imageUrl: '../../res/images/icon_header_default.png',
          },
          headImg: '../../res/images/icon_header_default.png',
          phoneNum: "0755-26994808",
          isLoginSuccess: app.globalData.isLoginSuccess
     },

     loadData: function() {
          let imid = Number(app.globalData.imid);
          var that = this;
          wx.request({
               url: 'https://lj.ubtob.com/app/center',
               data: {
                    imid: imid
               },
               header: {
                    'content-type': 'application/json'
               },
               success: function(res) {
                    var dataDic = res.data;
                    var IMStr = String(dataDic.user.userIMId);

                    app.globalData.prUuid = dataDic.user.userUU;

                    wx.setStorage({
                         key: 'prUuid',
                         data: app.globalData.prUuid
                    })

                    if (IMStr.length > 4) {
                         dataDic.imageUrl = 'http://mobile.ubtob.com:7443/avatar/t/' + IMStr.substring(2, 6) + '/' + IMStr + '.jpg';
                    } else {
                         dataDic.imageUrl = '../../res/images/icon_header_default.png';
                    }
                    var money = dataDic.sumMoney;

                    if (dataDic.sumMoney == undefined) {
                         dataDic.sumMoney = 0;
                    } else {
                         dataDic.sumMoney = money.toFixed(2);
                    }

                    that.setData({
                         newDic: dataDic,
                         headImg: dataDic.imageUrl
                    })
               },
               fail: function(res) {
                    console.log(res);
               }
          })

     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          let isLogin = app.globalData.isLoginSuccess;
          this.setData({
               isLoginSuccess: isLogin,
          });
          // if (isLogin) {
          //      this.loadData();
          // }
     },

     loginTap: function(e) {
          wx.navigateTo({
               url: '../loginPage/loginPage',
          })
     },

     previewHead: function() {
          wx.previewImage({
               current: this.data.headImg,
               urls: [this.data.headImg]
          })
     },

     headerError: function() {
          this.setData({
               headImg: '../../res/images/icon_header_default.png'
          });
     },

     registerTap: function(e) {
          wx.navigateTo({
               url: '../registerPage/registerPage?webUrl=https://sso.ubtob.com/register/enterpriseRegistration',
          })
     },

     exitLoginEvent: function(e) {
          let that = this;
          wx.showModal({
               title: '提示',
               content: '确定退出登录',
               success: function(e) {
                    if (e.confirm) {
                         app.globalData.isLoginSuccess = false;
                         app.globalData.imid = 10000;
                         app.globalData.prUuid = 0;
                         that.setData({
                              isLoginSuccess: app.globalData.isLoginSuccess
                         });

                         wx.setStorage({
                              key: 'prUuid',
                              data: app.globalData.prUuid,
                         })
                         wx.setStorage({
                              key: 'imid',
                              data: app.globalData.imid,
                         })
                         wx.setStorage({
                              key: 'isLoginSuccess',
                              data: app.globalData.isLoginSuccess,
                         })
                    }
               },
          })

     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function() {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function() {
          let isLogin = app.globalData.isLoginSuccess;
          this.setData({
               isLoginSuccess: isLogin,
               newDic: {
                    imageUrl: '../../res/images/icon_header_default.png',
               },
               headImg: '../../res/images/icon_header_default.png'
          });
          if (isLogin) {
               this.loadData();
          }
     },

     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function() {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function() {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function() {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function() {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function() {

     },
     /*
      * 打电话
      */
     callAction: function() {
          var that = this
          wx.makePhoneCall({
               phoneNumber: that.data.phoneNum,
               success: function() {

               },
               fail: function() {

               },

          })
     },
     /*
      * 跳转捐款详情界面
      */
     donationDetail: function() {
          wx.navigateTo({
               url: '../donationDetail/donationDetail',
          })

     }
})