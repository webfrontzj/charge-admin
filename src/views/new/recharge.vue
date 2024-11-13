<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getRechargeWithdrawApi} from '@/api'
import {STATE_MAP} from './constant'
import dayjs from 'dayjs'

const createTime = ref([])
const tableData = ref([])
const pageNumber = ref(1)
const total = ref(0)
const pageSize = ref(10)

const getData = () => {
  let data = {
    operationType:0,
    pageNumber:pageNumber.value,
    pageSize:pageSize.value,
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

function handleQuery(){
  pageNumber.value = 1
  pageSize.value = 10
  getData()
}

function handleReset(){
  createTime.value = []
  handleQuery()
}

onMounted(()=>{
  handleQuery()
})

</script>

<template>
  <div class="page-container">
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="提现时间">
          <el-date-picker v-model="createTime" value-format="YYYYMMDD" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!--    账户，币种，数量，状态，提现卡号，提现银行，时间-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="email" label="账户" />
        <el-table-column prop="tokenType" label="币种" />
        <el-table-column prop="tokenNumber" label="数量" />
        <el-table-column prop="chainType" label="主网类型">
          <template #default="scope">
            {{ scope.row.chainType==1?'ETH':'TRX' }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            {{ STATE_MAP[scope.row.state] }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="时间">
          <template #default="scope">
            {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
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
</style>
