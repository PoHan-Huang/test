import * as React from "react";
import * as Ant from "antd";
import 'antd/dist/antd.css';
import { Wrapper, Flex } from "./styled";
import State from "./State.jsx";
import "./mock";

function App() {
  const [originData, setOriginData] = React.useState([]);
  const [datasource, setDataSource] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stateData, setStateData] = React.useState([]);
  const [stateSelect, setStateSelect] = React.useState("Georgia");
  const [citySelect, setCitySelect] = React.useState("all");
  const [typeSelect, setTypeSelect] = React.useState("all");
  const [priceSelect, setPriceSelect] = React.useState("all");
  const [filterData, setFilterData] = React.useState([]);
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
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, row) => {
        const filter = datasource.filter(item => item.city === row.city);
        if (text >= filter[0]?.avgPrice * 1.2) {
          return (
            <span style={{color: `red`}}>{text}</span>
          )
        } else if (text <= filter[0]?.avgPrice * 0.8) {
          return (
            <span style={{color: `green`}}>{text}</span>
          )
        } else {
          return (
            <span>{text}</span>
          )
        }
      }
    }
  ];

  const handleStateChange = value => {
    setStateSelect(value);
    let filter = originData.filter(item => {
      return item.state === value;
    });
    setFilterData(filter);
    setCitySelect("all");
    setTypeSelect("all");
    setPriceSelect("all");
    onStateFilter(value, originData);
  };

  const handleCityChange = value => {
    setCitySelect(value);
    let filter;
    if (value === "all") {
      if (typeSelect === "all" && priceSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.price === priceSelect
          });
      } else if (typeSelect !== "all" && priceSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.type === typeSelect
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
      }
    } else {
      if (typeSelect === "all" && priceSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === value
          })
          .filter(item => {
            return item.price === priceSelect
          });
      } else if (typeSelect !== "all" && priceSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === value
          })
          .filter(item => {
            return item.type === typeSelect
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === value
          });
      }
    }
    setFilterData(filter);
  };

  const handleTypeChange = value => {
    setTypeSelect(value);
    let filter;
    if (value === "all") {
      if (citySelect === "all" && priceSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.price === priceSelect
          });
      } else if (citySelect !== "all" && priceSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === citySelect
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
      }
    } else {
      if (citySelect === "all" && priceSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.type === value
          })
          .filter(item => {
            return item.price === priceSelect
          });
      } else if (citySelect !== "all" && priceSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === citySelect
          })
          .filter(item => {
            return item.type === value
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.type === value
          });
      }
    }
    setFilterData(filter);
  }

  const handlePriceChange = value => {
    setPriceSelect(value);
    let filter;
    let end = value !== "all" ? value + 99 : 0;
    if (value === "all") {
      if (citySelect === "all" && typeSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.type === typeSelect
          });
      } else if (citySelect !== "all" && typeSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === citySelect
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
      }
    } else {
      if (citySelect === "all" && typeSelect !== "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.type === typeSelect
          })
          .filter(item => {
            return item.price >= value && item.price <= end
          });
      } else if (citySelect !== "all" && typeSelect === "all") {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.city === citySelect
          })
          .filter(item => {
            return item.price >= value && item.price <= end
          });
      } else {
        filter = originData
          .filter(item => {
            return item.state === stateSelect
          })
          .filter(item => {
            return item.price >= value && item.price <= end
          });
      }
    }
    setFilterData(filter);
  }

  const onStateFilter = (state, list) => {
    let key = 0;
    const output = list
      .filter((item) => {
        if (state) {
          return item?.state === state
        } else {
          return item
        }
      })
      .reduce((previousValue, currentValue) => {
        if (previousValue?.find((item) => item.city === currentValue.city)) {
          previousValue = previousValue.map((item) => {
            if (item.city === currentValue.city) {
              return ({
                key: item.key,
                houses: item.houses + 1,
                priceTotal: item.priceTotal + currentValue.price,
                avgPrice: Math.round((item.priceTotal + currentValue.price) / (item.houses + 1)),
                ...currentValue
              })
            }
            return item
          });
        } else {
          previousValue.push({
            key: key++,
            state: currentValue.state,
            city: currentValue.city,
            houses: 1,
            priceTotal: currentValue.price,
            avgPrice: currentValue.price,
          })
        }
        return previousValue
      }, []);
    setDataSource(output);
  };

  React.useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(
        (result) => {
          const output = result?.data.map((item, idx) => {
            return ({
              key: idx,
              ...item,
            })
          });
          setOriginData(output);
          setFilterData(output.filter(item => {return item.state === stateSelect}));
          onStateFilter(stateSelect, output);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      )
  },[]);

  React.useEffect(() => {
    let key = 0;
    const newArr = originData.reduce((previousValue, currentValue) => {
      if (previousValue?.find((item) => item?.state === currentValue.state)) {
        previousValue = previousValue.map((item) => {
          if (item?.state === currentValue.state) {
            item = {
              key: item.key,
              state: item.state,
              data: [
                {
                  city: currentValue.city,
                  type: currentValue.type,
                  price: currentValue.price,
                },
                ...item.data
              ],
              priceTotal: item.priceTotal + currentValue.price,
              avgPrice: Math.round((item.priceTotal + currentValue.price) / (item.data.length + 1))
            }
          }
          return item
        });
      } else {
        previousValue.push({
          key: key++,
          state: currentValue.state,
          data: [{
            city: currentValue.city,
            type: currentValue.type,
            price: currentValue.price,
          }],
          priceTotal: currentValue.price,
          avgPrice: currentValue.price
        })
      }
      return previousValue;
    },[])
    setStateData(newArr);
  },[originData]);

  return (
    <Wrapper className={isLoading && "justify-content-center"}>
    {isLoading ?
      <Ant.Spin size="large" tip="Loading.."/>
      :
      <>
      <div className="table">
        <State list={datasource} loading={isLoading} citySelect={citySelect}/>
        <Flex className="select">
          <Ant.Select defaultValue={stateSelect} onChange={handleStateChange}>
            {stateData.map((item, idx) => (
              <Ant.Select.Option key={idx} value={item.state}>{item.state}</Ant.Select.Option>
            ))}
          </Ant.Select>
          <Ant.Select value={citySelect} onChange={handleCityChange}>
            <Ant.Select.Option key={"all"} value={"all"}>All</Ant.Select.Option>
            {datasource
              .map((item, idx) => (
                <Ant.Select.Option key={idx} value={item.city}>{item.city}</Ant.Select.Option>
              ))
            }
          </Ant.Select>
          <Ant.Select value={typeSelect} onChange={handleTypeChange}>
            <Ant.Select.Option key={"all"} value={"all"}>All</Ant.Select.Option>
            {originData
              .reduce((previousValue, currentValue) => {
                if (previousValue?.find((item) => item === currentValue.type)) {
                } else {
                  previousValue.push(currentValue.type)
                }
                return previousValue;
              },[])
              .map((item, idx) => (
                <Ant.Select.Option key={idx} value={item}>{item}</Ant.Select.Option>
              ))
            }
          </Ant.Select>
          <Ant.Select value={priceSelect} onChange={handlePriceChange}>
            <Ant.Select.Option key={"all"} value={"all"}>All</Ant.Select.Option>
            {originData
              .reduce((previousValue, currentValue) => {
                previousValue.push(Math.floor(currentValue.price/100));
                previousValue = Array.from(new Set(previousValue))
                return previousValue;
              },[])
              .sort((a, b) => {
                return a - b;
              })
              .map((item, idx) => {
                const start = item*100;
                const end = start + 99;
                return (
                  <Ant.Select.Option key={idx} value={start}>{start + `~` + end}</Ant.Select.Option>
                )
              })
            }
          </Ant.Select>
        </Flex>
        <Ant.Table
          dataSource={filterData}
          columns={columns}
          loading={isLoading}
          bordered
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </div>
      </>
    }
    </Wrapper>
  );
}


export default App;