import user from '@/util/user'
export function RegisterAPI (url, userInfo) {
  return user({
    url: url,
    method: 'POST',
    data: { ...userInfo }
  })
}
