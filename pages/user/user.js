// pages/user/user.js
var { coverStarToArray, getListData } = require("../../utils/util.js")
Page({
  data: {
    avatarUrl:"", 
    data: {},
    movies: [],
    loading:true,
    nickName:"未登录账号！"
  },

  onLoad: function (options) {
    var This = this;
    var historyMovie = wx.getStorageSync("historyMovie");
    var len = historyMovie.length

    for (var i = 0; i < len; i++) {

      if (historyMovie[i]) {
        var iKey = historyMovie[i];
        var requestUrl = `https://douban.uieee.com/v2/movie/subject/${iKey}`;

        getListData(requestUrl, function (data) {
          This.data.movies.unshift(data);
          This.setData({
            data: This.data.movies,
            loading: false,
        
          })
          wx.hideNavigationBarLoading();
        });
      
      }
    }

      wx.getUserInfo({
        success: function(res) {
          This.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
        },
      })
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },












  
  bindGetUserInfo() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
          })
        }

      }
    });
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    });
  },

  tap(e) {
    var sendId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sendId}`,
    })
  },
   

})