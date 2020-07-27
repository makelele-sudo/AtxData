<template>
  <div id="rose-chart">
    <div class="clickBtn">
      <span :class="{ 'active': index === 1 }" @click="handleClick(7, 1)">一周活跃用户</span>
      <span :class="{ 'active': index === 2 }" @click="handleClick(30, 2)">一月活跃用户</span>
      <span :class="{ 'active': index === 3 }" @click="handleClick(180, 3)">半年活跃用户</span>
    </div>
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
        text: '',
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
        type: 'category',
        axisLabel: {
          rotate: 30
        },
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
        bottom: 10,
        left: 10,
        right: 40
      }
    }
    return {
      index: 1,
      day: 7,
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
    fetch(7)
    setInterval(fetch, 86400000)
  },
  methods: {
    fetch (num) {
      this.$http.get('/api/Statistics/ThisWeekActivePeopleNum?days=' + num).then(function (res) {
        const data = JSON.parse(res.data)
        var wlaq = {}
        var xxpx = {}
        var rykq = {}
        for (let i = 0; i < data.length; i++) {
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
          rows['日期'] = wlaq.data[i].date_time.substring(5)
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
    },
    handleClick (days, index) {
      this.index = index
      this.fetch(days)
    }
  }
}
</script>

<style lang="less">
#rose-chart{
    width: 100%;
    height: 100%;
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;
    position: relative;

    .ve-line{
      width: 100% !important;
      height: 100% !important;
      background-color: rgba(6, 30, 93, 0.5);
    }

    .clickBtn{
      position: absolute;
      width: 100%;
      height: 40px;
      top: 0px;
      left: 0px;
      line-height: 40px;
      display: flex;
      z-index: 999;

      span{
        width: 33%;
        display: inline-block;
        padding: 0 10px;
        color: #41faee;
        border: 1px solid #fff;
        text-align: center;
        cursor: pointer;
      }

      .active{
        color: #fff;
        background: darkcyan;
      }
    }
  }

</style>
