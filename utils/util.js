
function coverStarToArray(star){
  var starArr= [];
  var fNum=star.toString().substring(0,1);
  var sNum = (parseInt(star) - parseInt(fNum + "0"))/10;
  if (sNum != 0.5 && fNum== 0) {
    starArr.push(0);
  } else {
    starArr.push(0.5);
  } 
  for(var i=1;i<5;i++){
    if (i <= fNum){
      starArr.push(1);
    }else{
      starArr.push(0);
    }
  }
  
  return starArr.sort(function(a,b){
    return b-a;
  });
};

function getMovieListData(url, success) {
  wx.showLoading({
    title: '正在加载...',
  })
  wx.request({
    url: url,
    header: {
      "Content-Type": "json"
    },
    success(res){
    success(formatData(res.data));
      wx.hideLoading();
    }
  })

};
function formatData(data) {
  var newData = data.subjects.map((item) => {
    return { title: item.title, coverImg: item.images.large, score: item.rating.average, star: coverStarToArray(item.rating.stars), id: item.id };
  })
  return newData;
};


module.exports = {
  coverStarToArray: coverStarToArray, 
  getMovieListData: getMovieListData,

}