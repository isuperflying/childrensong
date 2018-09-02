const app = getApp()

var baseUrl = 'http://192.168.80.97:8888/'

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
      title: options.type_name + '儿歌',
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
        'page':page,
        'typeid': typeid
      },
      method: 'POST',
      success: function (result) {
        console.log(result.data.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (page == 1) {
          list = result.data.data;
        } else {
          if (list != null) {
            list = list.concat(result.data.data);
          }
        }

        that.setData({
          videolist: list
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  onPullDownRefresh: function () {
    list = null
    this.data.videolist = null
    this.loadData()
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    page++;
    this.loadData();
  },

  videodetail: function (e) {
    var obj = e.currentTarget.dataset.item
    var video_item = JSON.stringify(obj);
    wx.navigateTo({
      url: '/pages/videodetail/videodetail?video_item=' + video_item
    })
  },

  onShareAppMessage: function () {

  }
})