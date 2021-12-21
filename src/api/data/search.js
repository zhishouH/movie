import request from '@/util/request'

export function SearchAPI () {
  return request({
    url: '/detail',
    method: 'GET'
  })
}
