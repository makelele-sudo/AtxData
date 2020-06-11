<template>
  <div id="digital-flop">
    <div>
      <div class="digital-flop-title">产品数量</div>
      <div class="digital-flop">
          <span class="num">22</span>
          <div class="unit">个</div>
      </div>
    </div>
    <div>
      <div class="digital-flop-title">客户数量</div>
      <div class="digital-flop">
        <span class="num">92</span>
        <div class="unit">家</div>
      </div>
    </div>
    <div>
      <div class="digital-flop-title">用户总数</div>
      <div class="digital-flop">
        <span class="num">{{ userTotal }}</span>
        <div class="unit">个</div>
      </div>
    </div>
    <div>
      <div class="digital-flop-title">今日活跃用户数</div>
      <div class="digital-flop">
        <span class="num">{{ ActivePeopleNum }}</span>
        <div class="unit">个</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalFlop',
  data () {
    return {
      userTotal: 0,
      ActivePeopleNum: 0
    }
  },
  mounted () {
    const { createData } = this
    createData()
    setInterval(createData, 86400000)
  },
  methods: {
    createData () {
      this.$http.get('/api/Statistics/allPeopleNum').then(function (res) {
        const data = JSON.parse(res.data)
        const r = data.data
        for (let i = 0; i < r.length; i++) {
          this.userTotal += r[i].num
        }
      }, function () {
        console.log('请求失败处理')
      })
      this.$http.get('/api/Statistics/ThisWeekActivePeopleNum').then(function (res) {
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
        this.ActivePeopleNum = wlaq.data[wlaq.data.length - 1].num + xxpx.data[wlaq.data.length - 1].num + rykq.data[wlaq.data.length - 1].num
      }, function () {
        console.log('请求失败处理')
      })
    }
  }
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  padding: 0 10px;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }
  .num {
    font-size: 36px;
    font-weight: bold;
    color:#41faee;
  }
  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
