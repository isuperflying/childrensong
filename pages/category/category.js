const app = getApp()

var baseUrl = 'https://www.antleague.com/'

var list = null
var page = 1
var pSize = 20
var typeid
var isEnd = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'smallimgs/',
    base_video_url: baseUrl + 'videos/',
    is_end: isEnd,
    app_id:"wx572fce5031dcef34"
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
      title: options.type_name + '儿歌',
    })
    page = 1
    typeid = options.typeid
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

  loadData: function() {
    var that = this
    let url = baseUrl + 'querybyage'
    wx.request({
      url: url,
      data: {
        'page': page,
        'typeid': typeid
      },
      method: 'POST',
      success: function(result) {
        console.log(result.data.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (page == 1) {
          list = result.data.data;
        } else {
          if (list != null) {
            list = list.concat(result.data.data);
          }
          if (result.data.data.length < 20){
            isEnd = true
          }

          that.setData({
            is_end: isEnd
          })
        }

        that.setData({
          videolist: list
        })
      },
      fail: function(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  onPullDownRefresh: function() {
    list = null
    page = 1
    this.data.videolist = null
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!isEnd){
      wx.showLoading({
        title: '加载中',
      })
      page++;
      this.loadData();
    }
  },

  videodetail: function(e) {
    var obj = e.currentTarget.dataset.item
    var video_item = JSON.stringify(obj);
    wx.navigateTo({
      url: '/pages/videodetail/videodetail?video_item=' + video_item
    })
  },

  onShareAppMessage: function() {
    return {
      title: '儿歌乐园，宝宝的快乐源泉!',
      path: '/pages/home/home',
      imageUrl: '/images/share_img.png'
    }
  }
})