class EventHub {
  constructor() {
    // {
    //    "CREATE": [callback1, callback2],
    //    "UPDATE": [callback1, callback2],
    // }
    this.eventToCallbacksMap = new Map()
  }

  publish(event, data) {
    this._getCallbacks(event).forEach(callback=>{
      callback(data)
    })
  }

  subscribe(event, callback) {
    this._getCallbacks(event).push(callback)
  }

  _getCallbacks(event) {
    if (!this.eventToCallbacksMap.has(event)) {
      this.eventToCallbacksMap.set(event, [])
    }
    return this.eventToCallbacksMap.get(event)
  }
}

// EventHub.subscribe("CREATE", data=>{console.log(data)})
// EventHub.publish("CREATE", {"roomId": 1}})

const eventHub = new EventHub();
module.exports = {
  eventHub
}