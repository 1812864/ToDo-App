import React, { Component } from 'react'
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react'
import { TodoAPI } from "../services"
import { CategoryAPI } from "../services"
class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownTodo: [],
            dropdownCategory: [],
            todoId: '',
            categoryId: null,
            currentCategory: {}
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleCreateCategory=this.handleCreateCategory.bind(this);
    }

    async componentDidMount() {
        this.loadDropdownTodo()
        // this.loadDropdownCategory()
    }

    async loadDropdownCategory() {
        const res = await CategoryAPI.getCatagorys()
        if (!res.error && res.result.length > 0) {
            res.result.map((item, index) => {
                item.text = item.categoryName
                item.value = item.id
                item.key = index
            })
            this.setState({ dropdownCategory: res.result })
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

    async createDropdownCategory(todoId) {
        const { result } = await CategoryAPI.getTodoId(todoId)
        result.map((item, index) => {
            item.text = item.categoryName
            item.value = item.id
            item.key = index
        })
        this.setState({ dropdownCategory: result })
    }

    handleChangeCategory(e, data) {
        this.setState({ categoryId: data.value })
    }

    handleChangeTodo(e, data) {
        const todoId = data.value
        this.createDropdownCategory(todoId)
        this.setState({ todoId })
    }

    async handleCreateCategory() {
        const { currentCategory, todoId, categoryId } = this.state
        this.handleOpen(false)
        let payload = { 
            categoryName: currentCategory.categoryName,
            code: currentCategory.code,
            todoId,
            parentId: categoryId,
        }
        const {result} = await CategoryAPI.createCatagorys(payload)
        this.props.onCreate(result)
        this.setState({categoryId: null})
    }

    handleChange(e, data) {
        let { currentCategory } = this.state
        let name = data.name
        let value = data.value
        if (name === 'categoryName') {
            currentCategory.categoryName = value
        } else if (name === 'categoryCode') {
            currentCategory.code = value
        }
        this.setState({ currentCategory:currentCategory })
    }

    render() {
        const { isOpen, dropdownTodo, dropdownCategory,currentCategory } = this.state
        console.log(currentCategory);          
        return (
            <Modal
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button >Create Category</Button>}
            >
                <Modal.Header>Create Category</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Category Name</label>
                            <Input name = 'categoryName' placeholder='Category Name' onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Code</label>
                            <Input name = 'categoryCode' placeholder='Code' onChange={this.handleChange}/>
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
                                placeholder='Select a Category'
                                fluid
                                selection
                                scrolling
                                options={dropdownCategory}
                                onChange={this.handleChangeCategory}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleCreateCategory} className='create' >Create</Button>
                    <Button className='close' onClick={() => this.handleOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default CreateCategory