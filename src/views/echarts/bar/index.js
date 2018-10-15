import React, {Component} from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';//引入echarts核心包
import 'echarts/lib/chart/bar';//引入条形图组件
import 'echarts/lib/component/legend';//引入legend组件
import EchartsReact from 'echarts-for-react';//引入第三方封装好的针对于react的库

import echartsTheme from '../themeLight'


class Bar extends Component{
    componentWillMount() {//注册主题
        echarts.registerTheme('light', echartsTheme)
    }

    bar1 = () => {
        return {
            title: {
                text: 'ofo周订单',
            },
            tooltip : {
                trigger: 'axis',
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'ofo订单量',
                    type:'bar',
                    barWidth: '60%',
                    data:[500, 1000, 1600, 3000, 2800, 2600, 2870],
                    itemStyle: {
                        normal: {
                            color: "#ff0"
                        }
                    }
                }
            ]
        }
    }

    bar2 = () => {
        return {
            title: {
                text: '用户骑行订单',
            },
            tooltip : {
                trigger: 'axis',
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            legend: {
                data:['ofo','摩拜','哈罗']
            },
            series : [
                {
                    name:'ofo',
                    type:'bar',
                    data:[100, 1400, 5000, 6000, 9000, 12000, 14000],
                    itemStyle: {
                        normal: {
                            color: "#ff0"
                        }
                    }
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[700, 1200, 4000, 5000, 7000, 8000, 20000]
                },
                {
                    name:'哈罗',
                    type:'bar',
                    data:[800, 1000, 3000, 4000, 8000, 10000, 15000],
                    itemStyle: {
                        normal: {
                            color: "#409eff"
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
                title="条形图一"
                >
                    <EchartsReact option={this.bar1()}
                                  theme="light"
                    ></EchartsReact>
                </Card>
                <Card
                    title="条形图二"
                >
                    <EchartsReact option={this.bar2()}
                                  theme="light"
                    ></EchartsReact>
                </Card>
            </div>
        )
    }
}

export default Bar