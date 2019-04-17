// import request from './request'
//status参数在请求接口的方法里传值，默认为false，ajax处的showLoading会默认显示，传true则不让其显示
// status2参数在请求接口的方法里传值，默认为false，ajax处的400接口弹窗会默认显示，传true则不让其显示
import {
  ajaxGet,
  ajaxDelete
} from './ajax'
import {
  ajaxPost
} from './ajax'
import {
  ajaxPut
} from './ajax'
import {
  Agent
} from 'http';


//静默登录
export function silentlogin(res) {
  return ajaxPost("program/silentlogin", res)
}
//刷新access_token
export function access_token(res) {
  return ajaxPost("auth/refresh_token", res, {}, true)
}
//奇集查询-注册
export function getPhone(res) {
  return ajaxPost("auth/qiji_query/register", res, {},"",true)
}
//2019年硕士研究生考试(初试)
export function postgraduate(res) {
  return ajaxPost("score_query/yjskscs/2019", res, {})
}
// 四六级预约，查询
export function fourSixApi(res) {
  return ajaxPost("score_query/yysljks/2018", res, {})
}
//计算机考试成绩查询2018
export function computeScore(res) {
  return ajaxPost("score_query/jsjdjks/2018", res, {})
}
//全国会计资格考试
export function accountLicence(res) {
  return ajaxPost("score_query/kjzyzgkszgj/2018", res, {})
}
//全国中小学老师资格考试(笔试)
export function teacherLicence(res) {
  return ajaxPost("score_query/zxxjszgzbs/2018", res, {})
}
//全国中小学老师资格考试(面试)
export function teacherInterview(res) {
  return ajaxPost("score_query/zxxjszgzms/2018", res, {})
}
//所有学校
export function allSchool(res) {
  return ajaxGet("cms/schools", res, {})
}
//所有省份
export function allProvinces(res) {
  return ajaxGet("cms/provinces", res, {})
}
