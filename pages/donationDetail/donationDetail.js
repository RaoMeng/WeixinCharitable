var app = getApp();

Page({

     /**
      * 页面的初始数据
      */
     data: {
          dataArray: [],
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          this.loadData();
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
      *选择转 
      */
     selectAtion: function(res) {
          console.log(res);

          var dic = this.data.dataArray.projectRecodeList[res.currentTarget.id]
          console.log(dic.proId);

     },
     /**
      * 获取数据
      */
     loadData: function() {
          var that = this;
          wx.request({
               url: 'https://lj.ubtob.com/app/donateDetail/' + app.globalData.imid, //这个要登录获取imid
               data: {},
               header: {
                    'content-type': 'application/json',
               },
               success: function(res) {
                    console.log(res);
                    var newDic = res.data;
                    var sumj = res.data.sumJoin;
                    var sumP = res.data.sumMoney;

                    newDic.sumMoney = sumP.toFixed(2);
                    for (var i = 0; i < res.data.projectRecodeList.length; i++) {
                         var dic = newDic.projectRecodeList[i];
                         console.log('dic', dic);
                         if (dic.project.overdue == '进行中') {
                              newDic.projectRecodeList[i].nameColor = '#00ab18';
                         } else {
                              newDic.projectRecodeList[i].nameColor = 'rgb(163, 163, 163)';
                         }

                    }

                    that.setData({
                         dataArray: newDic,

                    })
               },
               fail: function(e) {
                    console.log('fail');

               }
          })

     }
})