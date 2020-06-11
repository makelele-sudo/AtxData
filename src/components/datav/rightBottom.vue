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
<!--      <ve-bar-->
<!--        :data="chartDataAddress"-->
<!--        :settings="chartSettingsAddress"-->
<!--        :extend="chartExtendAddress"-->
<!--      />-->
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
    this.chartSettings = {
      level: [['all'], ['all']],
      radius: 120,
      offsetY: 200
    }
    this.chartSettingsAddress = {
      roseType: 'radius',
      radius: 130,
      offsetY: 200
    }
    this.chartExtendAddress = {
      title: {
        show: true,
        text: '用户分布',
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
        radius: '50%',
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
      chartDataAddress: {
        columns: ['name', 'num'],
        rows: []
      },
      chartDataOrder: {
        columns: ['产品', '咨询量', '下单量', '下单率'],
        rows: [
          { '产品': '商城', '咨询量': 342, '下单量': 32, '下单率': 0.2 },
          { '产品': '科卫', '咨询量': 23, '下单量': 4, '下单率': 0.26 },
          { '产品': '佳保', '咨询量': 54, '下单量': 2, '下单率': 0.76 },
          { '产品': '智慧消防', '咨询量': 23, '下单量': 7, '下单率': 0.49 }
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
      }, function () {
        console.log('请求失败处理')
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
