import React, { Component } from 'react'
import './categoryModel.css'
import { Table, Icon, Button,Modal } from 'semantic-ui-react'
class CategoryModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: Object.assign({}, props.categorys)
        }
        this.handleDeleteCate = this.handleDeleteCate.bind(this)
        this.handleOpen=this.handleOpen.bind(this)
    }
    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    handleDeleteCate() {
        let { currentCategory } = this.state
        this.props.onDelete(currentCategory)
    }

    render() {
        let { currentCategory } = this.state
        console.log(currentCategory)
        return (
            <div className='mt-4'>
                <Table className='table_cates'>
                    <Table.Body className='table-cell-custom'>
                        <Table.Row >
                            <Table.Cell>{currentCategory.categoryName}</Table.Cell>
                        </Table.Row>

                        <Modal
                            className='confirm-modal'
                            onOpen={() => this.handleOpen(true)}
                            onClose={() => this.handleOpen(false)}
                            trigger={<Button className='btn-delete'><Icon name='delete'/></Button>}
                        >
                            <Modal.Content className='cen-text'>

                                <Modal.Description>
                                    <h2>Are you sure for delete</h2>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' onClick={() => this.handleOpen(false)}>
                                    Nope
                                </Button>
                                <Button
                                    content="Yep"
                                    labelPosition='right'
                                    icon='checkmark'
                                    positive
                                    onClick={this.handleDeleteCate}
                                />
                            </Modal.Actions>
                        </Modal>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}
export default CategoryModel