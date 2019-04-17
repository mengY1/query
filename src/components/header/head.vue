<template>
  <header id='headBox'>
    <div :class="isIpx ? 'ipx-bottom' : ''">
      <i class="backPage iconfont icon-left-" @click="commonHead_left_back"></i>
      <div class="title">{{text}}</div>
    </div>
  </header>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isIpx: false
    };
  },
  mounted() {
    //获取用户信息
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        var name = "iPhone X";
        if (res.model.indexOf(name) > -1) {
          self.isIpx = true;
        } else {
          self.isIpx = false;
        }
      }
    });
  },
  ready: function() {},
  props: {
    text: {
      type: String,
      default: ""
    },
    wear: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  methods: {
    commonHead_left_back: function() {
      wx.navigateBack();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./../../style/icon.css";
.ipx-bottom {
  padding-top: 50rpx !important;
}
#headBox {
  width: 100%;
  height: 128rpx;

  &.wear {
    height: 0;
    > div {
      background: transparent;
      position: relative;
      left: 0;
      top: 0;
    }
  }
  > div {
    position: fixed;
    top: 21rpx;
    left: 0;
    width: 60%;
    height: 125rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;

    .backPage {
      line-height: 125rpx;
      width: 130rpx;
      padding-left: 24rpx;
      font-size: 36rpx;
      color: #331900;
      justify-content: flex-start;
    }
    .title {
      font-size: 36rpx;
      color: #331900;
    }
  }
}
</style>
