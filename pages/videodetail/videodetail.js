
var baseUrl = 'http://192.168.80.97:8888/'

var videoObj
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'images/',
    base_video_url: baseUrl + 'videos/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.video_item)
    if (options.video_item){
      videoObj = JSON.parse(options.video_item);
      wx.setNavigationBarTitle({
        title: videoObj.video_title,
      })
    }

    this.setData({
      cover: baseUrl + 'images/' + videoObj.video_fover,
      video_url: baseUrl + 'videos/' + videoObj.local_video_url,
      video_title: videoObj.video_title
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: '儿歌乐园，宝宝快乐的源泉!',
      path: '/pages/home/home',
      imageUrl: that.data.cover || '/images/share_img.png'
    }
  }
})