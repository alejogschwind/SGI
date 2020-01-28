import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Value',
    key: 'value',
    dataIndex: 'value',
    align: 'center',
  }
]

class TableData extends React.Component {
  render() {
    const data = [];
    console.log(this.props.data)
    if (this.props.data) {
      const names = Object.keys(this.props.data)
      let values = Object.values(this.props.data)
      values = values.map((e) =>{
        if (e === '') {
          return '-'
        }
        if (e === null) {
          return 'No'
        }
        if (typeof(e) == 'boolean') {
          console.log(typeof(e))
          if (e) {
            return 'Si'
          } else {
            return 'No'
          }
        }
        return e
      })
      console.log(values)
      for (let i=0; i < names.length; i++){
        data.push({
          key: i,
          name: names[i],
          value: values[i],
        })
      }
    }
    return (
      <>
        <Table
          pagination={false}
          bordered={true}
          tableLayout="fixed"
          size='small'
          showHeader={false}
          title={()=> <h3>{this.props.title}</h3>}
          columns={columns}
          dataSource={data}
        />
      </>
    );
  }
}

TableData.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default TableData;
