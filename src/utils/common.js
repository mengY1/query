
let testInterface = "https://api.54qj.com/api/" //正式环境接口域名
let url = "https://cdn.54qj.com/" //正式环境文件域名
let status = "dev" //test为测试环境，dev为正式环境，正式环境才上报自定义分析数据
console.log(process.env.NODE_ENV, "process")
if (process.env.NODE_ENV == 'test') {
  console.log('这是测试环境')
  testInterface = "http://54qjapi.54qn.cn/api/" //测试环境接口域名
  url = "http://54qjapi.54qn.cn/" //测试环境文件域名
  status = "test"
} else if (process.env.NODE_ENV == "mine") {
  console.log("开发的内部环境")
  testInterface = "http://7479805f.ap.ngrok.io/api/"
  url = "http://54qjapi.54qn.cn/"
  status = "test"
}
//进入授权页面(苹果手机在遇到多个跳转的时候不会在启动的配置文件处执行跳转到授权页面)
export function toShouquan() {
  wx.getSystemInfo({
    success(res) {
      console.log(res,'手机系统信息')
      var model = res.model.substr(0,6)
      if(model==="iPhone"){
        console.log("卧槽又是苹果手机")
        if(!wx.getStorageSync("userInfo")){
          wx.navigateTo({
            url:"/pages/login/login/login"
          })
        }
      }
    }
  })
}
export default {
  testInterface,
  url,
  status,
}
