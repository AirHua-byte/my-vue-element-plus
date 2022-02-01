export interface TableOptions {
  // 字段名称
  prop?: string,
  // 表头
  label?: string,
  // 列宽度
  width?: string | number,
  // 对齐方式
  align?: 'left' | 'center' | 'right',
  // slot名称
  slot?: string,
  // 操作项标识
  action?: boolean,
  // 可否单独修改
  editable?: boolean
}