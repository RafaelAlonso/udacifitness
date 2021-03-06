import React, { Component } from 'react'
import { View } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import Slider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'

export default class AddEntry extends React.Component {
	state = { 
  	run: 	 0,
  	bike:  0,
  	swim:  0,
  	sleep: 0,
  	eat:   0,
  }

  increment = (metric) => {
  	const {max, step} = getMetricMetaInfo(metric)

  	this.setState((prevState) => {
  		const count = prevState + step

  		return {
  			[metric]: count > max ? max : count
  		}
  	})
  }

  decrement = (metric) => {
  	this.setState((prevState) => {
  		const count = prevState - getMetricMetaInfo(metric).step

  		return {
  			[metric]: count < 0 ? 0 : count
  		}
  	})
  }

  slide = (metric, value) => {
  	this.setState(() => {
  		return {
  			[metric]: value
  		}
  	})
  }

	render() {
		const metaInfo = getMetricMetaInfo()

		return(
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()} />
				{Object.keys(metaInfo).map((key) => {
					const { type, step, ...rest } = metaInfo[key]
					const value = this.state.key
					return(
						<View key={key}>
							{ metaInfo[key].getIcon() }
							{ type === 'slider'
								? <Slider />
								: <Stepper />
							}
						</View>
					)
				})}
			</View>
		)
	}
}