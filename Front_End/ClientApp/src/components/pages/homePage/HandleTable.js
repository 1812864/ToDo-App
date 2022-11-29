import { Button, Icon, Label, Menu, Table, Modal, Header, Image, } from "semantic-ui-react";
import React from "react";
import './HandleTable.css'
import TodoModal from "../../modal/todoModal";
import { Link } from 'react-router-dom';
import TodoPage from "../ToDoPage";

class HandleTable extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleHeaderTable() {
    return (
      <Table.Header className="table_Header">
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Code</Table.Cell>
          <Table.Cell>CreatedTime</Table.Cell>
          <Table.Cell>detail</Table.Cell>
        </Table.Row>
      </Table.Header>
    )
  }

  handleBodyTable(data) {
    return (
      data?.map((item,index) => {
        return (
          <Table.Body className="table2">
            <Table.Row >
              <Table.Cell><TodoModal key={index} data={item} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate} /></Table.Cell>
              <Table.Cell>{item?.code}</Table.Cell>
              <Table.Cell>{item?.createdTime}</Table.Cell>
              <Table.Cell><Link target='_blank' to={`/todo?todoId=${item.id}`}><Icon name="eye" /></Link></Table.Cell>
            </Table.Row>
          </Table.Body>
        )
      })
    )
  }

  render() {
    return (
      <div className="table1">
        <Table celled  >
          {this.handleHeaderTable()}
          {this.handleBodyTable(this.props.data)}
        </Table>
      </div>
    )
  }
}
export default HandleTable;