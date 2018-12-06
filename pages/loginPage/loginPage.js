// pages/loginPage/loginPage.js
import md5 from '../../common/md5.js';

var app = getApp();
var mUsername, mPassword;

const loginUrl = "https://mobile.ubtob.com/user/login";

Page({

     /**
      * 页面的初始数据
      */
     data: {
          showContent: false,
          isVersionHigh: false
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          var that = this;
          if (app.globalData.isVersionHigh) {
               that.setData({
                    showContent: true,
                    isVersionHigh: true
               });
          } else {
               that.setData({
                    showContent: true,
                    isVersionHigh: false
               });
          }

          mUsername = '';
          mPassword = '';
     },

     usernameInput: function(e) {
          mUsername = e.detail.value;
     },

     passwordInput: function(e) {
          mPassword = e.detail.value;
     },

     loginEvent: function(e) {
          if (mUsername === null || mUsername === undefined || mUsername.length === 0) {
               wx.showToast({
                    title: '请输入用户名',
                    icon: 'none'
               })
               return;
          } else if (mPassword === null || mPassword === undefined || mPassword.length === 0) {
               wx.showToast({
                    title: '请输入密码',
                    icon: 'none'
               })
               return;
          }
          wx.showLoading({
               title: '正在登录...',
               mask: true
          })

          let md5Username = md5(mUsername);
          let md5Password = md5(mPassword);
          wx.request({
               url: loginUrl,
               method: 'GET',
               header: {
                    'content-type': 'application/json',
                    'Charset': 'UTF-8'
               },
               data: {
                    'telephone': md5Username,
                    'password': md5Password,
               },
               success: function(res) {
                    wx.hideLoading();
                    let data = res.data.data;
                    console.log('login', data);
                    if (data == undefined) {
                         wx.showToast({
                              title: res.data.resultMsg,
                              icon: 'none'
                         })
                    } else {
                         wx.showToast({
                              title: '登录成功',
                         })
                         app.globalData.imid = data.userId;
                         app.globalData.isLoginSuccess = true;

                         wx.setStorage({
                              key: 'imid',
                              data: app.globalData.imid
                         })
                         wx.setStorage({
                              key: 'isLoginSuccess',
                              data: app.globalData.isLoginSuccess
                         })
                         wx.switchTab({
                              url: '../personalCenter/personalCenter',
                              success: function(e) {
                                   var page = getCurrentPages().pop();
                                   if (page == undefined || page == null) return;
                                   page.onLoad();
                              }
                         })
                    }
               },
               fail: function(res) {
                    wx.hideLoading();
                    wx.showToast({
                         title: '登录失败',
                    })
               }
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

     }
})