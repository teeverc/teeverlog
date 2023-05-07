import chalk from 'chalk'

const consoleLog = console.log
const consoleInfo = console.info
const consoleWarn = console.warn
const consoleError = console.error
const consoleDebug = console.debug

/**
 *  [Apr 8, 12:04:29.589 AM] [LOG]: hello world!
 */
const log = (
  logLevel: 'log' | 'info' | 'warn' | 'error' | 'debug',
  chalkFunc: chalk.Chalk,
  ...args: any[]
) => {
  args.unshift(`[${logLevel.toUpperCase()}]:`)

  args = args.map((arg) => {
    if (arg instanceof Error) {
      return chalkFunc(arg.stack || arg.message)
    }

    if (typeof arg === 'object') {
      // return arg
      return chalkFunc(JSON.stringify(arg, null, 2))
    }

    return chalkFunc(arg)
  })

  args.unshift(
    chalk.yellow.bold(
      `[${new Date().toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3,
        hour12: true
      })}]`
    )
  )

  // consoleLog(args)

  switch (logLevel) {
    case 'log':
      consoleLog(...args)
      break
    case 'info':
      consoleInfo(...args)
      break
    case 'warn':
      consoleWarn(...args)
      break
    case 'error':
      consoleError(...args)
      break
    case 'debug':
      consoleDebug(...args)
      break
    default:
      consoleLog(...args)
  }
}

console.log = (...args: any[]) => log('log', chalk.cyanBright, ...args)

console.info = (...args: any[]) => log('info', chalk.blueBright, ...args)

console.warn = (...args: any[]) => log('warn', chalk.yellowBright, ...args)

console.error = (...args: any[]) => log('error', chalk.redBright, ...args)

// console.debug = (...args: any[]) => log('debug', chalk.magentaBright, ...args)
