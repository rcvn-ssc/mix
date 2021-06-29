import React, {Component} from 'react';
import {List} from "antd";
import {Loading} from "../../../../layouts/Loading";
import {DataEmpty} from "../../../../layouts/DataEmpty";

class ListTransactions extends Component {
    render() {
        const pending         = this.props.pending;
        const dataSource      = this.props.dataSource;
        const formatCreatedAt = this.props.formatCreatedAt;
        return (
            <div className="data-list list-transactions">
                {
                    pending ? <Loading/> :
                        dataSource.length === 0 ? <DataEmpty/> :
                            <List itemLayout="vertical" size="small" pagination={{pageSize: 5,}} dataSource={dataSource}
                                  renderItem={item => (
                                      <List.Item key={item.id} className="list-item">
                                          <List.Item.Meta
                                              title={
                                                  <div className="item-meta-data">
                                                      <span className="item-data-key">
                                                          ID:
                                                      </span>
                                                      <span className="item-data-value">
                                                          {item.id}
                                                      </span>
                                                  </div>
                                              }
                                              description={item.description}
                                          />
                                          <div className="item-data">
                                            <span className="item-data-key">
                                             Amount:
                                            </span>
                                              <span className="item-data-value">
                                                {item.amount.toLocaleString()} VND</span>
                                          </div>
                                          <div className="item-data">
                                            <span className="item-data-key">
                                                Created at:
                                            </span>
                                              <span className="item-data-value">
                                                {formatCreatedAt(item.created_at)}
                                            </span>
                                          </div>
                                      </List.Item>
                                  )}
                            />
                }
            </div>
        )
    }
}

export default ListTransactions