import React from "react";
import { connect } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

interface IProps {
  createJob(e: any): void;
}

interface IState {
  jobName: string;
  jobPriority: number;
}

export class CreateForm extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      jobName: "",
      jobPriority: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobNameChange = this.handleJobNameChange.bind(this);
    this.handleJobPriorityChange = this.handleJobPriorityChange.bind(this);
  }

  // submit button event
  private async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const job = {
      jobName: this.state.jobName,
      jobPriority: this.state.jobPriority,
    };

    this.props.createJob(job);

    this.setState((previous) => ({
      ...previous,
      jobName: "",
      jobPriority: 1,
    }));
  }

  private handleJobNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.setState((previous) => ({
      ...previous,
      [name]: value,
    }));
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
      <Form onSubmit={this.handleSubmit}>
        <div className="form-container d-flex justify-content-center align-items-center">
          <Col xs={12} lg={8} sm={7}>
            <Form.Group>
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                type="text"
                name="jobName"
                value={this.state.jobName}
                onChange={this.handleJobNameChange}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={3} sm={3} className="mx-2">
            <Form.Group>
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
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={1}
            sm={2}
            className="d-flex align-self-end justify-content-center"
          >
            <Form.Group className="w-100">
              <Button className="w-100" type="submit">
                Create
              </Button>
            </Form.Group>
          </Col>
        </div>
      </Form>
    );
  }
}

export default connect((state: any) => state, null)(CreateForm as any);
