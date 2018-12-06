// pages/activeCenter/activeCenter.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          stateList: ['全部', '进行中', '已结束'],
          common_row: {
               caption_class: 'caption',
               value_class: 'value'
          },
          selectedIndex: 0,

          //数据列表数组
          projectAll: undefined,
          projectTodo: undefined,
          projectDone: undefined,

          //是否可以上拉加载
          allLoadEnable: false,
          todoLoadEnable: false,
          doneLoadEnable: false,

          //数据为空或请求失败的提示语
          allEmpty: '全部活动为空',
          todoEmpty: '进行中活动为空',
          doneEmpty: '已结束活动为空',
     },

     swiperChange: function(e) {
          var detailIndex = e.detail.current;
          var source = e.detail.source;
          if (this.selectedIndex != detailIndex && source == 'touch') {
               this.setData({
                    selectedIndex: detailIndex
               });
          }
     },

     turnPage: function(e) {
          var that = this;
          var dataIndex = e.currentTarget.dataset.index;
          if (this.data.selectedIndex != dataIndex) {
               this.setData({
                    selectedIndex: dataIndex
               });
          } else {
               if (this.data.selectedIndex == 0) {
                    this.setData({
                         projectAll: null
                    });
                    wx: setTimeout(function() {
                         that.setData({
                              projectAll: [],
                         });
                    }, 2000);
               } else if (this.data.selectedIndex == 1) {
                    this.setData({
                         projectTodo: null
                    });
                    wx: setTimeout(function() {
                         that.setData({
                              projectTodo: [],
                         });
                    }, 2000);
               } else if (this.data.selectedIndex == 2) {
                    this.setData({
                         projectDone: null
                    });
                    wx: setTimeout(function() {
                         that.setData({
                              projectDone: [],
                         });
                    }, 2000);
               }
          }
     },

     /**
      * 搜索订单
      */
     searchEvent: function(e) {
          var that = this;

          this.setData({
               projectAll: null,
               projectTodo: null,
               projectDone: null
          });

          wx: setTimeout(function() {
               that.setData({
                    projectAll: [],
                    projectTodo: [],
                    projectDone: []
               });
          }, 2000);
     },
     /**
      * 搜索框输入监听
      */
     inputListener: function(e) {

     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          var that = this;
          wx: setTimeout(function() {
               that.setData({
                    projectAll: [],
                    projectTodo: [],
                    projectDone: []
               });
          }, 2000);
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