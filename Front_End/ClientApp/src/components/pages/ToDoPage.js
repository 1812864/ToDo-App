import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Menu, Input } from 'semantic-ui-react'
import { CategoryAPI } from "../services"
import { ElementAPI } from "../services"
import "./TodoPage.css"
class TodoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.location.href.split("=")[1],
            categorys: [],
            elements: []
        }
    }
    componentDidMount() {
        this.handleGetCategoryId()
        this.handleElemnetId()
    }
    handleItemClick() {
        window.close()
    }

    async handleGetCategoryId() {
        let { id } = this.state
        let res = await CategoryAPI.getTodoId(id)
        this.setState({ categorys: res.result })
    }
    async handleElemnetId() {
        let { id } = this.state
        let res = await ElementAPI.getTodoId(id)
        this.setState({ elements: res.result })
    }
    render() {
        const { id, categorys, elements, activeItem } = this.state
        return (
            <>
                <Menu >
                    <Menu.Item
                        name={'todopage'}
                    />
                    <Menu.Item
                        className='close'
                        name='close'
                        onClick={this.handleItemClick}
                    />
                </Menu>
                
                <div className='container-table'>
                    <div>
                        <h2>Category</h2>
                        <div className='fle-table-cates'>
                            <Table className='scr-table'>
                                {categorys.map((item, index) => {
                                    return (
                                        <div className='p-2' key={index}>
                                            {item.categoryName}
                                        </div>
                                    )
                                })}
                            </Table>
                        </div>
                    </div>

                    <div>
                        <h2>Element</h2>
                        <div className='fle-table-ele'>
                            <Table >
                                {elements.map((item, index) => {
                                    return (
                                        <div className='p-2' key={index}>
                                            <p>{item.elementName}</p>
                                        </div>
                                    )
                                })}
                            </Table>
                        </div>
                    </div>
                </div>
            </>


        )
    }
}
export default TodoPage