if(typeof(window.customEvents) == 'undefined')
    window.customEvents = {}

function Observe (eventName, callback) {
    let event = window.customEvents[eventName]
    if(typeof(event) == 'undefined')
        window.customEvents[eventName] = {state : false, callbacks : [callback]}
    else
    {
        event.callbacks.push(callback)
        if(event.state == true)
        {
            callback()
        }
    }
}
function Trigger(eventName, arg)
{
    let event = window.customEvents[eventName]
    if(typeof(event) == 'undefined')
    {
        window.customEvents[eventName] = {state : true, callbacks : []}
    }
    else
    {
        for(let i = 0; i < event.callbacks.length; i++)
        {
            event.callbacks[i](arg);
        }
        event.state = true
    }

}


module.exports = {
    Trigger : Trigger,
    Observe : Observe
}