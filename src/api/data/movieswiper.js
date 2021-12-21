import request from '@/util/request'

export function MovieswiperAPI () {
  return request({
    url: '/swiper',
    method: 'GET'
  })
}
