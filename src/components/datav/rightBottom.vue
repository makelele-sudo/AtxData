<template>
  <div id="cards">
    <div class="cards-item">
      <ve-pie
        :data="chartData"
        :settings="chartSettings"
        :extend="chartExtend"
      />
    </div>
    <div class="cards-item">
      <ve-pie
        :data="chartData1"
        :extend="chartExtend1"
      />
    </div>
    <div class="cards-item">
      <ve-radar
        :data="chartDataOrder"
        :extend="chartExtendOrder"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    this.chartExtend = {
      title: {
        show: true,
        text: '用户分析',
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
        top: 50,
        textStyle: {
          color: '#fff'
        }
      }
    }
    this.chartExtend1 = {
      title: {
        show: true,
        text: '半年未活跃用户',
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
      }
    }
    this.chartSettings = {
      level: [['all'], ['all']],
      radius: 120,
      offsetY: 200
    }
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
      chartData: {
        columns: ['name', 'num'],
        rows: [
          { 'name': 'all', 'num': 100 }
        ]
      },
      chartData1: {
        columns: ['名称', '数值'],
        rows: []
      },
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
  },
  mounted () {
    const { createData } = this
    createData()
    setInterval(createData, 86400000)
  },
  methods: {
    createData () {
      this.$http.get('/api/Statistics/analysis').then(function (res) {
        const data = JSON.parse(res.data)
        const r = data.data
        this.chartData.rows = r
        var arr01 = []
        var arr02 = []
        for (let i = 0; i < r.length; i++) {
          if (i < 2) {
            arr01.push(r[i].name)
          } else {
            arr02.push(r[i].name)
          }
        }
        var list = [arr01, arr02]
        this.chartSettings.level = list
      })
      // 获取半年活跃量
      this.$http.get('/api/Statistics/InactiveUsersForHalfAYear').then(function (res) {
        const data = JSON.parse(res.data)
        for (let i = 0; i < data.length; i++) {
          var rows = {}
          rows['名称'] = data[i].name
          rows['数值'] = data[i].num
          this.chartData1.rows.push(rows)
        }
      })
    }
  }
}
</script>

<style lang="less">
#cards {
  display: flex;
  justify-content: space-between;
  height: 45%;
  width: 100%;
  .cards-item:first-child{
    margin-left: 0;
  }
  .cards-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 33%;
    height: 100%;
    margin-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .ve-pie{
      width: 100% !important;
      height: 100% !important;
    }
    .ve-bar{
      width: 100% !important;
      height: 100% !important;
    }
    .ve-radar {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
