import * as React from "react";
import { Modal, Button, Form, Input, Item } from 'semantic-ui-react'
export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentTodo: props.data || {}
        }
        this.handleCreateTodo = this.handleCreateTodo.bind(this);
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    handleCreateTodo() {
        let { currentTodo } = this.state
        this.props.onCreate(currentTodo)
        this.handleOpen(false)
    }

    render() {
        const { isOpen, currentTodo } = this.state
        return (
            <Modal
                centered
                open={isOpen}
                onOpen={() => this.handleOpen(true)}
                onClose={() => this.handleOpen(false)}
                trigger={<Button>Create Todo</Button>}
            >
                <Modal.Header></Modal.Header>
                <Modal.Content>
                    <Form>
                        <h2>CreateTodo</h2>
                        <Form.Field>
                            <label>Todo Name</label>
                            <Input name='todoName' id='textbox_id' onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Code</label>
                            <Input name='todoCode' onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button className='create' onClick={this.handleCreateTodo}>Create</Button>
                    <Button className='close' onClick={() => this.handleOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
