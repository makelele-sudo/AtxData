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
      var mapName = 'china'
      var geoCoordMap = {}

      // 获取地图数据
      myChart.showLoading()
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features
      myChart.hideLoading()
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })

      var data = []
      var convertData = function (data) {
        var array = []
        for (var i = 0; i < data.length; i++) {
          var sheng = data[i].name.replace('省', '').replace('市', '').replace('自治区', '')
          var geoCoord = geoCoordMap[sheng]
          if (geoCoord) {
            array.push({
              name: sheng,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return array
      }
      var option = {
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0f378f' // 0% 处的颜色
          }, {
            offset: 1, color: '#00091a' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        title: {
          top: 20,
          text: '安天下全国用户分布',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#ccc'
          }
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1]
        },
        geo: {
          map: 'china',
          show: true,
          roam: true,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#3a7fd5',
              borderColor: '#0a53e9', // 线
              shadowColor: '#092f8f', // 外发光
              shadowBlur: 20
            },
            emphasis: {
              areaColor: '#0a2dae' // 悬浮区背景
            }
          }
        },
        series: [
          {
            symbolSize: 5,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data)
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: 'Top 5',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [50, 50],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                },
                formatter (value) {
                  return value.data.value[2]
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#D8BC37' // 标志颜色
              }
            },
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
          }
        ]
      }
      myChart.setOption(option)

      this.$http.get('/api/Statistics/user_address').then(function (res) {
        var data = JSON.parse(res.data)
        convertData(data)
        option = {
          series: [
            {
              data: convertData(data)
            },
            {
              data: data
            },
            {
              data: convertData(data)
            }
          ]
        }
        myChart.setOption(option)
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
