<script setup lang="ts">
import {ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import dayjs from 'dayjs'

const tableData = ref([{}])
const pageNumber = ref(1)
const total = ref(0)
const pageSize = ref(10)

const getData = () => {

}

function handleAbort(){
  ElMessageBox.prompt('请输入驳回原因', '审核驳回', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `操作成功`,
      })
    })
    .catch(() => {

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
        <el-table-column label="身份证照片">
          <template v-slot="scope">
            <el-image
              fit="contain"
              style="width: 70px; height: 70px"
              :src="scope.row.idCardPhoto"
              :preview-src-list="[scope.row.idCardPhoto]"
            />
            <el-image
              fit="contain"
              style="width: 70px; height: 70px;margin-left:10px"
              :src="scope.row.idCardPhoto"
              :preview-src-list="[scope.row.idCardPhoto]"
            />
          </template>
        </el-table-column>
        <el-table-column label="签名">
          <template v-slot="scope"></template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button type="primary" link >审核通过</el-button>
            <el-button type="primary" link @click="handleAbort">审核驳回</el-button>
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
