<template>
  <div class="queryPage">
    <div class="result">
      <z-head text="查询结果"></z-head>
    </div>
    <div class="queryResult">
      <div class="queryBox">
        <p>2018年下半年中小学教师资格考试（笔试）</p>
        <p>成绩查询结果</p>
        <div class="gradeBox">
          <p>科目成绩</p>
          <div v-for="(item,index) in detailInfo.score" :key="index">
            <h3>{{item.title}}：{{item.value}}</h3>
            <h3>合格与否：{{item.qualified}}</h3>
          </div>
          <h5>考试信息</h5>
          <h4>准考证号：{{detailInfo.prove.ticket_number}}</h4>
          <h4>考试批次：{{detailInfo.prove.batch}}</h4>
          <h4>有效期：{{detailInfo.prove.validity_period}}</h4>
          <h4>考试省份：{{detailInfo.prove.province}}</h4>
        </div>
      </div>
    </div>
    <div class="queryImg">
      <!-- <img :src="url+'/img/qiji_Inquire/base/images/teacherLicence.png'" alt> -->
      <img src="/static/images/teacherLicence.png" alt="">
    </div>
    <div class="buttonBox">
      <div @click="onSee">
        <button>查看面试技巧</button>
      </div>
      <button class="iconBox" open-type="share" @click="share">
        <i class="iconfont icon-Activity_details_sha"></i>
      </button>
      <div class="iconBox" @click="onPaint">
        <i class="iconfont icon-Activity_details_rin"></i>
      </div>
    </div>
  </div>
</template>
<script>
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      detailInfo: "",
      url: url.url,
      inquire: "查询",
      title: "2018年下半年中小学教师资格考试（笔试）"
    };
  },
  onLoad(options) {
    this.detailInfo = wx.getStorageSync("teacherWriteDetalInfo");
  },
  methods: {
    //查看复试技巧
    onSee() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "查看面试技巧",
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
      title: "奇集查询-教师资格证成绩查询",
      path: "pages/home/home/home?channel=friends",
      imageUrl: this.url + "/img/qiji_Inquire/base/images/teacher.png"
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
    .queryBox {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20rpx 0px rgba(147, 147, 147, 0.21);
      border-radius: 8rpx;
      padding: 33rpx 69rpx 37rpx 69rpx;
      width: 510rpx;
      position: fixed;
      top: 180rpx;
      margin-right: 50rpx;
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
    width: 351rpx;
    height: 144rpx;
    flex-shrink: 0;
    margin: 0 auto;
    margin-top: 46vh;
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

