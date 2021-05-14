export default class Validate {
  static onExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function'
    if (onExpire && !isValid) {
      console.warn('bdt-coach: { useTimer } Invalid onExpire settings function', onExpire)
    }
    return isValid
  }
}
