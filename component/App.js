import html from '../core.js'
import Header from '../component/Header.js'
import TodoList from '../component/TodoList.js'
import Footer from '../component/Footer.js'
import { connect } from '../store.js' // phải có thằng connect mới kết nối dc data trong store ( { todos })

function App({ todos }) { 
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodoList()}
            ${todos.length > 0 && Footer()}
        </section>
    `
}


export default connect()(App) 