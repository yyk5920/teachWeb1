import request from '@/utils/request'
// export function mipsadd(query) {
//     return request({
//       url: '/mips-add',
//       method: 'post',
//       params: query
//     })
//   }

export function mipsadd(query) {
    return request({
      url: '/mips-add',
      method: 'post',
      data: query
    })
  }
  export function mipstitle(query) {
    return request({
      url: '/mips-title',
      method: 'post',
      data: query
    })
  }
  export function mipsview() {
    return request({
      url: '/mips-view',
      method: 'post',
    })
  }
  
export function mipstext(query) {
  return request({
    url: '/mips-text',
    method: 'post',
    data: query
  })
}
  // export function getmipstitle(query) {
  //   return request({
  //     url: '/mips-title',
  //     method: 'post',
  //     params: query
  //   })
  // }