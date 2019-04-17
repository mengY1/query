<template>
  <div class="queryPage">
    <div>
      <div class="queryBox" :style="{top:top}">
        <p>查询未开始</p>
        <p>2018年度全国会计专业技术资格考试成绩查询（中、高级）</p>
        <!-- <p>成绩查询</p> -->
        <div class="inputTit">
          <div>证件号码</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入证件号" v-model="input1"></div>
        </div>
        <div class="inputTit">
          <div>准考证号</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入准考证号" v-model="input2"></div>
        </div>
        <div class="section">
          <div class="section__title">报考省份</div>
          <picker class="picker" @change="bindPickerChange" :range="arrayProvince" :value='province'>
            <div class="sectionBox"><span v-show='!province'>请选择</span><i v-show='!province' class="iconfont icon-down-"></i><span style="color:#333">{{province}}</span></div>
          </picker>
        </div>
      </div>
    </div>
    <p class="source">数据来源：财政部会计资格评论中心</p>
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
import { accountLicence, getPhone } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      token: "",
      input1: "",
      input2: "",
      province: "",
      prov: "",
      status: "begin",
      accountDetaiInfo: "",
      site_status: "",
      arrayProvince: [],
      value: "",
      inquire: "查询",
      submit: "预约",
      title: "2018年度全国会计专业技术资格考试成绩查询（中、高级）",
      options: [
        {
          value: 11,
          name: "北京"
        },
        {
          value: 12,
          name: "天津"
        },
        {
          value: 13,
          name: "河北"
        },
        {
          value: 14,
          name: "山西"
        },
        {
          value: 15,
          name: "内蒙古"
        },
        {
          value: 16,
          name: "辽宁"
        },

        {
          value: 17,
          name: "吉林"
        },
        {
          value: 18,
          name: "黑龙江"
        },
        {
          value: 19,
          name: "上海"
        },
        {
          value: 20,
          name: "江苏"
        },

        {
          value: 21,
          name: "浙江"
        },
        {
          value: 22,
          name: "安徽"
        },
        {
          value: 23,
          name: "福建"
        },

        {
          value: 24,
          name: "江西"
        },
        {
          value: 25,
          name: "山东"
        },

        {
          value: 26,
          name: "河南"
        },
        {
          value: 27,
          name: "湖北"
        },

        {
          value: 28,
          name: "湖南"
        },
        {
          value: 29,
          name: "广东"
        },

        {
          value: 30,
          name: "广西"
        },
        {
          value: 31,
          name: "海南"
        },
        {
          value: 32,
          name: "四川"
        },
        {
          value: 33,
          name: "重庆"
        },
        {
          value: 34,
          name: "贵州"
        },
        {
          value: 35,
          name: "云南"
        },
        {
          value: 36,
          name: "西藏"
        },
        {
          value: 37,
          name: "陕西"
        },
        {
          value: 38,
          name: "甘肃"
        },
        {
          value: 39,
          name: "青海"
        },
        {
          value: 40,
          name: "宁夏"
        },
        {
          value: 41,
          name: "新疆"
        },
        {
          value: 42,
          name: "兵团"
        }
      ]
    };
  },
  props: ["top", "token"],
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
  mounted() {
    let that = this;
    this.options.forEach(element => {
      that.arrayProvince.push(element.name);
    });
  },
  onShow() {
    this.clear();
  },
  methods: {
    clear() {
      this.input1 = "";
      this.input2 = "";
      this.province = "";
    },
    //省份选择
    bindPickerChange(e) {
      console.log(e.mp.detail.value);
      this.province = this.arrayProvince[e.mp.detail.value];
    },
    //提交
    onSumbit() {
      this.options.forEach(element => {
        if (this.province == element.name) {
          this.prov = element.value;
        }
      });
      accountLicence({
        id_card: this.input1,
        admission_ticket: this.input2,
        province: this.prov
      }).then(res => {
        console.log(res);
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
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.submit
        });
      }
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
    //查询
    onInquire() {
      this.options.forEach(element => {
        if (this.province == element.name) {
          this.prov = element.value;
        }
      });
      if (nowTime <= endTime1) {
        accountLicence({
          id_card: this.input1,
          admission_ticket: this.input2,
          province: this.prov
        }).then(res => {
          console.log(res);
          this.accountDetaiInfo = res;
          this.site_status = res.site_status;
          wx.setStorageSync("accountDetaiInfo", this.accountDetaiInfo);
          wx.navigateTo({
            url: "/pages/home/accountLicence/result"
          });
        });
      } else {
        wx.navigateTo({
          url: "/pages/home/postGraduate/end"
        });
      }
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.inquire
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
    // margin-top: 223rpx;
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
