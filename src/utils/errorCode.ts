/**
 * @desc 错误码
 * @author justJokee
 */

export function errorCode(status: number, info?: string) {
  switch (status) {
    case 200:
      break
    case 401:
      window.$message.error(info as string)
      break
    case 402:
      window.$message.error(info as string)
      break
  }
}
