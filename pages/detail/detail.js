// pages/detail/detail.js
var { coverStarToArray} = require("../../utils/util.js")
Page({

  data: {
    loading:true,

    idData:[]
  },

  onLoad: function (options) {
    var movieId = options.id;
    this.data.colId = movieId;
 
    //获取详细数据
   this.loadDtail(movieId);
    


    // 设置收藏状态
    var collection = wx.getStorageSync("movieCollection");
    var isCollected=false;
    if (collection){
      isCollected = collection[movieId];
    }else{
        var data = {};
      data[movieId]=false;
      wx.setStorageSync("movieCollection", data)
    }
    this.setData({
      isCollected: isCollected
    })
  },

  loadDtail(id){
    var This = this;
    let historyData=[];
    
    wx.showLoading({
      title: '正在加载详情....',
    });
    wx.request({
        url: `https://douban.uieee.com/v2/movie/subject/${id}`,
        header: {
          "Content-Type": "json"
        },
        success:function(res){  
          var oldHistoryMovie = wx.getStorageSync("historyMovie");
          if (oldHistoryMovie){
            historyData = oldHistoryMovie;
            if (historyData.indexOf(res.data.id)==-1){
              historyData.unshift(res.data.id);
            }
            var historyMovie = wx.setStorageSync("historyMovie", historyData);
          }else{
            historyData.unshift(res.data.id);
            var historyMovie = wx.setStorageSync("historyMovie", historyData);
          }
          
          console.log(historyData)
        
         
            This.setData({
              detail:{
                trailer: res.data.trailer_urls[0],
                blooper: res.data.blooper_urls[0],
                coverImg: res.data.images.large,
                title: res.data.title,
                pubdate: res.data.pubdate,
                genres: res.data.genres,
                director: res.data.directors[0].name,
                casts: res.data.casts,
                score: res.data.rating.average,
                star: coverStarToArray(res.data.rating.stars),
                summary: res.data.summary
              },  
              loading: false
            });
       
          wx.hideLoading()
        }, 
     
      })
  
  },

  // 处理收藏
  tapCollect:function(){
    var collection = wx.getStorageSync("movieCollection");
    var isCollected = collection[this.data.colId] ;
    //设置storage中的值
    collection[this.data.colId] = !isCollected;

    wx.setStorageSync("movieCollection", collection)
    //设置页面图片显示
    this.setData({
      isCollected: !isCollected
    })

    wx.showToast({
      title: isCollected ? "取消收藏":"收藏成功",
    })
  },

  // 处理分享
  tapShare:function(){
    var itemList = ["分享到朋友圈","发送给好友","分享到QQ","分享到微博"];
    wx.showActionSheet({
      itemList:itemList,
      success(res){
        wx.showToast({
          title: '成功'+itemList[res.tapIndex]
        })
      }
    })
  }

})
