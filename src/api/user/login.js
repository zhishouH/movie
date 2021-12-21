import user from '@/util/user'

export function LoginAPI (url, userInfo) {
  return user({
    url: url,
    method: 'POST',
    data: { ...userInfo }
  })
}
