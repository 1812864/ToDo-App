import React, { Component } from 'react'
import './categoryModel.css'
import { Table, Icon, Modal } from 'semantic-ui-react'
class CategoryModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: Object.assign({}, props.categorys)
        }
        this.handleDeleteCate = this.handleDeleteCate.bind(this)
    }

    handleDeleteCate() {
        let { currentTodo } = this.state
        this.props.onDelete(currentTodo)
        this.handleOpen(false)
    }

    render() {
        let { currentCategory } = this.state
        return (
            <div className='mt-2'>
                <Table className='table_cates'>
                    <Table.Body className='table-cell-custom'>
                        <Table.Row>
                            <Table.Cell>{currentCategory.categoryName}</Table.Cell>
                        </Table.Row>
                        <Icon
                            name='delete'
                            onClick={this.handleDeleteCate}
                        />
                    </Table.Body>
                </Table>
            </div>
        )
    }
}
export default CategoryModel