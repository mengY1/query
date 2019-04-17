<template>
  <div class="queryPage">
    <div>
      <div class="queryBox" :style="{top:top}">
        <p>查询未开始</p>
        <p>2019年1月中小学教师资格考试（面试）</p>
        <!-- <p>成绩查询</p> -->
        <div class="section">
          <div class="section__title">报考省份</div>
          <picker class="picker" @change="bindPickerChange" :value="province" :range="arrayProvince">
            <div class="sectionBox"><span v-show='!province'>请选择</span><i v-show='!province' class="iconfont icon-down-"></i><span style="color:#333">{{province}}</span></div>
          </picker>
        </div>
        <div class="inputTit">
          <div>证件号码</div>
          <div>
            <input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入证件号" v-model="input2">
          </div>
        </div>
        <div class="inputTit">
          <div>姓名</div>
          <div>
            <input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入姓名" v-model="input3">
          </div>
        </div>
      </div>
    </div>
    <p class="source">数据来源：教育部考试中心</p>
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
import { teacherLicence, allProvinces, teacherInterview } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      token: "",
      input2: "",
      input3: "",
      status: "end",
      teacherWriteDetalInfo: "",
      arrayProvince: [],
      province: "",
      inquire: "查询",
      submit: "预约",
      title: "2019年1月中小学教师资格考试（面试）"
    };
  },
  props: ["top", "token"],
  onLoad() {
    // console.log(Date.parse(new Date()));
    var starTime1 = Date.parse(new Date("2019/03/15"));
    var endTime1 = Date.parse(new Date("2020/01/09"));
    // var starTime2 = Date.parse(new Date("2019/05/20"));
    // var endTime2 = Date.parse(new Date("2019/06/12"));
    // var starTime3 = Date.parse(new Date("2019/11/03"));
    // var endTime3 = Date.parse(new Date("2019/12/01"));
    // var starTime4 = Date.parse(new Date("2019/01/09"));
    // var endTime4 = Date.parse(new Date("2019/03/15"));
    var nowTime = Date.parse(new Date());
    if (
      nowTime >= starTime1 &&
      nowTime <= endTime1
      //  ||
      // (nowTime >= starTime2 && nowTime <= endTime2) ||
      // (nowTime >= starTime3 && nowTime <= endTime3) ||
      // (nowTime >= starTime4 && nowTime <= endTime4)
    ) {
      this.status = "begin";
    } else {
      this.status = "end";
    }
  },
  onShow() {
    this.clear();
  },
  mounted() {
    var that = this;
    allProvinces({}).then(function(res) {
      that.arrayProvince = [];
      res.data.forEach(element => {
        that.arrayProvince.push(element.name);
      });
    });
  },
  methods: {
    clear() {
      this.input3 = "";
      this.input2 = "";
      this.province = "";
    },
    // 选择省份
    bindPickerChange(e) {
      this.province = this.arrayProvince[e.mp.detail.value];
      // console.log(this.province, 3);
    },
    // 授权手机号
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
    // 查询面试
    onInquire() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.inquire
        });
      }
      if (nowTime >= starTime1 && nowTime <= endTime1) {
        teacherInterview({
          province: this.province,
          identity_number: this.input2,
          name: this.input3
        }).then(res => {
          console.log(res);
          this.teacherInterviewInfo = res;
          wx.setStorageSync("teacherInterviewInfo", this.teacherInterviewInfo);
          wx.navigateTo({
            url: "/pages/home/teacherLicence/Interview"
          });
        });
      }
    },
    // 提交面试
    onSumbit() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.submit
        });
      }
      teacherInterview({
        province: this.province,
        identity_number: this.input2,
        name: this.input3
      }).then(res => {
        console.log(res);
        // wx.navigateTo({
        //   url: "/pages/home/postGraduate/reservation"
        // });
        wx.showToast({
          title: "查询未开始"
        });
      });
    }
    // 查询笔试
    // onInquire() {
    //   if (common.status == "dev") {
    //     wx.reportAnalytics("query_button_click", {
    //       title: this.title,
    //       query_site_status: this.inquire
    //     });
    //   }
    //   teacherLicence({
    //     province: this.province,
    //     identity_number: this.input2,
    //     name: this.input3
    //   }).then(res => {
    //     console.log(res);
    //     this.teacherWriteDetalInfo = res;
    //     wx.setStorageSync("teacherWriteDetalInfo", this.teacherWriteDetalInfo);
    //     wx.navigateTo({
    //       url: "/pages/home/teacherLicence/written"
    //     });
    //   });
    // },
    // 提交笔试
    // onSumbit() {
    //   if (common.status == "dev") {
    //     wx.reportAnalytics("query_button_click", {
    //       title: this.title,
    //       query_site_status: this.submit
    //     });
    //   }
    //   teacherLicence({
    //     province: this.input1,
    //     identity_number: this.input2,
    //     name: this.input3
    //   }).then(res => {
    //     console.log(res);
    //     wx.navigateTo({
    //       url: "/pages/home/postGraduate/reservation"
    //     });
    //   });
    // }
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
            height: 78rpx;
            color: #333;
            line-height: 78rpx;
          }
        }
      }
      .section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16rpx;
        .section__title {
          color: #333333;
          font-size: 28rpx;
          text-align: right;
          width: 135rpx;
          display: inline-block;
        }
        .picker {
          .sectionBox {
            width: 410rpx;
            height: 78rpx;
            background: rgba(245, 245, 245, 1);
            border-radius: 39rpx;
            margin-left: 30rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ccc7b8;
            font-size: 28rpx;
            i {
              font-size: 18rpx;
              margin-left: 30rpx;
            }
          }
        }
      }
    }
  }
  .source {
    text-align: center;
    color: #ccc7b8;
    font-size: 24rpx;
    margin-top: 190rpx;
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
