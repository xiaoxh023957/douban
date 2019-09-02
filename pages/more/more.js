var { getMovieListData } = require("../../utils/util.js")
var app=getApp()
Page({

  data: {
    data:{},
    requestUrl:"",
    start:0,
    movies:[],
    isEnd:false,
    loading:true
  },


  onLoad: function (options) {

    wx.showNavigationBarLoading();
 
    var baseUrl = app.G_Data.baseUrl;
    var requestUrl = baseUrl + (options.urls) ;
    var This = this;
    this.data.requestUrl = requestUrl;

    getMovieListData(requestUrl, this.handleMovieList);
      
     wx.setNavigationBarTitle({
       title: options.tags,
     })
    
  },

  handleMovieList: function (data) {
    if(data.length==0){
      this.data.isEnd=true,
      wx.showToast({
        title: '数据已经加载完啦!',
      })
      return;
    }
    this.data.start += data.length;
    this.data.movies=this.data.movies.concat(data);
    this.setData({
      data: this.data.movies,
      loading: false
    })
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var This=this;
    getMovieListData(this.data.requestUrl,function(data){
      This.setData({
        data
      })
    } )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isEnd){
      wx.showToast({
        title: '数据已经加载完啦!',
      })
      return;
    }
    var nextUrl =this.data.requestUrl+`?start=${this.data.start}&count=20`;
    wx.showNavigationBarLoading();

    getMovieListData(nextUrl,this.handleMovieList)

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    this.data.start += data.length;

    this.setData({
      data: data,
      loading: false
    })
    wx.hideNavigationBarLoading();
  },

  tap(e) {
    var sendId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${sendId}`,
    })
  },
})