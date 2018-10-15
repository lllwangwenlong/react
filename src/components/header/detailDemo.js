import React, {Component} from 'react';
import './detailDemo.less';
import { Link } from 'react-router-dom';

class DetailDemo extends Component{
    render() {
        return(
            <div className="header-wrap clearfix">
                <div className="header-left fll">
                    <h1>共享单车后台系统</h1>
                </div>
                <div className="header-right flr clearfix">
                    <div className="layout flr">
                        <Link to="/login">退出</Link>
                    </div>
                    <div className="user-detail flr">
                        欢迎 <span className="username">糯糯米</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailDemo