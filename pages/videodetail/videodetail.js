
var baseUrl = 'http://192.168.1.104:8888/'

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
    }
    this.setData({
      cover: baseUrl + 'images/' + videoObj.video_fover,
      video_url: baseUrl + 'videos/' + videoObj.local_video_url,
      video_title: videoObj.video_title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})