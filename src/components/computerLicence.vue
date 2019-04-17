<template>
  <div class="queryPage">
    <div>
      <div class="queryBox" :style="{top:top}">
         <p>查询未开始</p>
        <p>2019年3月全国计算机等级考试（NCRE）</p>
        <!-- <p>成绩查询</p> -->
        <div class="inputTit">
          <div>准考证号</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入准考证号" v-model="ticket_number"></div>
        </div>
        <div class="inputTit">
          <div>姓名</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入姓名" v-model="name"></div>
        </div>
      </div>
    </div>
    <p class="source">数据来源：北京教育考试院</p>
    <div class="buttonBox">
      <div v-if="token">
        <button v-if="status==='end'" @click="onSumbit">提交</button>
        <button v-if="status==='begin'" @click="onInquire">查询</button>
      </div>
      <button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">提交</button>
    </div>
  </div>
</template>
<script>
import { computeScore, getPhone } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  props: ["top", "token"],
  data() {
    return {
      ticket_number: "",
      name: "",
      token: "",
      status: "begin", //begin为开放查询时间，end为未开放时间
      computerInfo: "",
      inquire: "查询",
      submit: "预约",
      title: "2019年3月全国计算机等级考试（NCRE）"
    };
  },
  onLoad() {
    // console.log(Date.parse(new Date()));
    var starTime1 = Date.parse(new Date("2019/04/10"));
    var endTime1 = Date.parse(new Date("2019/05/01"));
    var starTime2 = Date.parse(new Date("2019/09/17"));
    var endTime2 = Date.parse(new Date("2019/11/01"));
    var nowTime = Date.parse(new Date());
    if (
      (nowTime >= starTime1 && nowTime <= endTime1) ||
      (nowTime >= starTime2 && nowTime <= endTime2)
    ) {
      this.status = "begin";
    } else {
      this.status = "end";
    }
  },
  onShow() {
    this.clear();
  },
  methods: {
    clear() {
      this.ticket_number = "";
      this.name = "";
    },
    getPhoneNumber(e) {
      console.log(e);
      var that = this;
      var code = "";
      wx.login({
        success: res => {
          console.log(res);
          code = res.code;
          var iv = e.mp.detail.iv;
          var encryptedData = e.mp.detail.encryptedData;
          getPhone({
            code: code,
            encryptedData: encryptedData,
            iv: iv
          }).then(res => {
            var msg = wx.getStorageSync("query_silentlogin");
            msg.token = res.access_token;
            that.token = res.access_token;
            msg.refresh_token = res.refresh_token;
            wx.setStorageSync("query_silentlogin", msg);
          });
        }
      });
    },
    onSumbit() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.submit
        });
      }
      var data = {
        ticket_number: this.ticket_number,
        name: this.name
      };
      computeScore(data).then(res => {
          wx.showToast({
            title: "查询未开始"
          });
        if (wx.getStorageSync("silentlogin").token) {
          // wx.navigateTo({
          //   url: "/pages/home/postGraduate/reservation"
          // });

        }
        // else {
        //   wx.login({
        //     success: res => {
        //       var code = res.code;
        //       console.log(res);
        //       let data = {
        //         encryptedData: this.encryptedData,
        //         iv: this.iv,
        //         unionid: this.unionid
        //       };
        //       wx.setStorageSync("iphone", data);
        //       getPhone(data).then(function(res) {
        //         console.log(res);
        //       });
        //     },
        //     fail: function(err) {
        //       console.log(err);
        //     }
        //   });
        // }
      });
    },
    onInquire() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.inquire
        });
      }
      var data = {
        ticket_number: this.ticket_number,
        name: this.name
      };
      if (nowTime <= endTime1 && nowTime <= endTime2) {
        computeScore(data).then(res => {
          console.log(res, 8888);
          this.computerInfo = res;
          wx.setStorageSync("computerInfo", this.computerInfo);
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/home/computerLicence/result"
            });
          }, 300);
        });
      } else {
        wx.navigateTo({
          url: "/pages/home/postGraduate/end"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.queryPage {
  > div:nth-child(1) {
    margin: 0 50rpx;
    position: relative;
    top: -115rpx;
    .queryBox {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20rpx 0px rgba(147, 147, 147, 0.21);
      border-radius: 8rpx;
      padding: 54rpx 46rpx 56rpx 40rpx;
      > p:nth-child(1) {
        // color: #333333;
        // font-size: 34rpx;
        // text-align: center;
        // line-height: 42rpx;
        // font-weight: bold;
        color: #1c74fd;
        font-size: 32rpx;
        text-align: center;
        line-height: 42rpx;
      }
      > p:nth-child(2) {
        // font-size: 28rpx;
        // color: #333333;
        // text-align: center;
        // margin-top: 20rpx;
        font-size: 38rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin: 15rpx 0 45rpx 0;
      }
      .inputTit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16rpx;
        > div:nth-child(1) {
          color: #333333;
          font-size: 28rpx;
          text-align: right;
          width: 127rpx;
          display: inline-block;
          span {
            color: #ff4c5b;
          }
        }
        > div:nth-child(2) {
          width: 410rpx;
          height: 78rpx;
          background: rgba(245, 245, 245, 1);
          border-radius: 39rpx;
          margin-left: 30rpx;
          input {
            width: 100%;
            text-align: center;
            background-color: transparent;
            font-size: 28rpx;
            color: #333;
            height: 78rpx;
            line-height: 78rpx;
          }
        }
      }
    }
  }
  .source {
    text-align: center;
    color: #ccc7b8;
    font-size: 24rpx;
    // margin-top: 316rpx;
    margin-top: 280rpx;
  }
  .buttonBox {
    height: 148rpx;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.12);
    button {
      margin: 30rpx 76rpx;
      height: 88rpx;
      background: rgba(255, 185, 12, 1);
      border-radius: 44rpx;
      font-size: 36rpx;
      line-height: 88rpx;
      text-align: center;
    }
  }
}
</style>
