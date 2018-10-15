import React, {Component} from 'react';
import './index.less';
import { Form, Select, Button, Card, DatePicker, Table, message, Modal } from 'antd';
import axios from '../../axios';

const FormItem = Form.Item;
const Option  = Select.Option;
const {RangePicker} = DatePicker;

class Order extends Component{
    state = {
        orderData: [],
        pageSize: '',
        total: '',
        isLoading: true,
        isShowModal: false,
        endItem: {},
    }

    params = {
        pn: 1
    }

    //获取订单数据
    getOrderData = () => {
        this.setState({
            isLoading: true
        }, () => {
            axios.get('/order/list', this.params).then(res => {
                if(res.code == 0) {
                    this.setState({
                        orderData: res.result.item_list.map((item, index) => {
                            item.key = index
                            return item
                        }),
                        pageSize: res.result.page_size,
                        total: res.result.total_count,
                        isLoading: false
                    })
                }
            })
        })
    }
    //查询功能获取表单数据
    handleSearch = () => {
        console.log(this.props.form.getFieldsValue())
    }
    //清空表单数据
    resetData = () => {
        this.props.form.resetFields()
    }
    订单详情
    handleDetail = () => {
        let selectedItem = this.state.selectedItem
        if(selectedItem) {
            const id = selectedItem.id
            window.open(`/#/admin/order/detail/${id}`, '_blank')
        }else {
            message.info('请先选择一项订单')
        }
    }
    //结束订单(弹出对话框)
    handleDone = () => {
        let selectItem = this.state.selectedItem
        if(selectItem) {
            axios.get('/order/ebike_info', {id: selectItem.id}).then(res => {
                this.setState({
                    endItem: res.result,
                    isShowModal: true
                })
            })
        }else {
            message.info('请先选择一项订单')
        }
    }
    //确认结束订单
    handleOk = () => {
        this.setState({
            isShowModal: false
        })
        let id = this.state.selectedItem.id
        axios.get('/order/finish_order', {id}).then(res => {
            if(res.code == 0) {
                message.success('结束订单成功')
                this.getOrderData()
            }
        })
    }
    //取消结束订单操作
    handleCancel = () => {
        this.setState({
            isShowModal: false
        })
    }

    componentWillMount () {
        this.getOrderData()
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const cityOptions = [
            {
                label: '北京',
                value: '0'
            },
            {
                label: '上海',
                value: '1'
            },{
                label: '广州',
                value: '2'
            }
        ]

        const orderStatus = [
            {
                label: '已完成',
                value: '0'
            },
            {
                label: '进行中',
                value: '1'
            },{
                label: '已结束',
                value: '2'
            }
        ]

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn',
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance',
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee',
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay',
            },
        ]

        const pagination = {
            pageSize: 10,
            total: this.state.total,
            onChange: (index) => {
                this.params.pn = index
                this.getOrderData()
            }
        }

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedIndex,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedIndex: selectedRowKeys,
                    selectedItem: selectedRows[0]
                })
            }
        }

        return(
            <div className="container">
                <Form layout="inline">
                    <Card>
                        <FormItem
                            label="城市"
                        >
                            {
                                getFieldDecorator('city', {
                                    initialValue : '0'
                                })(
                                    <Select placeholder="选择一个城市" style={{width: 150}}>
                                        {cityOptions.map( item =>
                                            <Option value={item.value} key={item.value}>{item.label}</Option>)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="日期"
                        >
                            {
                                getFieldDecorator('date')(
                                    <RangePicker></RangePicker>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="状态"
                        >
                            {
                                getFieldDecorator('status')(
                                    <Select placeholder="选择状态" style={{width: 150}}>
                                        {orderStatus.map( item =>
                                            <Option value={item.value} key={item.value}>{item.label}</Option>)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <div className="btn-wrap">
                            <Button type="primary" className="marr-8" onClick={this.handleSearch}>查询</Button>
                            <Button type="warning" className="marr-8" onClick={this.resetData}>重置</Button>
                        </div>
                    </Card>
                    <Card style={{marginTop: "-1px"}}>
                            <Button type="primary" className="marr-8" onClick={this.handleDetail}>订单详情</Button>
                            <Button className="marr-8" onClick={this.handleDone}>结束订单</Button>
                    </Card>
                    <Card>
                        <Table columns={columns}
                               pagination = {pagination}
                               dataSource={this.state.orderData}
                               loading={this.state.isLoading}
                               rowSelection={rowSelection}/>
                    </Card>
                    <Modal
                        title="订单详情"
                        visible={this.state.isShowModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <ul className="ul-data">
                            <li>
                                <span className="li-title">车辆编号:</span>
                                {this.state.endItem.id}
                            </li>
                            <li>
                                <span className="li-title">剩余电量:</span>
                                {this.state.endItem.battery}
                            </li>
                            <li>
                                <span className="li-title">当前位置:</span>
                                {this.state.endItem.location}
                            </li>
                            <li>
                                <span className="li-title">行程开始时间:</span>
                                {this.state.endItem.start_time}
                            </li>
                        </ul>
                    </Modal>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Order)