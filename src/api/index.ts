import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './mock/table.json',
        method: 'get'
    });
};

export const fetchUserData = () => {
    return request({
        url: './mock/user.json',
        method: 'get'
    });
};

export const fetchRoleData = () => {
    return request({
        url: './mock/role.json',
        method: 'get'
    });
};

//登录接口
export const loginApi = (data: any) => {
    return request({
        url: '/scf/mis/login',
        method: 'post',
        data
    });
};

//首页统计接口
export const getStatisticsApi = () => {
    return request({
        url: '/scf/mis/getIndexInfo',
        method: 'post'
    });
};
//获取充值提现数据
export const getRechargeWithdrawApi = (data: any) => {
    return request({
        url: '/scf/mis/getAssetRecord',
        method: 'post',
        data
    });
};
