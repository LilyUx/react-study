/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-21 16:29:41
 * @LastEditTime: 2020-12-21 16:45:19
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { Component } from 'react'

const foo = (Comp) => props => {
  return <div>
    1<Comp {...props}></Comp>
  </div>
}

// function Child(props) {
//   return <div>child - {props.name}</div>
// }


// const Foo = foo(foo(Child))
@foo
@foo
class Foo extends Component {
  render() {
    return <div>child - {this.props.name}</div>
  }
}

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name='msg'/>
      </div>
    )
  }
}
