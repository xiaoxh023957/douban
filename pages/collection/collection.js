// pages/collection/collection.js

var {coverStarToArray}=require("../../utils/util.js")
Page({


  data: {
      data:{},
      movies:[],
      loading:true
  },


  onLoad: function (options) {
    var This=this;
    var collection=  wx.getStorageSync("movieCollection");

    var collectionKey = Object.keys(collection);

    this.loadDtail(collectionKey.map((item)=>{ return item}))

     wx.setNavigationBarTitle({
       title: '收藏夹',
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

  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tap(e) {
    var sendId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sendId}`,
    })
  },
})