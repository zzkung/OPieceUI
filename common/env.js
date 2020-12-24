// local,real
export const env = 'local'

export const host = getHost_dev()
export const imghost = getHost_dev()
export const imghttp = getHost_dev() + '/AppImg/OPieceImg'

export const smt = []

function getHost_dev() {
  switch (env) {
    case 'local':
      return 'https://blog.zzkung.com'
    case 'real':
      return 'https://blog.zzkung.com'
  }
}