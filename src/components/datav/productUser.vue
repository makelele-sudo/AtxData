<template>
  <div class="histogram">
    <ve-histogram
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
        text: '产品用户',
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
        show: false,
        top: 0,
        textStyle: {
          color: '#fff'
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
        right: 40
      }
    }
    return {
      chartData: {
        columns: ['name', '数量'],
        rows: [
          { name: '未来安全', 数量: 10 },
          { name: '安保一体化', 数量: 10 },
          { name: '培训CCG', 数量: 10 },
          { name: '培训国鼎', 数量: 10 },
          { name: '考勤', 数量: 10 }
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
      this.$http.get('/api/Statistics/allPeopleNum').then(function (res) {
        const data = JSON.parse(res.data)
        const r = data.data
        let rows = {}
        let list = []
        for (let i = 0; i < r.length; i++) {
          rows = { name: r[i].name, 数量: r[i].num }
          list.push(rows)
        }
        this.chartData.rows = list
      }, function () {
        console.log('请求失败处理')
      })
    }
  }
}
</script>

<style lang="less">
  .histogram{
    width: 100%;
    height: 55%;
    padding-bottom: 20px;
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;

    .ve-histogram{
      width: 100% !important;
      height: 100% !important;
      background-color: rgba(6, 30, 93, 0.5);
    }
  }

</style>
