var app = getApp();

const advertisesUrl = "https://lj.ubtob.com/app/appIndex";
const activeUrl = "https://lj.ubtob.com/app/projects";

var mAllArea = [];
var mCarouselList = [];
var mProjectList = [];
var mTotalMoney = 0;
var mTotalPerson = 0;
var selectedIndex = 0;
var isAdvertiseSuccess = false,
     isProjectSuccess = false;

var HomeAdvertise = function(id, imageSrc, webUrl) {
     this.id = id;
     this.imgSrc = imageSrc;
     this.webUrl = webUrl;
};

var DonationProject = function() {};

Page({

     /**
      * 页面的初始数据
      */
     data: {
          homeAdvertises: [],
          areaList: ['全部'],
          selectedIndex: 0,
          numberArray: [],
          personArray: [],
          activeList: []
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          wx.showLoading({
               title: '正在加载',
          })
          this.initHomeData();
         
     },

     initHomeData: function() {
          let that = this;
          // 获取轮播图
          wx.request({
               url: advertisesUrl,
               success: function(res) {
                    isAdvertiseSuccess = true;
                    if (isProjectSuccess && isAdvertiseSuccess) {
                         wx.hideLoading();
                         wx.stopPullDownRefresh();
                    }
                    that.analysisIndex(res);
               },
               fail: function(res) {
                    isAdvertiseSuccess = true;
                    if (isProjectSuccess && isAdvertiseSuccess) {
                         wx.hideLoading();
                         wx.stopPullDownRefresh();
                    }
                    wx.showToast({
                         title: '轮播图获取失败',
                         duration: 2000
                    })
               }
          })
          // 获取项目列表
          this.getProjectList();
     },

     getProjectList: function() {
          let that = this;
          wx.request({
               url: activeUrl,
               method: 'GET',
               data: {
                    area: that.data.areaList[that.data.selectedIndex],
                    search: ''
               },
               success: function(res) {
                    isProjectSuccess = true;
                    if (isProjectSuccess && isAdvertiseSuccess) {
                         wx.hideLoading();
                         wx.stopPullDownRefresh();
                    }
                    that.analysisProjects(res);
               },
               fail: function(res) {
                    isProjectSuccess = true;
                    if (isProjectSuccess && isAdvertiseSuccess) {
                         wx.hideLoading();
                         wx.stopPullDownRefresh();
                    }
                    wx.showToast({
                         title: '列表数据获取失败',
                         duration: 2000
                    })
               }
          })
     },

     analysisProjects: function(res) {
          console.log(res);
          let that = this;
          let dataRes = res.data;
          if (dataRes != undefined) {
               mProjectList = [];
               let projectList = dataRes.projectList;
               if (projectList != undefined) {
                    for (let i = 0; i < projectList.length; i++) {
                         let projectObject = projectList[i];
                         let donationProject = new DonationProject();

                         donationProject.listImg = projectObject.listImg;
                         donationProject.pcImg = projectObject.pcImg;
                         donationProject.name = projectObject.name;
                         donationProject.proSummary = projectObject.proSummary;
                         donationProject.target = projectObject.target;
                         donationProject.totalAmount = projectObject.totalAmount;
                         donationProject.id = projectObject.id;
                         donationProject.overdue = projectObject.overdue;
                         donationProject.area = projectObject.area;
                         donationProject.progress = (projectObject.totalAmount / projectObject.target) * 100;
                         donationProject.remainMoney = ((projectObject.target - projectObject.totalAmount) / 10000).toFixed(2);

                         mProjectList.push(donationProject);
                    }
                    that.setData({
                         activeList: mProjectList
                    });
               }
          }
     },

     homeAdvertisesTap: function(e) {
          let position = e.currentTarget.dataset.index;
          let url = "https://lj.ubtob.com/mobile#/project/detail/" + mCarouselList[position].id + '/' + app.globalData.imid;
          wx.navigateTo({
            url: '../projectDetail/projectDetail?id=' + mCarouselList[position].id ,
          })
     },

     donationTap: function(e) {
          let position = e.currentTarget.dataset.position;
          
          wx.navigateTo({
            url: "../donationConfirm/donationConfirm?imgUrl=" + mProjectList[position].pcImg + "&prProId=" + mProjectList[position].id,
          })
     },

     imageTap: function(e) {},

     projectTap: function(e) {
          let position = e.currentTarget.dataset.position;
          let url = "https://lj.ubtob.com/mobile#/project/detail/" + mProjectList[position].id + '/' + app.globalData.imid;
          wx.navigateTo({
               url: '../projectDetail/projectDetail?id=' + mProjectList[position].id,
          })
     },

     areaTap: function(e) {
          let index = e.currentTarget.dataset.index;
          this.setData({
               selectedIndex: index
          });

          wx.showLoading({
               title: '正在加载...',
          })

          this.getProjectList();
     },

     analysisIndex: function(res) {
          let that = this;
          let dataRes = res.data;
          if (dataRes != undefined) {
               mTotalMoney = dataRes.totality.toFixed(2);
               mTotalPerson = dataRes.times;

               let totalMoneyArray = [];
               let totalPersonArray = [];

               let totalMoneyStr = mTotalMoney.toString();
               for (let i = 0; i < totalMoneyStr.length; i++) {
                    totalMoneyArray.push(totalMoneyStr[i]);
               }
               let totalMoneyLength = totalMoneyArray.length;
               if (totalMoneyLength < 9) {
                    for (let j = 0; j < 9 - totalMoneyLength; j++) {
                         totalMoneyArray.unshift('0');
                    }
               }

               let totalPersonStr = mTotalPerson.toString();
               for (let i = 0; i < totalPersonStr.length; i++) {
                    totalPersonArray.push(totalPersonStr[i]);
               }
               let totalPersonLength = totalPersonArray.length;
               if (totalPersonLength < 9) {
                    for (let j = 0; j < 9 - totalPersonLength; j++) {
                         totalPersonArray.unshift('0');
                    }
               }

               let allArea = dataRes.allArea;
               let carouselList = dataRes.carouselList;

               mAllArea = ['全部'];
               mAllArea.push(allArea);

               that.setData({
                    areaList: mAllArea,
                    numberArray: totalMoneyArray,
                    personArray: totalPersonArray
               });

               if (carouselList != undefined) {
                    mCarouselList = [];
                    for (let i = 0; i < carouselList.length; i++) {
                         let carousel = carouselList[i];
                         let webUrl = "";
                         let homeAdvertise = new HomeAdvertise(carousel.id, carousel.pictureUrl, webUrl);

                         mCarouselList.push(homeAdvertise);
                    }
                    that.setData({
                         homeAdvertises: mCarouselList
                    });
               }
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
          this.initHomeData();
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