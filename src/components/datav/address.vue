<template>
  <div id="address">
    <li v-for="item in items" :key="item.message">
      {{ item.name }}:{{ item.num }}
    </li>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    const { fetch } = this
    fetch()
    setInterval(fetch, 86400000)
  },
  methods: {
    fetch () {
      this.$http.get('/api/Statistics/user_address').then(function (res) {
        const data = JSON.parse(res.data)
        console.log(data)
        this.items = data
        // const r = data.data
        // let rows = {}
        // let list = []
        // for (let i = 0; i < r.length; i++) {
        //   rows = { name: r[i].name, 数量: r[i].num }
        //   list.push(rows)
        // }
        // this.chartData.rows = list
      }, function () {
        console.log('请求失败处理')
      })
    }
  }
}
</script>

<style lang="less">
  #address{
    width: 10%;
    height: 100%;
    border-top: 2px solid rgba(1, 153, 209, .5);
    background-color: rgba(6, 30, 93, 0.4);
    box-sizing: border-box;

    li{
      font-size: 5px;
    }
  }

</style>
