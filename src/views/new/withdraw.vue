<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getRechargeWithdrawApi} from '@/api'

const createTime = ref([])
const tableData = ref([])
const pageNumber = ref(1)
const total = ref(0)
const pageSize = ref(10)

const getData = () => {
  let data = {
    operationType:1,
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
  })
}

onMounted(()=>{
  getData()
})

</script>

<template>
<div class="page-container">
  <div class="search-box">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="提现时间">
        <el-date-picker v-model="createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary">查询</el-button>
        <el-button >重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <div class="page-box">
      <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" background layout="prev, pager, next" :total="total" />
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
