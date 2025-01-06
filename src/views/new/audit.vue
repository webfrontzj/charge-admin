<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import dayjs from 'dayjs'
import {auditApi, getAuditApi} from '@/api'

const tableData = ref([{}])
const pageNumber = ref(1)
const total = ref(0)
const pageSize = ref(10)

const getData = () => {
  let data = {
    pageNumber:pageNumber.value,
    pageSize:pageSize.value,
  }

  getAuditApi(data).then(res=>{
    tableData.value = res.data.userList
    total.value = res.data.total
  })
}

function handleQuery(){
  pageNumber.value = 1
  pageSize.value = 10
  getData()
}

onMounted(()=>{
  handleQuery()
})


function handleAbort(userId){
  ElMessageBox.prompt('请输入驳回原因', '审核驳回', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      if(!value){
        ElMessage({
          type: 'error',
          message: `请输入驳回原因`,
        })
        return
      }
      handleAudit(userId,2,value)
    })
    .catch(() => {

    })
}

function handlePass(userId){
  ElMessageBox.confirm(
    '确认要审核通过吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      handleAudit(userId,1,null)
    })
    .catch(() => {

    })
}

function handleAudit(userId,state,remark){
  const data = {
    userId,
    state,
    remark:null,
  }
  if(state == 2){
    data.remark = remark;
  }
  auditApi(data).then(res=>{
    ElMessage({
      type: 'success',
      message: `操作成功`,
    })
    getData()
  })
}
</script>

<template>
  <div class="page-container">
    <div class="search-box">
      <!--      <el-form :inline="true" class="demo-form-inline">-->
      <!--        <el-form-item label="提现时间">-->
      <!--          <el-date-picker v-model="createTime" value-format="YYYYMMDD" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item >-->
      <!--          <el-button type="primary" @click="handleQuery">查询</el-button>-->
      <!--          <el-button @click="handleReset">重置</el-button>-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
      <!--    账户，币种，数量，状态，提现卡号，提现银行，时间-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="email" label="账户" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="usefulLife" label="身份证有效期" />
        <el-table-column label="身份证照片">
          <template v-slot="scope">
            <el-image
              fit="contain"
              style="width: 70px; height: 70px"
              :src="scope.row.idCardFront"
              :preview-src-list="[scope.row.idCardFront]"
              preview-teleported
            />
            <el-image
              fit="contain"
              style="width: 70px; height: 70px;margin-left:10px"
              :src="scope.row.idCardBack"
              :preview-src-list="[scope.row.idCardBack]"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column label="签名">
          <template v-slot="scope">
            <el-image
              fit="contain"
              style="width: 70px; height: 70px;margin-left:10px"
              :src="scope.row.contractUrl"
              :preview-src-list="[scope.row.contractUrl]"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button type="primary" link @click="handlePass(scope.row.userId)">审核通过</el-button>
            <el-button type="primary" link @click="handleAbort(scope.row.userId)">审核驳回</el-button>
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
