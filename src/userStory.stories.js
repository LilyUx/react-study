/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-22 11:38:39
 * @LastEditTime: 2020-12-22 11:39:56
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import { storiesOf } from '@storybook/react'
import React from 'react'

const Demo = () => {
	const result = 'this is a demo'
	return (
		<div>
			<p>{result}</p>
		</div>
	)
}

storiesOf('user', module).add('Demo', Demo)
