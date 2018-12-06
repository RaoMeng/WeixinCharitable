var app = getApp();
const detailUrl = "https://lj.ubtob.com/app/project/detail";
var mId = 0;

Page({

     /**
      * 页面的初始数据
      */
     data: {
          project: {},
          organization: {},
          ISNOTarget: false
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          let that = this;
          mId = options.id;

          wx.showLoading({
               title: '正在加载...',
          })
          wx.request({
               url: detailUrl,
               method: 'GET',
               data: {
                    id: mId
               },
               success: function(res) {
                    wx.hideLoading();
                    let data = res.data;
                    let project = data.project;
                    if (project != undefined) {
                         let organization = project.organization;

                         if (organization == undefined) {
                              organization = {};
                         }
                         that.setData({
                              project: {
                                   mobileImg: project.mobileImg,
                                   name: project.name,
                                   overdue: project.overdue,
                                   proSummary: project.proSummary,
                                   target: project.target,
                                   totalAmount: (project.totalAmount).toFixed(2),
                                   joinAmount: project.joinAmount,
                                   dateInterval: project.startTime + ' 到 ' + project.endTime,
                                   detail: project.introduction,
                                   population: project.population
                              },
                              organization: {
                                   icon: organization.logo,
                                   orgName: organization.name,
                                   summary: organization.summary,
                                   createTime: app.func.dateFormat(organization.createTime, 'Y-M-D'),
                                   local: organization.province + "  " + organization.city,
                                   telphone: organization.telphone,
                                   address: organization.address,
                                   website: organization.website
                              },
                              ISNOTarget: true
                         });
                         console.log(that.data.ISNOTarget);
                    } else {

                         console.log(that.data.ISNOTarget);
                    }
               },
               fail: function(res) {
                    wx.hideLoading();
               }
          })
     },

     donationTap: function(e) {
          let that = this;
          if (that.data.ISNOTarget) {
               wx.navigateTo({
                    url: '../donationConfirm/donationConfirm?imgUrl=' + that.data.project.mobileImg + "&prProId=" + mId,
               })
          }
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