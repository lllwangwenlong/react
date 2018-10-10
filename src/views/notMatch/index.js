import React, {Component} from 'react';
import './index.less'
import {Link} from "react-router-dom"

class NotMatch extends Component{
    render() {
        return(
            <div className="notmatch">
                <h1>404 没有找到你要的页面</h1>
                <h3>页面丢失啦!</h3>
                <Link to="/admin">回首页</Link>
            </div>
        )
    }
}

export default NotMatch