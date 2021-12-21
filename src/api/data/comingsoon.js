import request from '@/util/request'

export function ComingsoonAPI () {
  return request({
    url: '/commingsoon',
    method: 'GET'
  })
}
