<template>
  <div class="queryPage">
    <div class="result">
      <z-head text="查询结果"></z-head>
    </div>
    <div class="queryResult">
      <div class="queryBox">
        <p>{{title}}</p>
        <p>成绩查询结果</p>
        <div class="gradeBox">
          <div>总分：<span>{{postDetails.score}}</span></div>
          <p>科目成绩</p>
          <div v-for="(item,index) of postDetails.subjects " :key="index">
            <h3>{{item.title}}:{{item.value}}</h3>
          </div>
          <h5>考试信息</h5>
          <h4>考生姓名：{{postDetails.info.realname}}</h4>
          <h4>准考证号：{{postDetails.info.admission_ticket}}</h4>
          <h4>身份证号：{{postDetails.info.id_card}}</h4>
          <h4>报考院校：{{postDetails.info.school}}</h4>
          <h4>报考院系：{{postDetails.info.major}}</h4>
        </div>
      </div>
    </div>
    <div class="queryImg">
      <!-- <img :src="url+'/img/qiji_Inquire/base/images/postGraduate.png'" alt=""> -->
      <img src="/static/images/postGraduate.png" alt="">
    </div>
    <div class="buttonBox">
      <div @click="onSee"><button>查看复试技巧</button></div>
      <button class="iconBox" @click="share" open-type="share"><i class="iconfont icon-Activity_details_sha"></i></button>
      <div class="iconBox" @click="onPaint"><i class="iconfont icon-Activity_details_rin"></i></div>
    </div>
  </div>
</template>
<script>
import { postgraduate } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      postDetails: "",
      url: url.url,
      status: "",
      title: "2019硕士研究生考试（初试）",
      inquire: "查询"
    };
  },
  onLoad(options) {
    this.postDetails = wx.getStorageSync("postInfo");
    // this.status = this.postDetails.site_status;
  },
  onShow() {
    var postInfo = wx.getStorageSync("postInfo");
    wx.removeStorageSync("postInfo");
  },
  methods: {
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
        path: "pages/index/university/detail?university_id=8", // 跳转的目标页面
        extarData: {
          foo: "bar"
        },
        envVersion: "develop",
        success(res) {
          console.log("成功");
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
      title: "奇集查询-考研成绩查询",
      path: "pages/home/home/home?channel=friends",
      imageUrl: this.url + "/img/qiji_Inquire/base/images/graduate.png"
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
          line-height: 46rpx;
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
    width: 624rpx;
    height: 97rpx;
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

