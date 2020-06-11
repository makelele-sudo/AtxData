<template>
  <div class="vline">
    <ve-line
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
        text: '一周活跃用户',
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
        top: 60,
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: {
        show: true,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        show: true,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      grid: {
        top: 100,
        bottom: 70,
        left: 10,
        right: 40
      }
    }
    return {
      chartData: {
        columns: ['日期', '未来安全', '学习培训', '人员考勤'],
        rows: [
          { '日期': '1/1', '未来安全': 200, '学习培训': 100, '人员考勤': 300 },
          { '日期': '1/2', '未来安全': 200, '学习培训': 100, '人员考勤': 300 }
        ]
      }
    }
  },
  mounted () {
    const { fetch } = this
    fetch()
    setInterval(fetch, 86400000)
  },
  methods: {
    fetch () {
      this.$http.get('/api/Statistics/ThisWeekActivePeopleNum').then(function (res) {
        const data = JSON.parse(res.data)
        var wlaq = {}
        var xxpx = {}
        var rykq = {}
        for (let i = 0; i < data.length; i++) {
          // this.chartData.columns.push(data[i].message)
          if (data[i].message === '未来安全') {
            wlaq = data[i]
          } else if (data[i].message === '学习培训') {
            xxpx = data[i]
          } else if (data[i].message === '人员考勤') {
            rykq = data[i]
          }
        }
        var list = []
        for (let i = 0; i < wlaq.data.length; i++) {
          var rows = {}
          rows['日期'] = wlaq.data[i].date_time
          rows[wlaq.message] = wlaq.data[i].num
          rows[xxpx.message] = xxpx.data[i].num
          rows[rykq.message] = rykq.data[i].num
          list.push(rows)
        }
        this.chartData.columns = ['日期']
        this.chartData.columns.push(wlaq.message)
        this.chartData.columns.push(xxpx.message)
        this.chartData.columns.push(rykq.message)
        this.chartData.rows = list
      }, function () {
        console.log('请求失败处理')
      })
    }
  }
}
</script>

<style lang="less">
  .vline{
    height: calc( 45% - 5px );
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;

    .ve-line{
      width: 100% !important;
      height: 100% !important;
      background-color: rgba(6, 30, 93, 0.5);
    }
  }

</style>
