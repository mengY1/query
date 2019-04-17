<template>
  <div class="reservationPage">
    <z-head text="奇集查询"></z-head>
    <div class="reservationImg"><img src="/static/images/yijieshu@2x.png" alt=""></div>
    <p>2019硕士研究生成绩查询已结束</p>
    <h3>需要成绩复核的考生请前往学校官网查看相关的复核流程</h3>
    <div class="buttonBox">
      <div class="onSee"><button>查看录取概览分析</button></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "2019硕士研究生考试（初试）",
      inquire: "结束"
    };
  },
  methods: {
    onSee() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_results_button_record", {
          button_name: "查看录取概览分析",
          title: this.title,
          query_site_status: this.inquire
        });
      }
    }
  },
  //分享给好友
  onShareAppMessage(res) {
    return {
      title: "张大伟在奇集查询查考研成绩，一起来看看吧",
      path: "pages/home/home/home",
      imageUrl:
        "https://cdn.54qj.com/img/qiji_Inquire/base/images/reservation.png"
    };
  }
};
</script>
<style lang="scss" scoped>
.reservationPage {
  .reservationImg {
    width: 297rpx;
    height: 258rpx;
    flex-shrink: 0;
    margin: 0 auto;
    margin-top: 245rpx;
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
    margin-top: 20rpx;
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
