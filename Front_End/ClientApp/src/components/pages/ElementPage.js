import React from 'react';
import { Modal, Button, Dropdown } from 'semantic-ui-react'
import './Category.css'
import { ElementAPI } from "../services"
import { TodoAPI } from "../services"
import ElementModel from '../modal/elementModel'
import { Link } from 'react-router-dom'
import CreateElement from './CreateElement'

class ElementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: [],
            dropdown: [],
            elements: [],
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChangeTodo = this.handleChangeTodo.bind(this)
        this.onCreate = this.onCreate.bind(this)
        this.onDelete=this.onDelete.bind(this)
    }

    async componentDidMount() {
        const res = await TodoAPI.getTodos()
        if (!res.error && res.result.length > 0) {
            res.result.map((item, index) => {
                item.text = item.todoName
                item.value = item.id
                item.key = index
            })
            this.setState({ dropdown: res.result })
        }
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    async createDropdown() {
        const res = await TodoAPI.getTodos()
        const newDropdownOption = res.map((item, index) => {
            item.text = item.todoName
            item.value = item.id
            item.key = item.index
        })
        this.setState({ dropdown: newDropdownOption })
    }

    async loadElement(todoId) {
        let res = await ElementAPI.getTodoId(todoId)
        let elements = res.result || []
        this.setState({ elements: elements })
    }

    handleChangeTodo(e, data) {
        let todoId = data.value
        this.loadElement(todoId)
        this.setState({ newDropdownOption: todoId })
    }


    async onCreate(curElement) {
        const { elements } = this.state
        if (curElement.todoId === this.state.newDropdownOption) {
            elements.push(curElement)
            this.setState({ elements: elements })
        }
    }
    async onDelete(curElement) {
        const id = curElement.id
        const { elements } = this.state
        let res = await ElementAPI.deleteElements(curElement, id)
        this.setState({ elements: elements.filter(element => element.id !== id) })
    }

    render() {
        const { dropdown, elements, isOpen } = this.state
        console.log(elements)
        return (
            <div
                className='category'
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button>Element</Button>}
            >
                {/* menu */}
                <Modal.Actions className='catagory-menu'>
                    <CreateElement onCreate={this.onCreate} />
                    <Button className='close' as={Link} to='/'>Close</Button>
                </Modal.Actions>

                {/* dopdown */}
                <div className='dopdown-category'>
                    <Dropdown
                        placeholder='Select a todo'
                        fluid
                        selection
                        scrolling
                        options={dropdown}
                        onChange={this.handleChangeTodo}
                    />
                    {elements.map((item, index) => {
                        return (
                            <ElementModel key={index} elements={item} onDelete={this.onDelete}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ElementPage;