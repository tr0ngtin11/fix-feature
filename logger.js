export default function withLogger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('prev state: ', prevState)
        console.log('Action arguments: ', args)
        const nextState = reducer(prevState, action, args)
        console.log('next state: ', nextState)
        console.groupEnd()
        return nextState // return xong thì lúc add tiếp cái state này thành state cũ
    }
}