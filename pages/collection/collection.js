// pages/collection/collection.js

var { coverStarToArray, getListData}=require("../../utils/util.js")
Page({


  data: {
      data:{},
      movies:[],
      loading:true,
      collect:'',
  },


  onLoad: function (options) {

    var This=this;

    var collection=  wx.getStorageSync("movieCollection");

    var collectionValue = Object.values(collection);

    var collectionKey = Object.keys(collection);

    var len = collectionValue.length;

    for (var i = 0; i < len;i++){

      if (collectionValue[i]){ 

        var iKey = collectionKey[i];
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
     wx.setNavigationBarTitle({
       title: '收藏夹',
     })
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