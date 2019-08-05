import React, { Component } from "react";

import { Row, Col, Icon, Divider } from "antd";
import Search from "./Search";

import logo from "../resources/leoLogo.png";

class Header extends Component {
  render() {
    return (
      <Row className="header" type="flex" justify="center" align="middle">
        <Col className="imgContainer" offset={1} span={7}>
          <img className="headerLogo" src={logo} alt="LeoVegas logo" />
        </Col>
        <Col offset={1} span={7} className="searchContainer">
          <Search setSearchMovie={this.props.setSearchMovie} />
        </Col>
        <Col type="flex" justify="center" align="middle" offset={1} span={7}>
          <Icon
            type="home"
            className={
              this.props.currentPage === "home"
                ? "activeHeaderButton"
                : "inActiveHeaderButton"
            }
            onClick={() => this.props.setActivePage("home")}
          />
          <Divider type="vertical" />
          <Icon
            type="unordered-list"
            className={
              this.props.currentPage === "list"
                ? "activeHeaderButton"
                : "inActiveHeaderButton"
            }
            onClick={() => this.props.setActivePage("list")}
          />
        </Col>
      </Row>
    );
  }
}

export default Header;
