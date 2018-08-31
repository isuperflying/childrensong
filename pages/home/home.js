const app = getApp()

var baseUrl = 'http://192.168.80.97:8888/'

var list = null
var page = 1
var pSize = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'images/',
    base_video_url: baseUrl + 'video/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '视频列表',
    })
    this.loadData();
  },

  onShow: function(e) {

  },

  loadData: function() {
    var that = this
    let url = baseUrl + 'hotvideo'
    wx.request({
      url: url,
      data: {
        'typeid':0
      },
      method: 'GET',
      success: function(result) {
        console.log(result.data.data)
        that.setData({
          videolist: result.data.data
        })
      }
    })
  },
  
  onReachBottom: function(e) {
    this.loadData();
  },

  videodetail: function(e) {
    console.log(e.currentTarget.dataset.item)

  },
  
  onShareAppMessage: function() {

  }
})