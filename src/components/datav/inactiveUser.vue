<template>
  <div class="cards">
    <ve-pie
      :data="chartData1"
      :extend="chartExtend1"
    />
  </div>
</template>

<script>
export default {
  data () {
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
    return {
      chartData1: {
        columns: ['名称', '数值'],
        rows: []
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
.cards {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .ve-pie{
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
