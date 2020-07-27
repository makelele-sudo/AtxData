<template>
  <div class="cards">
    <ve-radar
      :data="chartDataOrder"
      :extend="chartExtendOrder"
    />
  </div>
</template>

<script>
export default {
  data () {
    this.chartExtendOrder = {
      title: {
        show: true,
        text: '上月订单',
        left: '20',
        textStyle: {
          color: '#fff',
          width: '100%',
          height: 50,
          fontSize: 20,
          lineHeight: 50
        }
      },
      legend: {
        show: true,
        top: 50,
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        radius: '40%',
        center: ['50%', '55%'],
        splitLine: {
          lineStyle: {
            color: [
              'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.3)',
              'rgba(238, 197, 102, 0.5)', 'rgba(238, 197, 102, 0.7)',
              'rgba(238, 197, 102, 0.9)', 'rgba(238, 197, 102, 1)'
            ].reverse()
          }
        },
        splitArea: {
          show: false
        }
      },
      series: {
        areaStyle: {
          opacity: 0.1
        },
        lineStyle: {
          width: 1,
          opacity: 0.5
        }
      }
    }
    return {
      chartDataOrder: {
        columns: ['产品', '咨询量', '下单量', '下单率'],
        rows: [
          { '产品': '商城', '咨询量': 2, '下单量': 0, '下单率': 0 },
          { '产品': '安保一体化', '咨询量': 50, '下单量': 1, '下单率': 1 },
          { '产品': '智能巡检', '咨询量': 1, '下单量': 1, '下单率': 1 },
          { '产品': '内部管理OA', '咨询量': 0, '下单量': 0, '下单率': 0 },
          { '产品': '智慧社区', '咨询量': 0, '下单量': 0, '下单率': 0 },
          { '产品': '未来安全', '咨询量': 0, '下单量': 0, '下单率': 0 },
          { '产品': '安保考勤', '咨询量': 0, '下单量': 0, '下单率': 0 },
          { '产品': '考试培训', '咨询量': 0, '下单量': 0, '下单率': 0 }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.cards {
  height: 100%;
  width: 100%;
  .ve-radar {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
