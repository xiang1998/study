//app.js
const apiUrl = 'https://www.cloudfamilypinyi.com/';
App({
  onLaunch: function () {
    this.checkUpdateAndUpdate();
  },
  ajax: {
    post(path, data, callback, options) {
      this._wxReq('POST', path, data, callback, options);
    },
    get(path, data, callback, options) {
      this._wxReq('GET', path, data, callback, options);
    },
    _wxReq: (method, path, data, callback, options = {}) => {
      wx.request({
        url: apiUrl + path,
        method,
        header: options.header || {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data,
        success(res) {
          console.log(path, '请求成功', res.data)
          callback(null, res)
        },
        fail(err) {
          console.log(path, '请求失败', err)
          callback(err)
        }
      })
    }
  },	
  // 检查是不是有新版本了
  checkUpdateAndUpdate() {
    if (!wx.getUpdateManager) return
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function () {
      // 请求完新版本信息的回调
      console.log('check update');
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '应用已更新，请重启应用！',
        showCancel: false,
        confirmText: '重启应用',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })

    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.error('新版小程序下载失败')
    })
  },
  
  globalData: {
    apiUrl
  }
})