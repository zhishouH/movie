import request from '@/util/request'

export function DetailAPI (id) {
  return request({
    url: `/detail?filmId=${id}`
  })
}
