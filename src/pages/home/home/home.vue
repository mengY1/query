<template>
  <div class="homePage">
    <!-- 加载蒙层 -->
    <div class="loading" v-show="loadingShow">
      <loading></loading>
    </div>
    <view class="iconTop" :class="isIpx ? 'ipx-bottom' : ''" @click="pageData">
      <button open-type="share"><i class="iconfont icon-Activity_details_sha"></i></button>
      <text>奇集查询</text>
    </view>
    <view class="certificateNav">
      <view :class="certificateStatus == '考研' ? 'current':''" data-type="考研" @click='oncertificateType'>
        <text>考研</text>
      </view>
      <!-- <view :class="certificateStatus == '四六级' ? 'current':''" data-type="四六级" @click='oncertificateType'>
        <text>英语查询</text>
      </view> -->
      <view :class="certificateStatus == '计算机' ? 'current':''" data-type="计算机" @click='oncertificateType'>
        <text>计算机</text>
      </view>
      <view :class="certificateStatus == '教师资格证' ? 'current':''" data-type="教师资格证" @click='oncertificateType'>
        <text>教师资格证</text>
      </view>
      <view :class="certificateStatus == '会计资格证' ? 'current':''" data-type="会计资格证" @click='oncertificateType'>
        <text>会计资格证</text>
      </view>
    </view>
    <!-- 考研 -->
    <div v-if="certificateStatus == '考研'">
      <postGraduate ref="postgra" :top='top' :token="token" :schoolName="schoolName" :certificateStatus="certificateStatus"></postGraduate>
    </div>
    <!-- 四六级 -->
    <!-- <div v-if="certificateStatus == '四六级'">
      <fourSix ref="four" :top='top' :token="token"></fourSix>
    </div> -->
    <!-- 计算机 -->
    <div v-if="certificateStatus == '计算机'">
      <computerLicence ref="computer" :top='top' :token="token"></computerLicence>
    </div>
    <!-- 教师资格证 -->
    <div v-if="certificateStatus == '教师资格证'">
      <teacherLicence ref="teacher" :top='top' :token="token"></teacherLicence>
    </div>
    <!-- 会计资格证 -->
    <div v-if="certificateStatus == '会计资格证'">
      <accountLicence ref="accou" :top='top' :token="token"></accountLicence>
    </div>
    <!-- 首次进入弹窗指引 -->
    <div class='first_popup' v-if="recommendShow">
      <div>
        <div class='firstBox'>
          <div class="firstImg"><img :src="url+'/img/qiji_Inquire/base/images/pop_image@2x.png'" alt=""> <i class="iconfont icon-Popups-close " @click="iKnow"></i></div>
          <div class="rulse">
            <p>奇集查询可以一键闪电查询研究生、四六级考试等成绩。</p>
            <p>预约查询成绩推送，你关心的立马知晓实时快速查询成绩，从此告别拥挤网速</p>
            <h4>*查询数据结果均来自教育部官方数据。</h4>
          </div>
          <button @click="iKnow">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { silentlogin, access_token } from "@/utils/api";
//考研
import postGraduate from "@/components/postGraduate";
//四六级
import fourSix from "@/components/fourSix";
//计算机
import computerLicence from "@/components/computerLicence";
//教师资格证
import teacherLicence from "@/components/teacherLicence";
//会计资格证
import accountLicence from "@/components/accountLicence";
import loading from "@/components/loading";
import url from "@/utils/common";
import common from "@/utils/common";
export default {
  components: {
    postGraduate,
    fourSix,
    computerLicence,
    teacherLicence,
    accountLicence,
    loading
  },
  data() {
    return {
      url: url.url,
      certificateStatus: "考研",
      recommendShow: false,
      isIpx: false,
      top: "",
      loadingShow: true,
      is_full: 0,
      token: "",
      channel: "",
      schoolName: ""
    };
  },
  onLoad(options) {
    this.loadingShow = true;
    var token = " ";
    this.getInfo(options);
    token += wx.getStorageSync("query_silentlogin").token;
    console.log(wx.getStorageSync("query_silentlogin"));
    this.channel = options.channel;
    this.pageData();
    this.schoolName = options.school;
  },
  onShow() {
    //未有缓存的时候弹窗
    if (!wx.getStorageSync("guideShow")) {
      this.recommendShow = true;
    } else {
      this.recommendShow = false;
    }
    if (wx.getStorageSync("refreshIndex") === 20) {
      this.loadingShow = true;
      this.getInfo();
      wx.setStorageSync("refreshIndex", 10); //10则不刷新页面重新请求数据
    }
    this.token = wx.getStorageSync("query_silentlogin").token;
  },
  mounted() {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        var name = "iPhone X";
        if (res.model.indexOf(name) > -1) {
          self.isIpx = true;
          self.top = "298rpx";
        } else {
          self.isIpx = false;
          self.top = "248rpx";
        }
      }
    });
  },
  methods: {
    //首页刷新令牌
    async getInfo(options) {
      try {
        if (wx.getStorageSync("query_silentlogin").refresh_token) {
          var refresh_token = wx.getStorageSync("query_silentlogin")
            .refresh_token;
          let refTokenAction = await access_token({
            refresh_token: refresh_token
          });
          var silentMsg = wx.getStorageSync("query_silentlogin");
          silentMsg.token = refTokenAction.access_token;
          silentMsg.refresh_token = refTokenAction.refresh_token;
          wx.setStorageSync("query_silentlogin", silentMsg);
          console.log("刷新令牌后", silentMsg);
          if (options) {
            this.toSharePage(options);
          }
        } else {
          if (options) {
            this.toSharePage(options);
          }
        }
        this.loadingShow = false;
      } catch (e) {
        this.loadingShow = false;
      }
    },
    //分享渠道埋点
    toSharePage(options) {
      if (options.friends) {
        wx.navigateTo({
          url: "pages/home/home/home?channel=friends"
        });
      } else if (options.templete) {
        wx.navigateTo({
          url: "pages/home/home/home?channel=templete"
        });
      }
      //海报跳转（获取的参数例子act=123&type=1或者org=123）
      var scene = decodeURIComponent(options.scene); //小程序码扫描进入的参数
      var arr = scene.split("=");
      if (arr[0] == "channel") {
        this.channel = "poster";
      }
    },

    // 首次进来弹窗与指引
    iKnow() {
      wx.setStorageSync("guideShow", 10); //10为已知道，不再弹窗
      this.recommendShow = false;
    },
    pageData() {
      wx.reportAnalytics("index_share", {
        channel: this.channel
      });
    },
    //成绩查询切换
    oncertificateType(e) {
      var type = e.currentTarget.dataset.type;
      this.certificateStatus = type;
      if (this.certificateStatus != "考研") {
        this.schoolName = "";
      }
      if (common.status == "dev") {
        wx.reportAnalytics("index_tab", {
          channel: this.channel,
          tab_type: type
        });
      }
    }
  },
  //分享给好友
  onShareAppMessage(res) {
    if (this.certificateStatus == "考研") {
      this.$refs.postgra.clear();
    } else if (this.certificateStatus == "四六级") {
      this.$refs.four.clear();
    } else if (this.certificateStatus == "计算机") {
      this.$refs.computer.clear();
    } else if (this.certificateStatus == "教师资格证") {
      this.$refs.teacher.clear();
    } else if (this.certificateStatus == "会计资格证") {
      this.$refs.accou.clear();
    }
    return {
      title: "奇集查询-考研成绩查询",
      path: "pages/home/home/home?channel=friends"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/icon.css";
.ipx-bottom {
  padding-top: 50rpx !important;
}
.homePage .iconTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 128rpx;
  background: #ffb90c;
  button {
    background: transparent;
    margin-left: 8rpx;
    &::after {
      border: none;
    }
  }
  i {
    color: #331900;
    font-size: 34rpx;
    font-weight: 800;
    margin-top: 40rpx;
  }
  text {
    color: #331900;
    font-size: 36rpx;
    margin-top: 40rpx;
    font-weight: 800;
    margin-right: 300rpx;
  }
}
.homePage .certificateNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffb90c;
  height: 232rpx;
  padding: 0 30rpx;
  padding-top: 11rpx;
}
.homePage .certificateNav view {
  text-align: center;
  position: relative;
}
.homePage .certificateNav > view.current text {
  color: #331900;
  font-weight: bold;
  font-size: 50rpx;
  line-height: 50rpx;
}
.homePage .certificateNav > view.current text ::before {
  content: "";
  width: 12rpx;
  height: 12rpx;
  position: absolute;
  top: 65rpx;
  left: 40%;
  border: 6rpx solid rgba(28, 116, 253, 1);
  border-radius: 50%;
}
.homePage .certificateNav view text {
  font-size: 26rpx;
  color: #663100;
  height: 220rpx;
  display: inline-block;
}
.homePage .first_popup {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.homePage .first_popup .firstBox {
  width: 80%;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}

.homePage .first_popup .firstBox {
  width: 590rpx;
  height: 600rpx;
  border-radius: 2px;
  .rulse {
    padding: 15rpx 62rpx 20rpx 53rpx;
    color: #333;
    font-size: 28rpx;
    line-height: 44rpx;
    h4 {
      color: #999999;
      font-size: 22rpx;
    }
  }
  button {
    background-color: transparent;
    background-color: #ffb90c;
    width: 230rpx;
    height: 88rpx;
    border-radius: 44rpx;
    font-size: 36rpx;
    color: #333;
    line-height: 88rpx;
  }
}
.homePage .first_popup .firstBox .firstImg {
  position: relative;
  i {
    position: absolute;
    top: 31rpx;
    right: 31rpx;
    color: #fff;
    font-size: 22rpx;
  }
}
.homePage .first_popup .firstBox image {
  width: 100%;
  height: 219rpx;
  flex-shrink: 0;
  border-radius: 4rpx;
}
</style>
