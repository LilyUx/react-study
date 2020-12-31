/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-21 18:23:31
 * @LastEditTime: 2020-12-21 18:25:36
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { Component } from 'react'
import { ThemeConsumer } from '../Context'

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <ThemeConsumer>
          {ctx => (
            <h3 className={ctx.themeColor}>ConsumerPage</h3>
          )}
        </ThemeConsumer>
      </div>
    )
  }
}
