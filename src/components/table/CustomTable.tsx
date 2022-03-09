import React from "react";
import MaterialTable from "@material-table/core";

interface IProps {
  data: any;
  deleteJob(e: any): void;
  handleEditData(index: number): void;
}
const jobPriorityList = [
  { id: 1, name: "Urgent" },
  { id: 2, name: "Regular" },
  { id: 3, name: "Trivial" },
];
export class CustomTable extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="Job List"
          columns={[
            {
              title: "Job Name",
              field: "jobName",
            },
            {
              title: "Job Priority",
              field: "jobPriority",
              lookup: { 1: "Urgent", 2: "Regular", 3: "Trivial" },
              customSort: (a, b) => a.jobPriority - b.jobPriority,
              defaultSort: "asc",
              render: (rowData) => (
                <div
                  className="job-priority-cell"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: 600,
                    backgroundColor:
                      rowData.jobPriority === 1
                        ? "red"
                        : rowData.jobPriority === 2
                        ? "#edc42f"
                        : "blue",
                  }}
                >
                  {
                    jobPriorityList.find(
                      (value) => value.id === rowData.jobPriority
                    )?.name
                  }
                </div>
              ),
            },
          ]}
          data={this.props.data}
          actions={[
            {
              icon: "save",
              tooltip: "Edit Job",
              onClick: (event, oldData: any) => {
                const index = oldData.tableData.id;

                this.props.handleEditData(index);
              },
            },
            (rowData) => ({
              icon: "delete",
              tooltip: "Delete Job",
              onClick: (event, oldData: any) => {
                const index = oldData.tableData.id;
                this.props.deleteJob(index);
              },
            }),
          ]}
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
          }}
        />
      </div>
    );
  }
}
