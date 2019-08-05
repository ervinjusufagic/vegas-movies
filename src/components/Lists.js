import React, { Component } from "react";

import { Tabs } from "antd";
import List from "./List";
class Lists extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="tabs">
        <Tabs className="tabs" defaultActiveKey="1">
          <Tabs.TabPane tab="Watch Later" key="1">
            <List
              watchLater={this.props.watchLater}
              toggleModal={this.props.toggleModal}
              isModalOpen={this.props.isModalOpen}
              type="watchLater"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Favourites" key="2">
            <List
              favourites={this.props.favourites}
              toggleModal={this.props.toggleModal}
              isModalOpen={this.props.isModalOpen}
              type="favourites"
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Lists;
