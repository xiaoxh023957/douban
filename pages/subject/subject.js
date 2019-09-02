// pages/subject/subject.js
Page({


  data: {
    typeList:[
      {
        type:"爱情",
        url:"../../assets/image/aiqing.png"
      },
      {
        type: "动画",
         url:"../../assets/image/donghua.png"
      },
      {
        type: "动作",
         url:"../../assets/image/dongzuo.png"
      },
      {
        type: "科幻",
         url:"../../assets/image/kehuan.png"
      },
      {
        type: "喜剧",
         url:"../../assets/image/xiju.png"
      }
    ]
  },

  
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '分类',
    })
  },

  type(e) {
   
    var sendTags = e.currentTarget.dataset.tags;
    console.log(e.currentTarget)
    wx.navigateTo({
      url: `/pages/subject-detail/subject-detail`,
    })
  },

})