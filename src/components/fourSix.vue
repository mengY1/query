<template>
  <div class="queryPage">
    <div>
      <div class="queryBox" :style="{top:top}">
         <p>查询未开始</p>
        <p>2018下半年全国大学英语四六级考试（含口试）</p>
        <!-- <p>成绩查询</p> -->
        <div class="inputTit">
          <div>准考证号</div>
          <div>
            <input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入准考证号" v-model="input1">
          </div>
        </div>
        <div class="inputTit">
          <div>姓名</div>
          <div>
            <input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入姓名" v-model="input2">
          </div>
        </div>
      </div>
    </div>
    <p class="grade">如考生成绩为D等，则成绩单上不报道其口语成绩</p>
    <p class="source">数据来源：中华人民共和国教育部考试中心</p>
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
import { fourSixApi, getPhone } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  props: ["top", "token"],
  data() {
    return {
      token: "",
      input1: "",
      input2: "",
      status: "begin",
      fourSixdetaiInfo: "",
      inquire: "查询",
      submit: "预约",
      title: "2018下半年全国大学英语四六级考试（含口试）"
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
      this.input1 = "";
      this.input2 = "";
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
    // 查询
    onInquire() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.inquire
        });
      }
      fourSixApi({ ticket_number: this.input1, name: this.input2 })
        .then(res => {
          console.log(res);
          this.fourSixdetaiInfo = res;
          wx.setStorageSync("fourSixdetaiInfo", this.fourSixdetaiInfo);
          wx.navigateTo({
            url: `/pages/home/fourSix/result`
          });
        })
        .catch(err => {
          console.log(err);
          wx.showToast({
            title: err.message
          });
        });
    },
    onSumbit() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.submit
        });
      }
      fourSixApi({ ticket_number: this.input1, name: this.input2 }).then(
        res => {
          console.log(res);
          // wx.navigateTo({
          //   url: "/pages/home/postGraduate/reservation"
          // });
           wx.showToast({
            title: '查询未开始'
          });
        }
      );
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
  .grade {
    text-align: center;
    color: #1c74fd;
    font-size: 24rpx;
    margin-top: -81rpx;
  }
  .source {
    text-align: center;
    color: #ccc7b8;
    font-size: 24rpx;
    // margin-top: 367rpx;
     margin-top:325rpx;
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
