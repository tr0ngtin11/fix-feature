export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, curr) => acc.concat(curr, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0) // lọc ra những giá trị là truth nhưng khác chữ true và số 0 vẫn dc chấp nhận
    .join('')
} // hàm html này dùng nhiều nên mới export default nha, chỉ default dc 1 lần

export function createStore(reducer) {
    let state = reducer() // những cái trong store
    const roots = new Map() 

    function render() {
        for (const [root, component] of roots) {
            const output = component() // component là func return ra chuỗi html
            root.innerHTML = output
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component) // hàm set là của cái Map(), khi mà set xong thì roots có dữ liệu => gọi hàm render thì sẽ map qua
            // và nó render ra view
            render()
        },
        connect(selector = state => state) { // nếu func connect ko truyền đối số thì mặc định selector sẽ nhận 1 arrow func
            // vs đối số là state và return state lun, còn nếu truyền đối số thì đối số là selector
            return component => (props, ...args) => // props là những cái công cụ, dữ liệu muốn truyền vào component sau này
                   component(Object.assign({}, props, selector(state), ...args)) // obj hợp nhất bởi props, state và args
                   // ở bên chỗ App là cái { cars }
            // return về 1 arrow func, arrow func này lại return về 1 arrow func nữa
        },
        dispatch(action,...args) { // nhận cái hành động(hành động đó là j), rồi các dữ liệu j khác, như thêm thì đẩy cái data cần thêm,
            // xóa thì cần đẩy cái index hay cái j cần xóa chẳng hạn
            state = reducer(state, action, args) // reducer trc đó return về state, nên nó cần phải nhận lại chính gtri lần trc nó return
            // reducer dựa vào action r đi sửa cái state, r return lại cái state mới => store dc update lại
            render()
        }
    }
}