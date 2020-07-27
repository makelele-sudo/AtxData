<template>
  <div class="vline">
    <ve-waterfall
      :data="chartData"
      :extend="chartExtend"
    />
  </div>
</template>

<script>

export default {
  data () {
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
        },
        axisLabel: {
          rotate: 30,
          interval: 0
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
        bottom: '5%',
        left: 10,
        right: 10
      }
    }
    return {
      chartData: {
        columns: ['产品', '数量'],
        rows: [
          { '产品': '安保一体化', '数量': 60 },
          { '产品': '未来安全', '数量': 1 },
          { '产品': '考试培训', '数量': 5 },
          { '产品': '巡更', '数量': 2 },
          { '产品': '考勤', '数量': 3 },
          { '产品': 'OA', '数量': 1 }
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
.vline {
  width: 100%;
  height: 100%;

  .ve-waterfall{
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
