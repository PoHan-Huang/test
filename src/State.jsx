import * as React from "react";
import * as Ant from "antd";
import 'antd/dist/antd.css';

function State(props) {
  const {list, loading, citySelect} = props;
  const columns = [
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => {
        if (text === citySelect) {
          return (
            <b style={{color: `red`}}>{text}</b>
          )
        } else {
          return (
            <span>{text}</span>
          )
        }
      }
    },
    {
      title: "Houses",
      dataIndex: "houses",
      key: "houses"
    },
    {
      title: "Avg. Price",
      dataIndex: "avgPrice",
      key: "avgPrice",
    }
  ];

  return (
    <Ant.Table
      dataSource={list}
      columns={columns}
      bordered
      loading={loading}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5
      }}
    />
  );
}


export default State;