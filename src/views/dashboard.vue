<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg1">
                        <User />
                    </el-icon>
                    <div class="card-content">
                      <span class="card-num color1"> {{totalUser}}</span>
                        <div>平台总注册</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg2">
                        <ChatDotRound />
                    </el-icon>
                    <div class="card-content">
                        <span class="card-num color2">{{totalRecharge}}</span>
                        <div>总充值</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg3">
                        <Goods />
                    </el-icon>
                    <div class="card-content">
                      <span class="card-num color3">{{totalWithDrawl}}</span>
                        <div>总提现</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg4">
                        <ShoppingCartFull />
                    </el-icon>
                    <div class="card-content">
                      <span class="card-num color4">{{todayRecharge}}</span>
                        <div>当日充值</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
          <el-col :span="6">
            <el-card shadow="hover" body-class="card-body">
              <el-icon class="card-icon bg4">
                <ShoppingCartFull />
              </el-icon>
              <div class="card-content">
                <span class="card-num color4">{{todayWithDrawl}}</span>
                <div>当日提现</div>
              </div>
            </el-card>
          </el-col>
        </el-row>


    </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from '@/components/countup.vue';
import {onMounted,ref} from 'vue'
import {getStatisticsApi} from '@/api'

interface PageData{
  totalWithDrawl: number,
  totalUser: number,
  todayRecharge: number,
  todayWithDrawl: number,
  totalRecharge: number
}
const totalWithDrawl = ref(0)
const totalUser = ref(0)
const todayRecharge = ref(0)
const todayWithDrawl = ref(0)
const totalRecharge = ref(0)


onMounted(()=>{
  getStatisticsApi().then(res=>{
    todayWithDrawl.value = res.data.todayWithDrawl
    totalWithDrawl.value = res.data.totalWithDrawl
    totalUser.value = res.data.totalUser
    todayRecharge.value = res.data.todayRecharge
    totalRecharge.value = res.data.totalRecharge
  })
})



</script>

<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
}
</style>
<style scoped>
.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
}

.card-num {
    font-size: 30px;
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.bg1 {
    background: #2d8cf0;
}

.bg2 {
    background: #64d572;
}

.bg3 {
    background: #f25e43;
}

.bg4 {
    background: #e9a745;
}

.color1 {
    color: #2d8cf0;
}

.color2 {
    color: #64d572;
}

.color3 {
    color: #f25e43;
}

.color4 {
    color: #e9a745;
}

.chart {
    width: 100%;
    height: 400px;
}

.card-header {
    padding-left: 10px;
    margin-bottom: 20px;
}

.card-header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-header-desc {
    font-size: 14px;
    color: #999;
}

.timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #000;
}

.timeline-time,
.timeline-desc {
    font-size: 12px;
    color: #787878;
}

.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.rank-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f2f2f2;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
}

.rank-item-content {
    flex: 1;
}

.rank-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343434;
    margin-bottom: 10px;
}

.rank-item-desc {
    font-size: 14px;
    color: #999;
}
.map-chart {
    width: 100%;
    height: 350px;
}
</style>
