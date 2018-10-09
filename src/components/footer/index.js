import React, {Component} from 'react';
import './index.less'

class Footer extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="footer">
                版权所有,翻版必究
            </div>
        )
    }
}

export default Footer