// dev,prod
export const env = 'dev'
export const dev_server = 'local'

export const host_dev = getHost_dev()
export const host_real = 'https://blog.zzkung.com'
export const imghost = host_real
export const imghttp = host_real + '/AppImg/jMeii_img'

export const smt = []

function getHost_dev() {
  switch (dev_server) {
    case 'local':
      return 'https://blog.zzkung.com'
    case 'real':
      return 'https://blog.zzkung.com'
  }
}