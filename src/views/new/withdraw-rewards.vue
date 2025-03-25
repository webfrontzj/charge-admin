<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getRechargeWithdrawApi,exportWithdrawApi,passRewardsWithdrawApi,rejectRewardsWithdrawApi} from '@/api'
import {REWARDS_STATE_MAP} from './constant'
import dayjs from 'dayjs'
import {saveAs} from 'file-saver'
import { ElMessageBox,ElMessage } from 'element-plus'
import QRCode from 'qrcode'

const createTime = ref([])
const state = ref()
const tableData = ref([])
const pageNumber = ref(1)
const total = ref(0)
const pageSize = ref(10)

const getData = () => {
  let data = {
    operationType:4,
    pageNumber:pageNumber.value,
    pageSize:pageSize.value,
    state:state.value,
    createTimeBegin:'',
    createTimeEnd:''
  }
  if(createTime.value.length){
    data.createTimeBegin = createTime.value[0]
    data.createTimeEnd = createTime.value[1]
  }else{
    data.createTimeBegin = ''
    data.createTimeEnd = ''
  }
  getRechargeWithdrawApi(data).then(res=>{
    tableData.value = res.data.recordList
    total.value = res.data.total
  })
}
function handleExport(){
  let data = {
    operationType:1,
    createTimeBegin:'',
    createTimeEnd:'',
    state:state.value,
  }
  if(createTime.value.length){
    data.createTimeBegin = createTime.value[0]
    data.createTimeEnd = createTime.value[1]
  }else{
    data.createTimeBegin = ''
    data.createTimeEnd = ''
  }
  exportWithdrawApi(data).then(res=>{
    console.log(res)
    //@ts-ignore
    const blob = new Blob([res], { type: 'application/octet-stream' });

    saveAs(blob, 'data.xlsx');
    alert('导出成功')
  })
}
function handleQuery(){
  pageNumber.value = 1
  pageSize.value = 10
  getData()
}

function handleReset(){
  createTime.value = []
  state.value = ''
  handleQuery()
}

onMounted(()=>{
  handleQuery()
})

function handleAudit(id,type){
  if(type == 'pass'){
    ElMessageBox.confirm('确定通过该提现申请吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      passRewardsWithdrawApi({id}).then(res=>{
        ElMessage({
          type: 'success',
          message: '操作成功!',
        })
        getData()
      })
    }).catch(() => {
    });
  }else if(type == 'reject'){
    ElMessageBox.confirm('确定拒绝该提现申请吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      rejectRewardsWithdrawApi({id}).then(res=>{
        ElMessage({
          type:'success',
          message: '操作成功!',
        })
        getData()
      })
    }).catch(() => {
    });
  }
}

// 修改二维码相关状态
const qrCodeUrl = ref('')
// 不再需要 activeQRCodeRow
// const activeQRCodeRow = ref(null)

// 修改生成二维码并显示的函数
function showQRCode(row) {
  if (!row.mentionAddress) {
    ElMessage.warning('提币地址为空，无法生成二维码')
    return
  }
  
  QRCode.toDataURL(row.mentionAddress, { width: 200 })
    .then(url => {
      qrCodeUrl.value = url
    })
    .catch(err => {
      console.error(err)
      ElMessage.error('生成二维码失败')
    })
}
</script>

<template>
<div class="page-container">
  <div class="search-box">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="提现状态">
        <el-select v-model="state" placeholder="请选择状态" style="width:150px">
          <el-option v-for="(item,index) in REWARDS_STATE_MAP" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提现时间">
        <el-date-picker v-model="createTime" value-format="YYYYMMDD" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="warning" @click="handleExport">导出</el-button>
      </el-form-item>
    </el-form>
<!--    账户，币种，数量，状态，提现卡号，提现银行，时间-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="email" label="账户" min-width="120"/>
      <el-table-column prop="tokenType" label="币种" />
      <el-table-column prop="tokenNumber" label="数量" min-width="80"/>
      <el-table-column prop="state" label="状态">
        <template #default="scope">
          {{ REWARDS_STATE_MAP[scope.row.state] }}
        </template>
      </el-table-column>
      
      <el-table-column prop="mentionAddress" label="提币地址" />
      <el-table-column label="扫码打币">
        <template #default="scope">
          <el-popover
            v-if="scope.row.mentionAddress"
            placement="right"
            :width="220"
            trigger="hover"
            popper-class="qrcode-popover"
          >
            <template #reference>
              <el-button type="primary" link @mouseenter="showQRCode(scope.row)">
                二维码
              </el-button>
            </template>
            <div class="qrcode-container">
              <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="提币地址二维码" />
              <div class="qrcode-address">{{ scope.row.mentionAddress }}</div>
            </div>
          </el-popover>
          <el-button v-else type="info" link disabled>二维码</el-button>
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="120">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
          <template v-slot="scope">
            <el-button type="primary" link :disabled="scope.row.state == 1 || scope.row.state == 2" @click="handleAudit(scope.row.id,'pass')">通过</el-button>
            <el-button type="primary" link :disabled="scope.row.state == 1 || scope.row.state == 2" @click="handleAudit(scope.row.id,'reject')">拒绝</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" background layout="pager" :total="total"
      @current-change="getData"
      />
    </div>

  </div>
</div>
</template>

<style scoped>
.page-box{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.qrcode-address {
  margin-top: 10px;
  font-size: 12px;
  word-break: break-all;
  text-align: center;
}
</style>
