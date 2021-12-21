import request from '@/util/request'

export function NowplayingAPI (current) {
  return request({
    url: `nowplaying?_page=${current}&_limit=10`,
    method: 'GET'
  })
}
