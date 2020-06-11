<template>
  <div id="myChart"></div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let geoCoordMap = {
        '成都': [103.9526, 30.7617],
        '西安': [109.1162, 34.2004],
        '西宁': [101.4038, 36.8207],
        '哈尔滨': [ 127.9688, 45.368 ]
      }

      var XAData = [
        [{ name: '西安' }, { name: '西安', value: 'http://www.atx.net.cn' }],
        [{ name: '西安' }, { name: '成都', value: 'http://www.baidu.com' }],
        [{ name: '西安' }, { name: '西宁', value: 'http://www.baidu.com' }],
        [{ name: '西安' }, { name: '哈尔滨', value: 'http://www.baidu.com' }]
      ]

      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[0].name]
          var toCoord = geoCoordMap[dataItem[1].name]
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value
            })
          }
        }
        return res
      }

      var color = ['#a6c84c', '#ffa022', '#46bee9']
      var series = [];
      [[ '西安', XAData ]].forEach(function (item, i) {
        series.push({
          name: item[0],
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 10,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0],
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 10,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function (dataItem) {
            let value = geoCoordMap[dataItem[1].name].concat(dataItem[1].value)
            return {
              name: dataItem[1].name,
              value: value
            }
          })
        })
      })
      let option = {
        backgroundColor: 'rgba(6, 30, 93, 0.4)',
        title: {
          text: '安天下全国分公司',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '20',
            lineHeight: '50'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.data.name
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#404a59'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: series
      }
      // 绘制图表
      myChart.setOption(option)

      myChart.on('click', function (params) {
        if (params.componentType === 'geo') {
          console.log('请点击城市')
        } else if (params.componentType === 'series') {
          const url = params.data.value[2]
          window.open(url)
        }
      })
    }
  }
}
</script>

<style lang="less">
  #myChart {
    width: 40%;
    height: 100%;
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;
  }
</style>
