import request from '@/util/request'

export function GetCommentsAPI () {
  return request({
    url: '/comments',
    method: 'GET'
  })
}
