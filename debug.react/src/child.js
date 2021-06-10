import React, { Component } from "react";
import context, { Consumer } from "./context";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  // 1、static属性接收content
  // static contextType = context;
  //   state = {};

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    return {
      message: "通用props生成的",
    };
  }

  // 与 getDerivedStateFromProps 同时使用无效
  UNSAFE_componentWillMount() {
    this.setState({
      message: "ddd",
    });
  }

  render() {
    const { message, message1 } = this.state;
    return (
      <p>
        {this.context.info}
        {message}
      </p>
    );
    // 2、Consumer接收
    // return (
    //   <Consumer>
    //     {(val) => {
    //       return <p>{val.info}</p>;
    //     }}
    //   </Consumer>
    // );
  }
}

// 3、新增静态属性
Child.contextType = context;

export default Child;
