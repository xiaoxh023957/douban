// pages/user/user.js
var { coverStarToArray } = require("../../utils/util.js")
Page({
  data: {
    avatarUrl:"",
    nickName:"未登录账号！"
  },

  onLoad: function (options) {
    var This =this;
    var collection = wx.getStorageSync("movieCollection");

    var collectionKey = Object.keys(collection);

    this.loadDtail(collectionKey.map((item) => { return item }))

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
  loadDtail(id) {
    var This = this;
    wx.showLoading({
      title: '正在加载详情....',
    });


    wx.request({

      url: `https://douban.uieee.com/v2/movie/subject/${id}`,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {

        This.setData({

          data: {
            title: res.data.title,
            coverImg: res.data.images.large,
            score: res.data.rating.average,
            star: coverStarToArray(res.data.rating.stars),
            id: res.data.id
          },
          loading: false
        });
        wx.hideLoading()
      },

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
   

})