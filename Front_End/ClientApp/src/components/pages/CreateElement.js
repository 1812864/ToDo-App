import React, { Component } from 'react'
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react'
import { TodoAPI } from "../services"
import { ElementAPI } from "../services"
import SemanticDatepicker from 'react-semantic-ui-datepickers';
class CreateElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownTodo: [],
            dropdownElement: [],
            data:null,
            todoId: '',
            elementId: null,
            dueDate: '',
            currentElement: {}
        }
        this.handleChangeElement = this.handleChangeElement.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleCreateElement=this.handleCreateElement.bind(this);
    }

    async componentDidMount() {
        this.loadDropdownTodo()
        // this.loadDropdownElement()
    }

    async loadDropdownElement() {
        const res = await ElementAPI.getElements()
        if (!res.error && res.result.length > 0) {
            res.result.map((item, index) => {
                item.text = item.elementName
                item.value = item.id
                item.key = index
            })
            this.setState({ dropdownElement: res.result })
        }
    }
    
    async loadDropdownTodo() {
        const res = await TodoAPI.getTodos()
        if (!res.error && res.result.length > 0) {
            res.result.map((item, index) => {
                item.text = item.todoName
                item.value = item.id
                item.key = index
            })
            this.setState({ dropdownTodo: res.result })
        }
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    async createDropdownTodo() {
        const res = await TodoAPI.getTodos()
        const newDropdownOption = res.map((item, index) => {
            item.text = item.todoName
            item.value = item.id
            item.key = item.index
        })
        this.setState({ dropdownTodo: newDropdownOption })
    }

    async createDropdownElement(todoId) {
        const { result } = await ElementAPI.getTodoId(todoId)
        result.map((item, index) => {
            item.text = item.elementName
            item.value = item.id
            item.key = index
        })
        this.setState({ dropdownElement: result })
    }

    handleChangeElement(e, data) {
        this.setState({ elementId: data.value })
    }

    handleChangeTodo(e, data) {
        const todoId = data.value
        this.createDropdownElement(todoId)
        this.setState({ todoId })
    }

    async handleCreateElement() {
        const { currentElement, todoId, elementId } = this.state
        this.handleOpen(false)
        let payload = { 
            elementName: currentElement.elementName,
            description: currentElement.description,
            todoId,
            parentId: elementId,
        }
        const {result} = await ElementAPI.createElements(payload)
        this.props.onCreate(result)
        this.setState({elementId: null})
    }

    handleChange(e, data) {
        let { currentElement } = this.state
        let name = data.name
        let value = data.value
        if (name === 'elementName') {
            currentElement.elementName = value
        } else if (name === 'description') {
            currentElement.description = value
        } else if (name === 'dueDate') {
            currentElement.dueDate = value
        }
        this.setState({ currentElement:currentElement })
    }

    render() {
        const { isOpen, dropdownTodo, dropdownElement,currentElement } = this.state
        console.log(currentElement);          
        return (
            <Modal
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button >Create Element</Button>}
            >
                <Modal.Header>Create Element</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Element Name</label>
                            <Input name = 'elementName' placeholder='Element Name' onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <Input name = 'description' placeholder='Description' onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>DueDate</label>
                            <SemanticDatepicker name='dueDate' onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                placeholder='Select a todo'
                                fluid
                                selection
                                scrolling
                                options={dropdownTodo}
                                onChange={this.handleChangeTodo}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                placeholder='Select a Element'
                                fluid
                                selection
                                scrolling
                                options={dropdownElement}
                                onChange={this.handleChangeElement}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleCreateElement} className='create' >Create</Button>
                    <Button className='close' onClick={() => this.handleOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default CreateElement