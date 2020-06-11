<template>
  <div id="rose-chart">
    <ve-waterfall
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
    />
  </div>
</template>

<script>
export default {
  data () {
    this.chartSettings = {
      roseType: 'radius',
      radius: 150,
      offsetY: 240
    }
    this.chartExtend = {
      title: {
        show: true,
        text: '产品安装',
        left: '20',
        textStyle: {
          color: '#fff',
          width: '100%',
          height: 50,
          fontSize: 20,
          lineHeight: 50
        }
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      grid: {
        top: 80,
        bottom: 0,
        left: 10,
        right: 10
      }
    }
    return {
      chartData: {
        columns: ['产品', '数量'],
        rows: [
          { '产品': '未来安全', '数量': 4 },
          { '产品': '安保一体化', '数量': 10 },
          { '产品': '考试培训', '数量': 5 },
          { '产品': '巡更', '数量': 4 },
          { '产品': '考勤', '数量': 5 },
          { '产品': 'OA', '数量': 8 }
        ]
      }
    }
  },
  mounted () {
    const { createData } = this
    createData()
    setInterval(createData, 86400000)
  },
  methods: {
    createData () {
    }
  }
}
</script>

<style lang="less">
#rose-chart {
  width: 30%;
  height: 100%;
  margin-left: 20px;
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;

  .ve-waterfall{
    width: 100% !important;
    height: 100% !important;
    background-color: rgba(6, 30, 93, 0.5);
  }
}
</style>
