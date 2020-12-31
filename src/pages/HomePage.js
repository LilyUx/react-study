/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-21 15:59:08
 * @LastEditTime: 2020-12-21 16:16:48
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { Component } from 'react'
import { ThemeContext } from '../Context'
import UserPage from './UserPage'

class HomePage extends Component {
  // static contextType = ThemeContext
  render() {
    const {themeColor} = this.context
    console.log('this', this)
    return (
      <div>
        <h3 className={themeColor}>HomePage</h3>
        <UserPage />
      </div>
    )
  }
}

HomePage.contextType = ThemeContext

export default HomePage
