import React from "react";
import { connect } from "react-redux";
import { Form, Modal, Button, Row } from "react-bootstrap";

interface IProps {
  showModal: boolean;
  data: any;
  editJob(value: number): void;
  handleClose(): void;
}

interface IState {
  jobName: string;
  jobPriority: number;
}

export class EditModal extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      jobName: "",
      jobPriority: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobPriorityChange = this.handleJobPriorityChange.bind(this);
  }

  componentDidMount() {
    this.setState((previous) => ({
      ...previous,
      jobName: this.props.data.jobName,
      jobPriority: this.props.data.jobPriority,
    }));
  }

  // submit button event
  private handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.editJob(this.state.jobPriority);
    this.props.handleClose();
  }

  private handleJobPriorityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    this.setState((previous) => ({
      ...previous,
      [name]: parseInt(value),
    }));
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <Row>
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                type="text"
                name="jobName"
                value={this.state.jobName}
                disabled
              />
            </Row>
            <Row>
              <Form.Label>Job Priority</Form.Label>
              <Form.Select
                name="jobPriority"
                value={this.state.jobPriority}
                onChange={this.handleJobPriorityChange}
              >
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </Form.Select>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect((state: any) => state, null)(EditModal as any);
