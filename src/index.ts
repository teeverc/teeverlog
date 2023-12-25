import chalk from 'chalk'

const consoleLog = console.log
const consoleInfo = console.info
const consoleWarn = console.warn
const consoleError = console.error
const consoleDebug = console.debug


/**
 * This function logs messages with different log levels and colorizes them using chalk.
 *
 * @param {string} logLevel - The level of the log. It can be 'log', 'info', 'warn', 'error', or 'debug'.
 * @param {function} chalkFunc - The chalk function to use for colorizing the log message.
 * @param {...any} args - The messages to be logged. These can be of any type.
 *
 * @returns {void}
 */
const log = (
  logLevel: 'log' | 'info' | 'warn' | 'error' | 'debug',
  chalkFunc: chalk.Chalk,
  ...args: any[]
) => {
  // Prepend the log level to the arguments
  args.unshift(`[${logLevel.toUpperCase()}]:`)

  // Map through each argument
  args = args.map((arg) => {
    // If the argument is an instance of Error, return the stack trace or the message, colorized
    if (arg instanceof Error) {
      return chalkFunc(arg.stack || arg.message)
    }

    // If the argument is an object, return the stringified version of the object, colorized
    if (typeof arg === 'object') {
      return chalkFunc(JSON.stringify(arg, null, 2))
    }

    // For other types, convert the argument to a string and return the colorized version
    if (typeof arg === 'string') {
      return chalkFunc(`${arg}`)
    }

    return arg
  })

  // Prepend the current time to the arguments
  args.unshift(
    chalk.yellow.bold(
      `[${new Date().toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3,
      })}]:`
    )
  )

  // Log the arguments using the appropriate console function based on the log level

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
