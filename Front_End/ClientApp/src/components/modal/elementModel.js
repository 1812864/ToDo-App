import React, { Component } from 'react'
import './categoryModel.css'
import { Table, Icon, Modal } from 'semantic-ui-react'

class ElementModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentElement: Object.assign({}, props.elements)
        }
        this.handleDeleteElem = this.handleDeleteElem.bind(this)
    }

    handleDeleteElem() {
        let { currentElement } = this.state
        this.props.onDelete(currentElement)
    }

    render() {
        let { currentElement } = this.state
        return (
            <div className='mt-4'>
                <Table className='table_cates'>
                    <Table.Body className='table-cell-custom'>
                        <Table.Row >
                            <Table.Cell>{currentElement.elementName}</Table.Cell>
                        </Table.Row>
                        <Icon
                            name='delete'
                            onClick={this.handleDeleteElem}
                        />
                    </Table.Body>
                    <Table.Row className='table-cell-custom'>
                        <Table.Cell>Description: {currentElement.description}</Table.Cell>
                    </Table.Row>
                </Table>
            </div>
        )
    }
}
export default ElementModel