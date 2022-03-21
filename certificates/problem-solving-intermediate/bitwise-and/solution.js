function authEvents(events) {
  // Write your code here

  const codeStr =
    ' abcdefghijklmlopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const M = 1000000007
  const P = 131
  const PP = []
  const answer = []
  let candidates = []
  const init = () => {
    let v = 1
    PP.push(1)
    for (let i = 1; i < 11; i++) {
      v = (v * P) % M
      PP.push(v)
    }
  }

  init()

  const calculationHash = (str) => {
    let value = 0
    const revStr = str.split('').reverse().join('')

    const len = revStr.length
    for (let i = 0; i < len; i++) {
      const ch = revStr.charCodeAt(i)
      value = value + ch * PP[i]
    }
    return value % M
  }

  const handleEvent = (command, value) => {
    if (command == 'setPassword') {
      candidates = []

      for (const ch of codeStr) {
        const vCh = (value + ch).trim()
        const hash = calculationHash(vCh)
        candidates.push(hash)
      }
    } else if (command == 'authorize') {
      if (candidates.find((v) => v == value) >= 0) {
        answer.push(1)
      } else {
        answer.push(0)
      }
    }
  }

  events.forEach((e) => handleEvent(...e))
  return answer
}
