<template>
  <div class="queryPage" @click="schoolInfoHide">
    <div>
      <div class="queryBox" :style="{top:top}">
        <p>预约成绩查询</p>
        <p>2019硕士研究生考试（初试）</p>
        <!-- <p>成绩查询</p> -->
        <div class="inputTit">
          <div><span>*</span>姓名</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入姓名" v-model='realname'></div>
        </div>
        <div class="inputTit">
          <div><span>*</span>证件号码</div>
          <div>
            <input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入证件号码" v-model='id_card'></div>
        </div>
        <div class="inputTit">
          <div><span>*</span>准考证号</div>
          <div><input type="text" placeholder-style="color: #ccc7b8;" placeholder="请输入准考证号" v-model='admission_ticket'></div>
        </div>
        <div class="section">
          <div class="section__title">报考省份</div>
          <picker class="picker" @change="bindPickerChange" :value="province" :range="arrayProvince">
            <div class="sectionBox"><span v-show='!province'>请选择</span><i v-show='!province' class="iconfont icon-down-"></i><span style="color:#333">{{province}}</span></div>
          </picker>
        </div>
        <div class="section">
          <div class="section__title">报考单位</div>
          <div class="unitBox" @click="onUnit" :value="schoolName"><span v-show='!schoolName'>请输入单位</span><span style="color:#333">{{schoolName}}</span></div>
        </div>
      </div>
    </div>
    <p class="grade">我们将在成绩公布的第一时间告知你查询结果</p>
    <!-- <p class="grade">*报名省市和单位仅显示目前已开通查询的单位</p> -->
    <p class="source">数据来源：教育部高校学生司</p>
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
import { getPhone, postgraduate, allSchool, allProvinces } from "@/utils/api";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  data() {
    return {
      realname: "",
      id_card: "",
      admission_ticket: "",
      school: "",
      province: "",
      code: "",
      token: "",
      status: "begin", //begin为开放查询时间，end为未开放时间
      postInfo: "",
      schoolFocus: false,
      schoolsData: [],
      data: { keyword: "", cms_province_id: "" },
      index: "",
      inquire: "查询",
      submit: "预约",
      title: "2019硕士研究生考试（初试）",
      arrayProvince: [],
      schoolName: ""
    };
  },
  props: ["top", "token", "schoolName", "certificateStatus"],
  onLoad() {
    var that = this;
    setTimeout(() => {
      if (this.certificateStatus != '考研') {
        this.schoolName='';
        this.clear();
      }
    }, 100);
    allProvinces({}).then(function(res) {
      that.arrayProvince = [];
      res.data.forEach(element => {
        that.arrayProvince.push(element.name);
      });
    });
    console.log(Date.parse(new Date()));
    var starTime1 = Date.parse(new Date("2019/01/25"));
    var endTime1 = Date.parse(new Date("2019/02/15"));
    var nowTime = Date.parse(new Date());
    if (nowTime >= starTime1 && nowTime <= endTime1) {
      this.status = "end";
    } else {
      this.status = "begin";
    }
  },

  watch: {},
  mounted() {},
  methods: {
    clear() {
      this.realname = "";
      this.id_card = "";
      this.admission_ticket = "";
      this.schoolName = "";
      this.province = "";
    },
    //单位跳转
    onUnit() {
      wx.navigateTo({
        url: "/pages/home/postGraduate/unit"
      });
    },
    bindPickerChange(e) {
      this.province = this.arrayProvince[e.mp.detail.value];
    },
    getPhoneNumber(e) {
      var that = this;
      var code = "";
      wx.login({
        success: res => {
          code = res.code;
          var iv = e.mp.detail.iv;
          var encryptedData = e.mp.detail.encryptedData;
          if (iv) {
            getPhone({
              code: code,
              encryptedData: encryptedData,
              iv: iv
            }).then(res => {
              console.log(res);
              var msg = wx.getStorageSync("query_silentlogin");
              msg.token = res.access_token;
              that.token = res.access_token;
              msg.refresh_token = res.refresh_token;
              console.log(msg);
              wx.setStorageSync("query_silentlogin", msg);
            });
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    //提交
    onSumbit() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.submit
        });
      }
      var user = {
        realname: this.realname,
        id_card: this.id_card,
        admission_ticket: this.admission_ticket,
        school: this.school,
        province: this.province
      };
      postgraduate(user).then(res => {
        if (wx.getStorageSync("query_silentlogin").token) {
          wx.navigateTo({
            url: "/pages/home/postGraduate/reservation"
          });
        } else {
          wx.login({
            success: res => {
              let data = {
                encryptedData: this.encryptedData,
                iv: this.iv,
                unionid: this.unionid
              };
              if (iv) {
                getPhone(data).then(function(res) {
                  console.log(res);
                });
              }
            }
          });
        }
      });
    },
    //查询
    onInquire() {
      if (common.status == "dev") {
        wx.reportAnalytics("query_button_click", {
          title: this.title,
          query_site_status: this.inquire
        });
      }
      var user = {
        realname: this.realname,
        id_card: this.id_card,
        admission_ticket: this.admission_ticket,
        school: this.school,
        province: this.province
      };
      if (nowTime <= endTime1) {
        postgraduate(user).then(res => {
          console.log(res);
          this.postInfo = res;
          wx.setStorageSync("postInfo", this.postInfo);
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/home/postGraduate/result"
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
      padding: 30rpx 50rpx 45rpx 30rpx;
      > p:nth-child(1) {
        color: #1c74fd;
        font-size: 32rpx;
        text-align: center;
        line-height: 42rpx;
        // color: #333333;
        // font-size: 34rpx;
        // text-align: center;
        // line-height: 42rpx;
        // font-weight: bold;
      }
      > p:nth-child(2) {
        font-size: 38rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin: 15rpx 0 45rpx 0;
        // font-size: 28rpx;
        // color: #333333;
        // text-align: center;
        // margin-top: 20rpx;
      }
      .inputTit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16rpx;
        position: relative;
        > div:nth-child(1) {
          color: #333333;
          font-size: 28rpx;
          text-align: right;
          width: 135rpx;
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
        .unitBox {
          width: 410rpx;
          height: 78rpx;
          background: rgba(245, 245, 245, 1);
          border-radius: 39rpx;
          margin-left: 30rpx;
          color: #ccc7b8;
          font-size: 28rpx;
          text-align: center;
          span {
            font-size: 28rpx;
            height: 78rpx;
            line-height: 78rpx;
          }
        }
      }
      .schoolsInfo {
        position: absolute;
        width: 85%;
        line-height: 78rpx;
        padding-left: 40rpx;
        background: #fff;
        z-index: 100;
        overflow: auto;
        height: 230rpx;
      }
      .schoolsInfo p {
        line-height: 78rpx;
        height: 78rpx;
        border-bottom: 1px solid #e6e6e6;
        font-size: 28rpx;
        background: #fff;
      }
    }
  }
  .grade {
    text-align: center;
    color: #1c74fd;
    font-size: 24rpx;
    margin-top: -82rpx;
  }
  .source {
    text-align: center;
    color: #ccc7b8;
    font-size: 24rpx;
    margin-top: 135rpx;
    // margin-top: 165rpx;
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
