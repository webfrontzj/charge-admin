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
//获取全部用户信息
export const getAllUserApi = (data: any) => {
    return request({
        url: '/scf/mis/getAlluser',
        method: 'post',
        data
    });
};
//获取异常数据
export const getAbnormalApi = (data: any) => {
    return request({
        url: '/scf/mis/getErrorRecord',
        method: 'post',
        data
    });
};
//提现列表导出
export const exportWithdrawApi = (data: any) => {
    return request({
        url: '/scf/mis/exportData',
        method: 'post',
        responseType: 'blob',
        data
    });
};

//审核列表
export const getAuditApi = (data: any) => {
    return request({
        url: '/scf/mis/getAuditInfo',
        method: 'post',
        data
    });
};

// 用户审核
export const auditApi = (data: any) => {
    return request({
        url: '/scf/mis/auditUser',
        method: 'post',
        data
    });
};
