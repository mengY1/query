<template>
  <div style="margin-top:150rpx">
    <header>
      <div class="logo">
        <img src="/static/images/logo.png" alt="">
      </div>
    </header>
    <div class="content">
      <div v-show="status==10">
        <span>需要你的授权奇集成绩查询才能为你提供服务</span>
        <span>获取你的公开信息(头像，昵称等)</span>
      </div>
      <div v-show="status==20">
        <span>你还没给奇集成绩查询授权</span>
      </div>
    </div>
    <button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" @click="changeVal">{{status==10?"授权登录":"重新授权"}}</button>
  </div>
</template>
<script>
import { silentlogin } from "@/utils/api";
export default {
  data() {
    return {
      value: 1,
      status: 10 //10未授权 20拒绝授权
    };
  },
  mounted() {},
  updated() {},
  methods: {
    changeVal() {
      this.value = 1;
    },
    bindGetUserInfo() {
      var that = this;
      this.value = 1;
      wx.login({
        success: function(res) {
          var code = res.code;
          //用户信息授权
          wx.getUserInfo({
            lang: "zh_CN",
            success: function(res) {
              console.log(res);
              let data = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code,
              };
              wx.setStorageSync("userInfo", data);
              that.value = 111;
              silentlogin(data).then(function(res) {
                // wx.setStorageSync("unionid", res.unionid);
                console.log(res);
                if (res.auth) {
                  let msg = {
                    nickname: res.nickname,
                    unionid: res.unionid,
                    avatar: res.avatar,
                    user_id: res.user_id,
                    token: res.auth.access_token,
                    openid: res.openid,
                    refresh_token: res.auth.refresh_token
                  };
                  wx.setStorageSync("query_silentlogin", msg);
                  wx.setStorageSync("refreshIndex", 20)
                  setTimeout(() => {
                    wx.navigateBack({
                      success: function() {
                        delta: 0;
                      }
                    });
                  }, 500);
                }
                else {
                  let msg = {
                    nickname: res.nickname,
                    unionid: res.unionid,
                    avatar: res.avatar,
                    user_id: res.user_id,
                    openid: res.openid
                  };
                  wx.setStorageSync("query_silentlogin", msg);
                  wx.setStorageSync("refreshIndex", 20)
                  setTimeout(() => {
                    wx.navigateBack({
                      success: function() {
                        delta: 0;
                      }
                    });
                  }, 500);
                }
              });
            },
            fail: function(res) {
              that.status = 20;
            }
          });
        }
      });
    },
  },
  onUnload: function() {
    if (this.value == 1) {
      wx.navigateBack({
        success: function() {
          delta: -1;
        }
      });
    }
  }
};
</script>
<style>
header .logo {
  margin: 100rpx auto 0;
  width: 198rpx;
  height: 198rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  text-align: center;
  padding-top: 20rpx;
}
header .logo img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
}
.content {
  text-align: center;
  margin-top: 47rpx;
}
.content span {
  display: block;
  color: #333333;
  font-size: 32rpx;
  line-height: 48rpx;
}
.bottom {
  border-radius: 80rpx;
  margin: 0 auto;
  margin-top: 52rpx;
  font-size: 35rpx;
  width: 690rpx;
  height: 88rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
}
</style>

