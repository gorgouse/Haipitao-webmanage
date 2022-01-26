<template>
  <div style="margin-top:-20px">
<el-card>
      <div id="c0"></div>
    <div style="margin-top:20px;font-size:21px;color:gray">月份波动曲线记录图</div>
    <div style="margin-top:20px;font-size:21px;color:gray">Monthly fluctuation Of Curve Record Chart</div>
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
    this.c()
  },
  methods:{
    c(){
      const data = [
  { month: 0, tem: 7, city: 'tokyo' },
  { month: 1, tem: 6.9, city: 'tokyo' },
  { month: 2, tem: 9.5, city: 'tokyo' },
  { month: 3, tem: 14.5, city: 'tokyo' },
  { month: 4, tem: 18.2, city: 'tokyo' },
  { month: 5, tem: 21.5, city: 'tokyo' },
  { month: 6, tem: 25.2, city: 'tokyo' },
  { month: 7, tem: 26.5, city: 'tokyo' },
  { month: 8, tem: 23.3, city: 'tokyo' },
  { month: 9, tem: 18.3, city: 'tokyo' },
  { month: 10, tem: 13.9, city: 'tokyo' },
  { month: 11, tem: 9.6, city: 'tokyo' }
];

const chart = new Chart({
  container: 'c0',
  width: 700,
  height: 260
});

const defs = {
  'month':{
    type: 'cat',
    alias: '月份', // 别名，如果没有别名显示成字段名 month
    values: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
  },
  'tem': {
    alias: '温度'
  }
};

chart.source(data,defs);

chart.tooltip(true, {
  showTitle: false // 默认标题不显示
});
chart.line().position('month*tem').tooltip('month*tem');
chart.render();
    }
  }
}
</script>

<style>

</style>