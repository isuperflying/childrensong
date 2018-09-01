const app = getApp()

var baseUrl = 'http://192.168.1.104:8888/'

var list = null
var page = 1
var pSize = 20
var typeid
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
    wx.setNavigationBarTitle({
      title: '儿歌乐园',
    })
    typeid = options.typeid
    this.loadData();
  },

  onShow: function (e) {

  },

  loadData: function () {
    var that = this
    let url = baseUrl + 'querybyage'
    wx.request({
      url: url,
      data: {
        'typeid': typeid
      },
      method: 'POST',
      success: function (result) {
        console.log(result.data.data)
        that.setData({
          videolist: result.data.data
        })
      }
    })
  },

  onReachBottom: function (e) {
    this.loadData();
  },

  videodetail: function (e) {
    //console.log(e.currentTarget.dataset.item)
    var obj = e.currentTarget.dataset.item
    var video_item = JSON.stringify(obj);
    wx.navigateTo({
      url: '/pages/videodetail/videodetail?video_item=' + video_item
    })
  },

  onShareAppMessage: function () {

  }
})