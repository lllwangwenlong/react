import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.less';

class Header extends Component{
    constructor(props) {
        super(props)
    }

    state = {
        time: "2018-08-01 23:30:56 ",
        weather: "3摄氏度到16摄氏度 西北风4到5级"
    }

    render() {
        return (
            <div className="header-wrap">
               <div className="user-info clearfix">
                   <div className="flr">
                       <Link to="/login">退出</Link>
                   </div>
                   <div className="user-detail flr">
                       欢迎 <span className="username">糯糯米</span>
                   </div>
               </div>
                <div className="weather-wrap clearfix">
                    <div className="breadcrumb fll">
                        首页
                    </div>
                    <div className="weather flr clearfix">
                        <div className="date fll">
                            {this.state.time}
                        </div>
                        <div className="weather-detail fll">
                            {this.state.weather}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header