// 把驼峰换成横杠连接
export const toLine = (value: string) => {
  return value.replace(/([A-Z])/g, '-$1').toLocaleLowerCase()
}