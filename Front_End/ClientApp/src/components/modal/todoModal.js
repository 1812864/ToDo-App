import React, { Component } from 'react'
import { Modal, Button, Form, Input, Header, Image } from 'semantic-ui-react'
class TodoModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            currentTodo: Object.assign({}, props.data),
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.currentTodo !== nextProps.data) {
            this.setState({
                currentTodo: Object.assign({}, nextProps.data)
            })
        }
    }

    handleOpen(isOpen) {
        this.setState({ isOpen: isOpen })
    }

    handleChange(e, data) {
        let { currentTodo } = this.state
        let name = data.name
        let value = data.value
        if (name === 'todoName') {
            currentTodo.todoName = value
        } else if (name === 'todoCode') {
            currentTodo.code = value
        }
        this.setState({ currentTodo: currentTodo })
    }

    handleUpdateTodo(data) {
        let { currentTodo } = this.state
        let name = data.name
        let value = data.value
        if (name === 'todoName') {
            currentTodo.todoName = value
        } else if (name === 'todoCode') {
            currentTodo.code = value
        }
        this.props.onUpdate(currentTodo)
        this.handleOpen(false)
    }

    handleDeleteTodo() {
        let { currentTodo } = this.state
        this.props.onDelete(currentTodo)
        this.handleOpen(false)
        this.setState({ open: false })
    }

    render() {
        const { isCreate, data } = this.props
        const { isOpen, currentTodo } = this.state
        return (
            <Modal
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button content={isCreate ? 'Create Todo' : data.todoName} />}
            >
                {/* <Confirm
                    open={this.state.handleDeleteTodo}
                    onCancel={this.handleOpen(false)}
                    onConfirm={this.handleOpen(false)}
                /> */}
                <Modal.Header>{data.todoName}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Todo Name</label>
                            <Input name='todoName' ref="update" id='textbox_id' placeholder='Todo Name' defaultValue={isCreate ? '' : currentTodo.todoName} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Code</label>
                            <Input name='todoCode' placeholder='Todo Code' defaultValue={isCreate ? '' : currentTodo.code} onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button className='update' onClick={(e) => {
                        const data = document.getElementById('textbox_id').value;
                        this.handleUpdateTodo(data)
                    }}>Update</Button>
                    <Modal
                        className='confirm-modal'
                        onOpen={() => this.handleOpen(true)}
                        onClose={() => this.handleOpen(false)}
                        // open={this.handleOpen}
                        trigger={<Button>Delete</Button>}
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
                                onClick={this.handleDeleteTodo}
                            />
                        </Modal.Actions>
                    </Modal>
                    <Button className='close' onClick={() => this.handleOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default TodoModal