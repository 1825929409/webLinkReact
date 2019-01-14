import React, { Component } from 'react'
import { Spin, notification, Button, Popconfirm, Form, Input, message, Layout } from 'antd'
import $ from 'jquery';
import path from './testpath'
// import { brandName } from '@config'
// import {
//     fetchUserDepttList,
//     fetchUserList,
//     fetchUserDetail,
//     fetchUserDelete,
//     fetchRoleList,
//     fetchChangeUserStatus,
// } from '@apis/manage'


export default class transit extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props, context) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getUrlParam = this.getUrlParam.bind(this);
        this.state = {
            targetId: '',
            brandName:'正在中转中...',
            userRoleSetResult: { list: [], loading: false },
        }
    }

    // 组件即将加载
    componentWillMount() {
        let targetId = this.getUrlParam('targetId');
        this.setState({targetId: targetId});
    }

    // 组件已经加载到dom中
    componentDidMount() {
        this.getData();
    }
    // 获取url中的参数
    getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!= null) {
            return decodeURI(r[2]);
        }else{
            return null;
        }
    }

    getData = () =>{
        let _this = this;
        $.ajax({
            url: path.path1 + 'findWeblinkByGiud',
            type: 'post',
            data:{
                guid:_this.state.targetId,
            },
            dataType: 'text',
            async: true,
            success: function (res) {
                let obj = res;
                console.log(obj);
                if (obj == '此链接不存在' || obj == '此链接已关闭'){
                    _this.setState({ brandName:'stop...' })
                }else {
                    window.location.href = obj;
                }
            },
            error: function () {
            }
        });
    }

    render() {
        return (
            <div className="welcome">
                <div className="content">
                    <div className="title"><h1 style={{color:'white'}}>超链接中转站</h1></div>
                    <div><h2 style={{color:'white'}}>{this.state.brandName}</h2></div>
                </div>
            </div>
        )
    }
}
