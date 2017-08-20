// postDetail.js
var Bmob = require('../../utils/bmob.js');
var that
Page({

  data: {
    bookISBN: '',
    bookImg: '',
    bookName: '',
    bookAuthor: '',
    bookPress: '',
    bookPrice: '',

    isTextbook: false,
    courseName: '',
    currentPrice: '',
    condition: '',
    updatedAt: '',
    campus: '',
    postRemark: '',

    ownerId: '',
    ownerNickname: '',
    ownerGender: '',
    ownerWechat: '',
    ownerQQ: '',
    ownerPhone: '',
    ownerCollege: '',
    ownerPostCount:0

  },

  onLoad: function (options) {
    that = this
    this.setData({
      bookISBN: options.bookISBN,
      bookName: options.bookName,
      bookAuthor: options.bookAuthor,
      bookPress: options.bookPress,
      bookPrice: options.bookPrice,
      bookImg: options.bookImg,
      isTextbook: options.isTextbook,
      courseName: options.courseName,
      currentPrice: options.currentPrice,
      condition: options.condition,
      updatedAt: options.updatedAt,
      campus: options.campus,
      postRemark: options.postRemark,
      ownerId: options.ownerId
    });
    var User = Bmob.Object.extend("_User");
    var query = new Bmob.Query(User);
    query.get(that.data.ownerId, {
      success: function (result) {
        that.setData({
          ownerPic: result.get("userPic"),
          ownerNickname: result.get("nickName"),
          ownerGender: result.get("gender"),
          ownerWechat: result.get("wechatId"),
          ownerQQ: result.get("QQ"),
          ownerPhone: result.get("mobliePhoneNumber"),
          ownerCollege: result.get("college"),
          ownerEntryYear: result.get("entryYear"),
          ownerEducation:result.get("education")
        })
      },
      error: function (object, error) {
        console.log('获取发布者失败', error)
      }
    });
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("ownerId", this.data.ownerId);
    query.count({
      success: function (count) {
        that.setData({
          ownerPostCount: count
        })
      },
      error: function (error) {
        // 查询失败
      }
    });

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

  },

  navToUserHomePage:function(){
    wx.navigateTo({
      url: '../userHomepage/userHomepage?ownerId={{ownerId}}'
    })
  }
})