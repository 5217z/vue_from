// 定义接口
// options: 配置项 是一个数组

export interface RuleItem {
  required?: boolean, // 是否必填
  message: string, // 错误信息
  trigger: string, // 触发方式
  min?: number, // 最小值
  max?: number, // 最大值
  type?: string, // 类型
}


export interface OptionsItem {
  type: string, // 表单元素的类型(input checkbox)
  prop?: string, // 表单项的标识
  label?: string, // 表单的label
  value: any, // 表单项的值
  rules?: RuleItem[],
  placeholder?: string, // 占位符
  // 剩余属性
  attrs?: any, // style 密码框 disbaled
  children?: OptionsItem[]
}