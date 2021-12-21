import request from '@/util/request'

export function SetCommentsAPI (info) {
  return request({
    url: '/comments',
    method: 'POST',
    data: info
  })
}
