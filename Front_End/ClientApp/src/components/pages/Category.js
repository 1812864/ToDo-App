import React from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react'
import './Category.css'
import { CategoryAPI } from "../services"
import { TodoAPI } from "../services"
import CategoryModel from '../modal/categoryModel'
import { Link } from 'react-router-dom';
import CreateCategory from './CreateCategory';
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: [],
            dropdown: [],
            categorys: [],
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

    async loadCategory(todoId) {
        let res = await CategoryAPI.getTodoId(todoId)
        let categorys = res.result || []
        this.setState({ categorys: categorys })
    }

    handleChangeTodo(e, data) {
        let todoId = data.value
        this.loadCategory(todoId)
        this.setState({ newDropdownOption: todoId })
    }


    async onCreate(curCategory) {
        const { categorys } = this.state
        if (curCategory.todoId === this.state.newDropdownOption) {
            categorys.push(curCategory)
            this.setState({ categorys: categorys })
        }
    }
    async onDelete(curCategory) {
        const id = curCategory.id
        const { categorys } = this.state
        let res = await CategoryAPI.deleteCatagorys(curCategory, id)
        this.setState({ categorys: categorys.filter(category => category.id !== id) })
    }

    render() {
        const { dropdown, categorys, isOpen } = this.state
        // console.log(categorys)
        return (
            <div
                className='category'
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button>category</Button>}
            >
                {/* menu */}
                <Modal.Actions className='catagory-menu'>
                    <CreateCategory onCreate={this.onCreate} />
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
                    {categorys.map((item, index) => {
                        return (
                            <CategoryModel key={index} categorys={item} onDelete={this.onDelete}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Category;