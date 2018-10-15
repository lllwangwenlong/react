import React, {Component} from 'react';
import DetailDemo from '../../components/header/detailDemo';
import { Card } from 'antd';
import './index.less';
import axios from '../../axios';


class Detail extends Component{
    getData = () => {
        const {id}  = this.props.match.params
        axios.get('/order/detail', {id}).then(res => {
            if(res.code == 0) {
                this.initMap(res.result)
            }
        })
    }
    //初始化地图实例
    initMap = (result) => {
        const BMap = window.BMap
        this.map = new BMap.Map("map-container");
        this.addControl()
        this.drawPolyline(result.position_list)
        this.drawServerArea(result.area)
    }
    //添加控件
    addControl = () => {
        const BMap = window.BMap
        const map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor : window.BMAP_ANCHOR_TOP_RIGHT
        }));
        map.addControl(new BMap.ScaleControl({
            anchor : window.BMAP_ANCHOR_TOP_RIGHT
        }));
    }
    //绘制路径
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map

        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length-1]
        let startBMappoint = new BMap.Point(startPoint.lon, startPoint.lat);//绘制一个地图开始点
        let endBMappoint = new BMap.Point(endPoint.lon, endPoint.lat);//绘制一个地图结束点
        //定义起点标注图标
        let startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42)
        });
        //定义终点标注图标
        let endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42)
        });
        let startMarker = new BMap.Marker(startBMappoint, {icon: startIcon});        // 创建开始点标注
        let endMarker = new BMap.Marker(endBMappoint, {icon: endIcon});        // 创建结束点标注
        map.addOverlay(startMarker);        // 添加起始坐标点
        map.addOverlay(endMarker);          // 添加结束坐标点
        //定义折现标注

        let ploylineArr = position_list.map(item => {
            return new BMap.Point(item.lon, item.lat)
        })
        let polyline = new BMap.Polyline(
            ploylineArr,
            {strokeColor: "#1869AD", strokeWeight:3, strokeOpacity:1}
        );
        map.addOverlay(polyline); //添加折现
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.centerAndZoom(startBMappoint, 15); //初始化地图，设置中心点坐标和地图级别
    }
    //绘制服务区
    drawServerArea = (area) => {
        const BMap = window.BMap
        const map = this.map

        let polygon = new BMap.Polygon(
            area.map(item => new BMap.Point(item.lon, item.lat)),
            {
                strokeColor: "#f00",
                strokeWeight: 5,
                fillColor: "#ff6700",
                fillOpacity: 0.5
            }
        )

        map.addOverlay(polygon)
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return(
            <div className="detail">
                <DetailDemo></DetailDemo>
                <Card>
                    <div className="map-wrap" id="map-container">

                    </div>
                </Card>
            </div>
        )
    }
}

export default Detail