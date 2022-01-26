<template>
  <div style="margin-top:-30px">
  <el-card>
    <div style="display:flex">
          <div>
            <canvas style="margin-left:100px" id="container4"></canvas>
            <div style="margin-left:50px;color:gray">商品分类消费占有比例图</div>  
          </div>  
          <div>
            <canvas style="margin-top:0px;margin-left:100px" id="container1"></canvas>
            <div style="margin-left:50px;color:gray">行业分类消费比例图</div>  
          </div>
    </div>

    <div style="height:70px"></div>

    <div style="display:flex;">
      <div>
        <canvas style="margin-left:90px" id="container2"></canvas>
        <div style="margin-left:50px;color:gray">消费金额数据环形图</div>  
      </div>
      <div>
        <canvas style="margin-left:90px" id="container3"></canvas>
        <div style="margin-left:100px;color:gray">单体环形平均数据图</div>  
        </div>
    </div>
    <div style="margin-left:-60px;margin-top:15px;font-size:16px;color:gray">分类比重扇形数据图</div>
    <div style="margin-left:-60px;margin-top:0px;font-size:16px;color:gray">Classification proportion Data Graph</div>    
  </el-card>
  </div>
</template>

<script>
import F2 from "@antv/f2/lib/index-all";
export default {
  data(){
    return{}
  },
  mounted(){
    this.a()
    this.b()
    this.c()
    this.d()
  },
  methods:{
     a(){
const data = [{
  name: '其他消费',
  y: 6371664,
  const: 'const'
}, {
  name: '饮食用品',
  y: 7216301,
  const: 'const'
}, {
  name: '通讯用品',
  y: 1500621,
  const: 'const'
}, {
  name: '必需品',
  y: 586622,
  const: 'const'
}, {
  name: '知识用品',
  y: 900000,
  const: 'const'
}];

const chart = new F2.Chart({
  id: 'container1',
  pixelRatio: window.devicePixelRatio
});


chart.source(data);
chart.coord('polar', {
  transposed: true,
  radius: 0.75
});
chart.legend(false);
chart.axis(false);
chart.tooltip(false);

// 添加饼图文本
chart.pieLabel({
  sidePadding: 40,
  label1: function label1(data, color) {
    return {
      text: data.name,
      fill: color
    };
  },
  label2: function label2(data) {
    return {
      text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      fill: '#808080',
      fontWeight: 'bold'
    };
  }
});

chart.interval()
  .position('const*y')
  .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864' ])
  .adjust('stack');
chart.render();


    },
    b(){
const data = [{
  const: 'const',
  type: '手机',
  money: 74910.39
}, {
  const: 'const',
  type: '饮食',
  money: 4556.68
}, {
  const: 'const',
  type: '电子科技产物',
  money: 412540.00
}, {
  const: 'const',
  type: '时尚衣服',
  money: 32116.53
}];
const chart = new F2.Chart({
  id: 'container2',
  pixelRatio: window.devicePixelRatio
});
chart.source(data);
chart.coord('polar', {
  transposed: true,
  radius: 0.9,
  innerRadius: 0.5
});
chart.axis(false);
chart.legend(false);
chart.tooltip(false);
chart.guide()
  .html({
    position: [ '50%', '50%' ],
    html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
  });
chart.interval()
  .position('const*money')
  .adjust('stack')
  .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
chart.pieLabel({
  sidePadding: 30,
  activeShape: true,
  label1: function label1(data) {
    return {
      text: '￥' + data.money,
      fill: '#343434',
      fontWeight: 'bold'
    };
  },
  label2: function label2(data) {
    return {
      text: data.type,
      fill: '#999'
    };
  },
  onClick: function onClick(ev) {
    const data = ev.data;
    if (data) {
      $('#title').text(data.type);
      $('#money').text(data.money);
    }
  }
});
chart.render();      
    },
    c(){
const data = [{
  amount: 20,
  ratio: 0.1,
  memo: '平均订单',
  const: 'const'
}, {
  amount: 100,
  ratio: 0.5,
  memo: '平均消费',
  const: 'const'
}, {
  amount: 10,
  ratio: 0.05,
  memo: '店铺消费',
  const: 'const'
}, {
  amount: 30,
  ratio: 0.15,
  memo: '整体消费',
  const: 'const'
}, {
  amount: 10,
  ratio: 0.05,
  memo: '其他',
  const: 'const'
}, {
  amount: 20,
  ratio: 0.1,
  memo: '单月消费',
  const: 'const'
}, {
  amount: 10,
  ratio: 0.05,
  memo: '暂无备注',
  const: 'const'
}];

const chart = new F2.Chart({
  id: 'container3',
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.4,
  radius: 0.75
});
chart.axis(false);
chart.legend({
  position: 'bottom',
  align: 'center'
});
chart.tooltip(false);
chart.guide()
  .html({
    position: [ '50%', '50%' ],
    html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
  });
// 配置文本饼图
chart.pieLabel({
  sidePadding: 75,
  label1: function label1(data) {
    return {
      text: data.memo,
      fill: '#808080'
    };
  },
  label2: function label2(data) {
    return {
      fill: '#000000',
      text: '$' + data.amount.toFixed(2),
      fontWeight: 500,
      fontSize: 10
    };
  }
});
chart.interval()
  .position('const*ratio')
  .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
  .adjust('stack');
chart.render();

// 绘制内阴影
const frontPlot = chart.get('frontPlot');
const coord = chart.get('coord'); // 获取坐标系对象
frontPlot.addShape('sector', {
  attrs: {
    x: coord.center.x,
    y: coord.center.y,
    r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
    r0: coord.circleRadius * coord.innerRadius,
    fill: '#000',
    opacity: 0.15
  }
});
chart.get('canvas').draw();
      
    },
    d(){
const map = {
  衣服: '40%',
  鞋子: '20%',
  手机: '18%',
  零食: '15%',
  笔记本电脑: '5%',
  其他: '2%'
};
const data = [{
  name: '衣服',
  percent: 0.4,
  a: '1'
}, {
  name: '鞋子',
  percent: 0.2,
  a: '1'
}, {
  name: '手机',
  percent: 0.18,
  a: '1'
}, {
  name: '零食',
  percent: 0.15,
  a: '1'
}, {
  name: '笔记本电脑',
  percent: 0.05,
  a: '1'
}, {
  name: '其他',
  percent: 0.02,
  a: '1'
}];
const chart = new F2.Chart({
  id: 'container4',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  percent: {
    formatter: function formatter(val) {
      return val * 100 + '%';
    }
  }
});
chart.legend({
  position: 'right',
  itemFormatter: function itemFormatter(val) {
    return val + '  ' + map[val];
  }
});
chart.tooltip(false);
chart.coord('polar', {
  transposed: true,
  radius: 0.85
});
chart.axis(false);
chart.interval()
  .position('a*percent')
  .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
  .adjust('stack')
  .style({
    lineWidth: 1,
    stroke: '#fff',
    lineJoin: 'round',
    lineCap: 'round'
  })
  .animate({
    appear: {
      duration: 1200,
      easing: 'bounceOut'
    }
  });

chart.render();      
    }

  }
}
</script>

<style>

</style>