import React from "react"
import { TodoAPI } from "../services"
import 'semantic-ui-css/semantic.min.css'
import HandleTable from './homePage/HandleTable'
import { NavMenu } from "../NavMenu";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            categories: []
        }
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    async componentDidMount() {
        const res = await TodoAPI.getTodos()
        this.setState({ data: res.result || [] })
    }

    async onUpdate(currentTodo) {
        const id = currentTodo.id
        let res = await TodoAPI.updateTodos(currentTodo, id)
        if (res) {
            var foundIndex = this.state.data.findIndex(x => x.id == res.result.id);
            this.state.data[foundIndex] = res.result;
            this.setState({ data: this.state.data });
        }
    }

    async onCreate(currentTodo) {
        let res = await TodoAPI.createTodos(currentTodo)
        let { data } = this.state
        if ( res.result) {
            data.push(res.result)
            this.setState({ data: data })
        }
    }

    async onDelete(currentTodo) {
        const id = currentTodo.id
        let res = await TodoAPI.deleteTodos(currentTodo, id)
        this.setState({ data: this.state.data.filter(data => data.id !== id) })
    }

    render() {
        let { data } = this.state
        return (
            <>
                <NavMenu onCreate={this.onCreate} />

                <HandleTable data={data} onDelete={this.onDelete} onUpdate={this.onUpdate} />
            </>
        )
    }
}
export default HomePage;
