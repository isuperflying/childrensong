const app = getApp()

var baseUrl = 'https://www.antleague.com/'

var list = null
var page = 1
var pSize = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_id: "wx572fce5031dcef34",
    base_img_url: baseUrl + 'smallimgs/',
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
  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '儿歌乐园',
    })
    wx.showLoading({
      title: '加载中',
    })
    this.loadData();
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('sdk version--->' + res.SDKVersion)
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })
  },

  onShow: function(e) {

  },
  newApp: function (e) {
    if (this.data.isUse) {
      return;
    }
    var that = this
    wx.navigateToMiniProgram({
      appId: that.data.new_app_id
    })
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
        wx.hideLoading()
        wx.stopPullDownRefresh();
        console.log(result.data.data)
        that.setData({
          videolist: result.data.data
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    page = 1
    this.data.videolist = null
    this.loadData()
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
  },

  version: function () {
    var text = '儿歌乐园所有内容都采集于网络,' +
      '仅为网友提供信息交流的平台。儿歌乐园自身不控' +
      '制、编辑或修改任何资源信息。如果正在使用的视频及其他的资源侵犯了你的' +
      '作品著作权，请个人或单位务必以书面的通讯方式向作者' +
      '提交权利通知。本程序一定积极配合下架资源处理。'
    wx.showModal({
      title: '免责申明',
      content: text,
      showCancel: false,
      success: function (res) {
        if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})