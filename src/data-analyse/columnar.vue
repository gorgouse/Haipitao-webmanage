<template>
 <div>
   <el-card shadow="always" style="margin-top:0px"> 
    <div id="container"></div>
    <div style="margin-top:20px;font-size:21px;color:gray">月份销售统计柱状图</div>
    <div style="margin-top:20px;font-size:21px;color:gray">Monthly sales statistics bar chart</div>
   </el-card>
 </div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
  data(){
    return{}
  },
  mounted(){
    this.b()
  },
  methods:{
b(){

const data = [
  { year: '2020 年 11月', sales: 38 },
  { year: '2020 年 12月', sales: 52 },
  { year: '2021 年 1月', sales: 61 },
  { year: '2021 年 2月', sales: 145 },
  { year: '2021 年 3月', sales: 48 },
  { year: '2021 年 4月', sales: 38 },
  { year: '2021 年 5月', sales: 38 },
  // { year: '2021 年 1月', sales: 38 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 300,
});

chart.data(data);
chart.scale('sales', {
  nice: true,
});

chart.tooltip({
  showMarkers: false
});
chart.interaction('active-region');

chart.interval().position('year*sales');

chart.render();


    }
  }
}
</script>
  
<style>

</style>