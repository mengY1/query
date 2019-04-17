<template>
  <div class="reservationPage">
    <z-head text="奇集查询"></z-head>
    <div class="reservationImg"><img src="/static/images/yuyuechaxun@2x.png" alt=""></div>
    <p>预约成功</p>
    <h3>我们会第一时间以短信形式告知你考试成绩</h3>
    <h2 @click="onSee">查看复试技巧</h2>
    <div class="buttonBox">
      <div><button @click="onPaint">分享你专属的考研海报</button></div>
    </div>
  </div>
</template>
<script>
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      url: url.url,
      title: "2019硕士研究生考试（初试）",
      inquire: "预约"
    };
  },
  methods: {
    //分享朋友圈海报
    onPaint() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "分享你专属的考研海报",
          title: this.title,
          query_site_status: this.inquire
        });
      }
      console.log(1);
      this.img = [];
      var a =
        this.url +
        "/img/score_query/ky_poster" +
        Math.floor(Math.random() * 9 + 1) +
        ".jpg";
      console.log(a, 999);
      this.img.push(a);
      wx.previewImage({
        urls: this.img,
        success: res => {
          console.log("成功");
          console.log(res);
        },
        fail: res => {
          console.log(res);
          wx.showModal({
            title: res,
            duration: 2000
          });
        }
      });
    },
    //查看复试技巧
    onSee() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "查看复试技巧",
          title: this.title,
          query_site_status: this.inquire
        });
      }
      wx.navigateToMiniProgram({
        appId: "wx99418b7b5cdcc4d4", // 要跳转的小程序的appid
        path: "pages/index/index?score_learn=1" + "&university_id=8", // 跳转的目标页面
        extarData: {
          foo: "bar"
        },
        envVersion: "develop",
        success(res) {
          console.log("成功");
        }
      });
    }
  },

  //分享给好友
  onShareAppMessage(res) {
    var title = wx.getStorageSync("query_silentlogin");
    this.title = title.nickname;
    return {
      title: this.title + "在奇集查询查考研成绩，一起来看看吧",
      path: "pages/home/home/home",
      imageUrl:
        "https://cdn.54qj.com/img/qiji_Inquire/base/images/reservation.png"
    };
  }
};
</script>
<style lang="scss" scoped>
.reservationPage {
  // .rules {
  //   height: 128rpx;
  //   background-color: #fff;
  // }
  .reservationImg {
    width: 297rpx;
    height: 258rpx;
    flex-shrink: 0;
    margin: 0 auto;
    margin-top: 134rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    margin-top: 39rpx;
  }
  h3 {
    text-align: center;
    font-size: 28rpx;
    color: #999999;
    margin-top: 17rpx;
  }
  h2 {
    font-size: 32rpx;
    color: #331900;
    margin-top: 330rpx;
    text-decoration: underline;
    text-align: center;
  }
  .buttonBox {
    height: 148rpx;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.12);
    > div {
      margin: 30rpx 136rpx;
      height: 88rpx;
      background: rgba(255, 185, 12, 1);
      border-radius: 44rpx;
      button {
        background-color: transparent;
        color: #331900;
        font-size: 36rpx;
        line-height: 88rpx;
        &::after {
          border: none;
        }
      }
    }
  }
}
</style>
