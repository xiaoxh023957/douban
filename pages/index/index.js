// pages/index/index.js 

var { getMovieListData} = require("../../utils/util.js")
var app=getApp()
Page({

  data: {
    inLoading:true,
    soonLoading: true,
    topLoading: true
  },
  onLoad: function (options) {
    var This = this;
    var baseUrl = app.G_Data.baseUrl;
    var inTheatersUrl = baseUrl +"in_theaters?start=0&count=3";
    var comingSoonUrl = baseUrl + "coming_soon?start=0&count=3";
    var top250Url = baseUrl +"top250?start=0&count=3"
    getMovieListData(inTheatersUrl, function (data) {  
      This.setData({
        inTheatersData: data,
        inTheatersTag: "正在热映",
        inTheatersUrl:"in_theater",
        inLoading:false
      })
    });
   getMovieListData(comingSoonUrl,function(data){         
          This.setData({
              comingSoonData: data,
              comingSoonTag:"即将上映",
              comingSoonUrl: "coming_soon",
            soonLoading: false
          })
   });

    getMovieListData(top250Url, function (data) {
      This.setData({
        top250Data: data,
        top250Tag: "豆瓣Top250",
        top250Url:"top250",
        topLoading: false

      })
    })
  },


  tap(e) {
   var sendId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sendId}`,
    })
  },

  more(e){
    var sendUrls = e.currentTarget.dataset.urls;
    var sendTags = e.currentTarget.dataset.tags;
    wx.navigateTo({
      url: `/pages/more/more?urls=${sendUrls}&tags=${sendTags}`,
    })

  }

})