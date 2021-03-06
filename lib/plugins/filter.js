const Plugin = require('../plugin')

module.exports = class Filter extends Plugin {
  filter (context, fn) {
    const result = fn(context.event, context)
    return result === false ? context.halt() : result
  }

  then (context, fn) {
    return fn(context.event, context)
  }

  on (context, ...events) {
    const event = context.event
    const res = events.find(e => {
      const [name, action] = e.split('.')
      return name === event.event && (!action || action === event.payload.action)
    })

    return res ? Promise.resolve(res) : context.halt()
  }
}
