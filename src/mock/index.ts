import Mock from "mockjs"
const Random = Mock.Random

interface DataList {
  date: string,
  name: string,
  address: string
}

const dataList: DataList[] = []
for (let i=0; i<100; i++) {
  const template = {
    date: Random.date(),
    name: Random.name(),
    address: Random.province()
  }
  dataList.push(template)
}

Mock.mock('api/list', 'post', (params: any) => {
  let info = JSON.parse(params.body)
  // 当前页 页数据大小 总数据长度
  let [index, size, total] = [info.current, info.pageSize, dataList.length]
  let totalPages = Math.ceil(total / size)
  let data = dataList.slice((index-1)*size, index*size)
  return {
    'code': '200',
    'message': '获取成功',
    'data': {
      'currentPage': index,
      'pageSize': size,
      'data': data,
      'total': total,
      'totalPages': totalPages
    }
  }
})