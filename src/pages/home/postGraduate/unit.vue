<template>
  <div class="unitPage" @click="schoolInfoHide">
    <z-head text="报考单位"></z-head>
    <div class="inputBox"><input type="text" @input="schoolPage" @blur="schoolBlur" placeholder-style="color: #ccc7b8;" placeholder="请输入单位" v-model='school' maxlength="15"></div>
    <div class="schoolsInfo " v-if="schoolFocus">
      <p v-bind:readonly="true" v-for="(item,index) in schoolsData" @click="getName(item.name)" :key="index" :data-name="item.name" :data-id="item.cms_school_id" :value="item.name">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
import { allSchool } from "@/utils/api";
export default {
  data() {
    return {
      school: "",
      schoolFocus: false,
      schoolsData: [],
      data: { keyword: "" }
    };
  },
  onShow() {
    this.clear();
  },
  methods: {
    clear() {
      this.school = "";
    },
    schoolInfoHide() {
      this.schoolFocus = false;
    },
    getName(e) {
      this.schoolFocus = false;
      this.school = e;
      // setTimeout(() => {
      wx.navigateTo({
        // school:this.school
        url: "/pages/home/home/home?school="+this.school
      });
      // }, 1000);
    },
    schoolPage() {
      var that = this;
      this.schoolFocus = true;
      this.data.keyword = this.school;
      if (this.school) {
        allSchool(this.data).then(function(res) {
          console.log(res);
          if (res.data.length == 0) {
            that.schoolsData = res.data;
          } else {
            that.schoolsData = res.data;
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.unitPage {
  .inputBox {
    width: 670rpx;
    height: 88rpx;
    background: rgba(245, 245, 245, 1);
    border-radius: 39rpx;
    margin: 0 auto;
    margin-top: 56rpx;
    input {
      width: 100%;
      text-align: left;
      background-color: transparent;
      font-size: 28rpx;
      color: #333;
      height: 88rpx;
      line-height: 88rpx;
      margin-left: 30rpx;
    }
  }
  .schoolsInfo {
    position: absolute;
    width: 85%;
    line-height: 78rpx;
    padding-left: 70rpx;
    background: #fff;
    z-index: 100;
    overflow: auto;
    height: 900rpx;
  }
  .schoolsInfo p {
    line-height: 78rpx;
    height: 78rpx;
    border-bottom: 1px solid #e6e6e6;
    font-size: 28rpx;
    background: #fff;
  }
}
</style>
