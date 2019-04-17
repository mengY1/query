<template>
  <div>

  </div>
</template>
<script>
import { silentlogin, access_token } from "@/utils/api";
import common from "@/utils/common";
export default {
  data() {
    return {
      isIpx: false
    };
  },
  mounted() {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code);
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      }
    });
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        var name = "iPhone X";
        if (res.model.indexOf(name) > -1) {
          self.isIpx = true;
        } else {
          self.isIpx = false;
        }
      }
    });
    var that = this;
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate, "是否有新版本");
    });
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否马上重启小程序？",
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    // 查看是否授权
    console.log("小程序初始加载");
    // setTimeout(() => {
    wx.getSetting({
      success: function(res) {
        res.authSetting["scope.userInfo"];
        if (
          wx.getStorageSync("userInfo").code
        ) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已经授权");
          if (wx.getStorageSync("query_silentlogin").token) {
          }
          wx.getUserInfo({
            success: function(res) {
              console.log("拿到用户信息", res.userInfo);
            }
          });
        } else {
          setTimeout(() => {
            console.log("进入授权页面");
            wx.navigateTo({
              url: "/pages/login/login/login"
            });
          }, 100);
        }
      }
    });
  },
  methods: {
    refreshToken() {
      if (!wx.getStorageSync("query_silentlogin").refresh_token) {
        wx.navigateTo({
          url: "/pages/login/login/login"
        });
      }
    },
  }
};
</script>
<style lang="scss" >
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>

