import * as React from "react";
import "./mock";
import * as Ant from "antd";
import 'antd/dist/antd.css';

function App() {
  const [datasource, setDataSource] = React.useState([
    {
      key: 1,
      State: 'state',
      City: 'city',
      Houses: 'Houses',
      "Avg. Price": 'Avg. Price',
    }
  ]);
  const [isLoading, setIsLoading] = React.useState(true);
  const columns = [
    {
      title: "State",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City"
    },
    {
      title: "Houses",
      dataIndex: "Houses",
      key: "Houses"
    },
    {
      title: "Avg. Price",
      dataIndex: "Avg. Price",
      key: "Avg. Price"
    }
  ]

  React.useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          let filter = result?.data.filter((item) => {
            return item?.state === 'Georgia';
          });
          console.log('filter', filter)
          let map = filter.map((item, idx, arr) => {
            console.log(item)
            let n = 1;
            arr.map((i) => {
              n = item.city === i.city ? n + 1 : 1;
            })
            console.log(item.city, n)
          })
          // setDataSource(result);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      )
  });


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
    {isLoading ?
      <Ant.Spin size="large" tip="Loading.."/>
      :
      <Ant.Table dataSource={datasource} columns={columns} />
    }
    </div>
  );
}


export default App;