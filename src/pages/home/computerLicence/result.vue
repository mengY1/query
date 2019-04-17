<template>
  <div class="queryPage">
    <div class="result">
      <z-head text="查询结果"></z-head>
    </div>
    <div class="queryResult">
      <div class="queryBox">
        <p>2019年3月全国计算机等级考试（NCRE）</p>
        <p>成绩查询结果</p>
        <div class="gradeBox">
          <div>总分：<span>{{computerDetails.score}}</span></div>
          <h5>考试信息</h5>
          <h4>考生姓名：{{computerDetails.name}}</h4>
          <h4>准考证号：{{computerDetails.ticket_number}}</h4>
          <h4>身份证号：{{computerDetails.identity_number}}</h4>
        </div>
      </div>
    </div>
    <div class="queryImg">
      <img src="/static/images/computerLicence.png" alt="">
    </div>
    <div class="buttonBox">
      <div @click="onSee"><button>查看计算机比赛活动</button></div>
      <button class="iconBox" open-type="share" @click="share"><i class="iconfont icon-Activity_details_sha"></i></button>
      <div class="iconBox" @click="onPaint"><i class="iconfont icon-Activity_details_rin"></i></div>
    </div>
  </div>
</template>
<script>
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      computerDetails: "",
      url: url.url,
      title: "2019年3月全国计算机等级考试（NCRE）",
      inquire: "查询"
    };
  },
  onLoad() {
    this.computerDetails = wx.getStorageSync("computerInfo");
    // this.status = this.computerDetails.site_status;
  },
  methods: {
    //查看计算机比赛活动
    onSee() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "查看计算机比赛活动",
          title: this.title,
          query_site_status: this.inquire
        });
      }
      wx.navigateToMiniProgram({
        appId: "wx99418b7b5cdcc4d4", // 要跳转的小程序的appid
        path: "pages/index/university/detail?university_id=37", // 跳转的目标页面
        extarData: {
          foo: "bar"
        },
        envVersion: "develop",
        success(res) {
          console.log("成功");
        }
      });
    },
    //分享朋友圈海报
    onPaint() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "分享朋友圈",
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
    share() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "分享好友",
          title: this.title,
          query_site_status: this.inquire
        });
      }
    }
  },
  //分享给好友
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "奇集查询-计算机成绩查询",
      path: "pages/home/home/home?channel=friends",
      imageUrl: this.url + "/img/qiji_Inquire/base/images/computer.png"
    };
  }
};
</script>
<style lang="scss" scoped>
.queryPage {
  .result {
    background-color: #ffb90c;
    height: 379rpx;
  }
  .queryResult {
    margin: 0 50rpx;
    position: relative;
    top: -190rpx;
    .queryBox {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20rpx 0px rgba(147, 147, 147, 0.21);
      border-radius: 8rpx;
      padding: 33rpx 69rpx 37rpx 69rpx;
      width: 510rpx;
      > p:nth-child(1) {
        color: #333333;
        font-size: 34rpx;
        text-align: center;
        line-height: 42rpx;
        font-weight: bold;
      }
      > p:nth-child(2) {
        font-size: 28rpx;
        color: #333333;
        text-align: center;
        margin-top: 20rpx;
      }
      .gradeBox {
        > div:nth-child(1) {
          color: #333333;
          font-size: 34rpx;
          margin-top: 40rpx;
          span {
            color: #1c74fd;
            font-size: 34rpx;
          }
        }
        p {
          margin-top: 39rpx;
          color: #ccc7b8;
          font-size: 24rpx;
        }
        h3 {
          color: #333333;
          font-size: 32rpx;
          line-height: 56rpx;
        }
        h5 {
          margin-top: 39rpx;
          color: #ccc7b8;
          font-size: 24rpx;
        }
        h4 {
          color: #999999;
          font-size: 24rpx;
          line-height: 42rpx;
        }
      }
    }
  }
  .queryImg {
    width: 363rpx;
    height: 146rpx;
    flex-shrink: 0;
    margin: 0 auto;
    margin-top: -123rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .buttonBox {
    height: 148rpx;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.12);
    display: flex;
    justify-content: space-between;
    > div:nth-child(1) {
      margin: 30rpx;
      width: 478rpx;
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
    .iconBox {
      background-color: transparent;
      padding-right: 56rpx;
      &::after {
        border: none;
      }
      i {
        background-color: transparent;
        color: #331900;
        font-size: 46rpx;
        line-height: 148rpx;
      }
    }
  }
}
</style>

