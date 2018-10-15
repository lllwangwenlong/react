import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../views/home';
import NotMatch from '../views/notMatch';
import Admin from '../views/admin';
import SecondPage from '../views/secondPage';
import Order from '../views/order';
import Detail from '../views/detail';
import Bar from '../views/echarts/bar';
import Pie from '../views/echarts/pie';

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/admin/order/detail/:id' component={Detail}></Route>
                        <Route path='/admin' render={() =>
                          <Admin>
                              <Switch>
                                  <Route path='/admin' exact component={Home}></Route>
                                  <Route path='/admin/secondPage' component={SecondPage}></Route>
                                  <Route path='/admin/order' component={Order}></Route>
                                  <Route path='/admin/echarts/pie' component={Pie}></Route>
                                  <Route path='/admin/echarts/bar' component={Bar}></Route>
                                  <Route component={NotMatch}></Route>
                              </Switch>
                          </Admin>
                        }></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default Router