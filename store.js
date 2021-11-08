import { createStore } from './core.js' // import cái trong {} là import cái thường, còn import thẳng luôn như html là import cái default
import reducer from './reducer.js'
import withLogger from './logger.js'

const { attach, connect, dispatch } = createStore(withLogger(reducer))

window.dispatch = dispatch 

export {
    attach,
    connect
}