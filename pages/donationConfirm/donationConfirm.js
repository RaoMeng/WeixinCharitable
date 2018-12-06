var app = getApp();
var mMoneyIndex = 0;
var mMoney = '5元';
var yesTarget = 1;

Page({
     /**
      * 页面的初始数据
      */
     data: {
          moneyOptions: ['5元', '10元', '20元', '50元', '100元'],
          moneySelected: 0,
          money: '5元',
          inputValue: '',
          imgUrl: '../../res/images/img_personal_bg.jpg',
          prProId: '',
          ISNOTarget: true
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          console.log(options);
          let imgUrl = options.imgUrl;
          let prProId = options.prProId;
          if (imgUrl == undefined || imgUrl == 'undefined') {
               this.setData({
                    imgUrl: '../../res/images/img_personal_bg.jpg',
                    prProId: prProId
               });
          } else {
               this.setData({
                    imgUrl: imgUrl,
                    prProId: prProId
               });
          }

     },

     moneyTap: function(e) {
          let index = e.currentTarget.dataset.index;
          mMoneyIndex = index;
          mMoney = this.data.moneyOptions[mMoneyIndex];
          let oldIndex = this.data.moneySelected;
          // if (mMoneyIndex == oldIndex) {
          //      mMoneyIndex = -1;
          //      mMoney = '0元';
          // }

          this.setData({
               moneySelected: mMoneyIndex,
               money: mMoney,
               inputValue: ''
          });
     },

     confirmEvent: function() {
          if (!this.data.ISNOTarget) {
               return;
          }
          let mMoney = this.data.money;
          let imid = app.globalData.imid;

          if (imid == 10000) {
               wx.showModal({
                    title: '提示',
                    content: '请先登录',
                    success: function(e) {
                         if (e.confirm) {
                              wx.switchTab({
                                   url: '../personalCenter/personalCenter',
                              })
                         }
                    }
               })
               return;
          }

          if (mMoney == '0元') {
               wx.showToast({
                    title: '请确认金额',
                    icon: 'none'
               })
               return;
          }
          if (yesTarget == 1) {
               yesTarget = 0;
               wx.showLoading({
                    title: '正在跳转支付',
               })
               this.onLaunch();
          } else {
               // yesTarget = 1;
          }

     },

     inputClear: function() {
          console.log('clear');
          mMoneyIndex = -1;
          mMoney = '0元';
          this.setData({
               moneySelected: mMoneyIndex,
               money: mMoney,
               inputValue: ''
          });
     },

     inputFocus: function(e) {
          let value = e.detail.value;

          mMoneyIndex = -1;
          mMoney = (value == '' ? '0元' : (value + '元'));
          this.setData({
               moneySelected: mMoneyIndex,
               money: mMoney
          });
     },

     inputListener: function(e) {
          let value = e.detail.value;

          mMoneyIndex = -1;
          mMoney = (value == '' ? '0元' : (value + '元'));;
          this.setData({
               moneySelected: mMoneyIndex,
               money: mMoney
          });
     },

     searchEvent: function(e) {
          let value = e.detail.value;
     },
     /*
      * 同意协议
      *  
      * */
     AgreementAction: function() {
          let that = this;
          this.setData({
               ISNOTarget: !that.data.ISNOTarget,
          })
     },
     /*
      *查看协议内容 
      */
     chechAgreement: function() {
          wx.navigateTo({
               url: '../registerPage/registerPage?webUrl=https://lj.ubtob.com/mobile#/userAgreement',
          })
          // wx.navigateToMiniProgram({
          //      appId: 'https://lj.ubtob.com/mobile#/userAgreement',
          // })
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

     },
     /*
      * 支付接口
      */
     onLaunch: function() {
          var that = this;
          wx.login({
               success: function(res) {
                    console.log(res);
                    if (res.code) {
                         //发起网络请求

                         wx.request({
                              url: app.globalData.URL_ip + '/donate/wxpay/getOpenid',
                              method: 'POST',
                              data: {
                                   code: res.code
                              },
                              header: {
                                   'content-type': 'application/x-www-form-urlencoded'
                              },

                              success: function(e) {
                                   let dataRes = JSON.parse(e.data.data);
                                   if (e.data.length == 0) {
                                        wx.showToast({
                                             title: '唤起支付失败',
                                             icon: 'none',
                                             duration: 2000
                                        })
                                        wx.hideLoading();
                                        yesTarget = 1;
                                        return;
                                   }
                                   var moneystr = that.data.money.substring(0, that.data.money.length - 1);
                                   wx.request({
                                        url: app.globalData.URL_ip + '/donate/wxpay/pay',
                                        method: 'POST',
                                        data: {
                                             openid: dataRes.openid,
                                             prUuid: app.globalData.prUuid, //uuiD
                                             prProId: that.data.prProId, //单号
                                             prAmount: moneystr //钱说
                                        },
                                        header: {
                                             'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        success: function(res1) {
                                             console.log('支付获取', res1);

                                             that.pay(res1.data.data);
                                        },
                                        fail: function(res1) {
                                             console.log('支付获取失败', res1);
                                             wx.hideLoading();
                                             yesTarget = 1;
                                        }

                                   })
                              },
                              fail: function(e) {
                                   console.log(e);
                                   wx.hideLoading();
                                   yesTarget = 1;
                              }

                         })


                    } else {
                         console.log('登录失败！' + res.errMsg)
                         wx.hideLoading();
                         yesTarget = 1;
                    }
               }
          });
     },
     /* 支付  */
     pay: function(param) {
          console.log("支付")
          console.log(param)
          wx.requestPayment({
               // appId:'wx172657dad29220cc',
               timeStamp: param.timeStamp,
               nonceStr: param.nonceStr,
               package: param.package,
               signType: param.signType,
               paySign: param.paySign,
               success: function(res) {
                    // success
                    wx.hideLoading();
                    yesTarget = 1;
                    wx.showToast({
                         title: '支付成功',
                         icon: 'success',
                         duration: 2000
                    })



               },
               fail: function(res) {
                    wx.hideLoading();
                    yesTarget = 1;
                    wx.showToast({
                         title: '支付失败',
                         icon: 'none',
                         duration: 2000
                    })
               },
               complete: function() {
                    // complete
               }
          })
     }

})