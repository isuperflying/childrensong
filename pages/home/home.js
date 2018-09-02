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
    base_video_url: baseUrl + 'videos/',
    banner: [{ 'img_url': '../../images/banner.png' }],
    ageslist: [{
        'type':'1',
        'img_url': '../../images/0-1.png',
        'title': '0-1岁'
      },
      {
        'type': '2',
        'img_url': '../../images/1-2.png',
        'title': '1-2岁'
      },
      {
        'type': '3',
        'img_url': '../../images/2-3.png',
        'title': '2-3岁'
      },
      {
        'type': '4',
        'img_url': '../../images/3-4.png',
        'title': '3-4岁'
      },
      {
        'type': '5',
        'img_url': '../../images/4-5.png',
        'title': '4-5岁'
      },
      {
        'type': '6',
        'img_url': '../../images/5-6.png',
        'title': '5-6岁'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '儿歌乐园',
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
        'typeid': 0
      },
      method: 'GET',
      success: function(result) {
        wx.stopPullDownRefresh();
        console.log(result.data.data)
        that.setData({
          videolist: result.data.data
        })
      },
      fail: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    this.data.videolist = null
    this.getData()
  },

  // onReachBottom: function(e) {
  //   this.loadData();
  // },

  videodetail: function(e) {
    //console.log(e.currentTarget.dataset.item)
    var obj = e.currentTarget.dataset.item
    var video_item = JSON.stringify(obj);
    wx.navigateTo({
      url: '/pages/videodetail/videodetail?video_item=' + video_item
    })
  },

  banner:function(e){
    var typeid = 1
    var type_name = '热门'
    wx.navigateTo({
      url: '/pages/category/category?typeid=' + typeid + '&type_name=' + type_name
    })
  },
  category:function(e){
    var typeid = e.currentTarget.dataset.typeid
    var type_name = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/category/category?typeid=' + typeid + '&type_name=' + type_name
    })
  },

  onShareAppMessage: function () {
    return {
      title: '儿歌乐园，宝宝快乐的源泉!',
      path: '/pages/home/home',
      imageUrl: '/images/share_img.png'
    }
  }
})