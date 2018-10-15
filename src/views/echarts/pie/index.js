import React, {Component} from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';//引入echarts核心包
import 'echarts/lib/chart/pie';//引入饼图组件
import 'echarts/lib/component/legend';//引入legend组件
import EchartsReact from 'echarts-for-react';//引入第三方封装好的针对于react的库

import echartsTheme from '../themeLight'


class Pie extends Component{
    componentWillMount() {//注册主题
        echarts.registerTheme('light', echartsTheme)
    }

    pie1 = () => {
        return {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: '40px',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 3000, name: '周一'},
                        {value: 4000, name: '周二'},
                        {value: 5000, name: '周三'},
                        {value: 6000, name: '周四'},
                        {value: 7000, name: '周五'},
                        {value: 8000, name: '周六'},
                        {value: 9000, name: '周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    pie2 = () => {
        return {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: '40px',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '60%'],
                    data: [
                        {value: 3000, name: '周一'},
                        {value: 4000, name: '周二'},
                        {value: 5000, name: '周三'},
                        {value: 6000, name: '周四'},
                        {value: 7000, name: '周五'},
                        {value: 8000, name: '周六'},
                        {value: 9000, name: '周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        return(
            <div>
                <Card
                    title="饼状图一"
                >
                    <EchartsReact option={this.pie1()}
                                  theme="light"
                    ></EchartsReact>
                </Card>
                <Card
                    title="饼状图二"
                >
                    <EchartsReact option={this.pie2()}
                                  theme="light"
                    ></EchartsReact>
                </Card>
            </div>
        )
    }
}

export default Pie