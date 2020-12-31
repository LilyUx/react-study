/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-21 16:13:17
 * @LastEditTime: 2020-12-21 16:16:19
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { useContext } from 'react'
import { ThemeContext } from '../Context'

export default function UserPage(props) {
  const ctx = useContext(ThemeContext)
  console.log('ctx', ctx)
  return (
    <div>
      <h3 className={ctx.themeColor}>UserPage</h3>
    </div>
  )
}
