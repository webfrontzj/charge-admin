export const STATE_MAP = [
    '提现中',
    '打款成功',
    '打款失败',
    '打款中'
]

export const REWARDS_STATE_MAP = [
    '提现中',
    '打款成功',
    '打款失败',
]

export const CHARGE_STATE_MAP = [
    '处理中',
    '成功',
    '异常',
]

export const RECHARGE_STATE_MAP = [
    '',
    '充值成功',
    '充值异常',
    '',
    '充值审核拒绝'
]

const USER_AUTH_MAP = []
USER_AUTH_MAP["0"]="初始"
USER_AUTH_MAP["1"]="基本认证"
USER_AUTH_MAP["2"]="照片认证"
USER_AUTH_MAP["3"]="认证完成"
export {USER_AUTH_MAP}
