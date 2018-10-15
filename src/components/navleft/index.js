import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Menu } from 'antd';
import './idnex.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../redux/actionCreator'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class NavLeft extends Component{
    clickMenuItem = ( {item, key, keyPath} ) => {
        const text = item.props.children.props.children
        console.log(text)
        this.props.action.changeMenuItem(text)
    }

    render() {
        return (
            <div className="nav-left">
                <Menu mode="vertical" theme="dark" className="menu" onClick={this.clickMenuItem}>
                    <MenuItem key="首页">
                        <Link to="/admin">首页</Link>
                    </MenuItem>
                    <SubMenu title="订单管理">
                        <MenuItem key="第二页">
                            <Link to="/admin/secondPage">第二页</Link>
                        </MenuItem>
                        <MenuItem key="订单管理">
                            <Link to="/admin/order">订单管理</Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title="图例">
                        <MenuItem key="条形图">
                            <Link to="/admin/echarts/bar">条形图</Link>
                        </MenuItem>
                        <MenuItem key="饼图">
                            <Link to="/admin/echarts/pie">饼图</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
//connect 接收两个参数mapStateToProps,mapActionToProps,
//这两个参数都应该是一个函数
export default connect(
    null,
    (dispatch) => ({
        action: bindActionCreators(actionCreators, dispatch)
    })
)(NavLeft)