<template>
  <div id="water-level-chart">
    <div class="water-level-chart-name">
      <div class="water-level-chart-title">平台收益</div>
      <div class="water-level-chart-total">
        <span>总计</span><span><b>1,687,900</b></span>
      </div>
    </div>
    <div class="water-level-chart-table">
      <dv-scroll-board :config="config" style="width:100%;height:100%" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaterLevelChart',
  data () {
    return {
      totalData: {
        name: '',
        num: 0
      },
      config: {
        header: ['平台名称', '收益', '安装量'],
        data: [
          ['安保一体化', '1,200,000', '60'],
          ['考试培训系统', '410,580', '5'],
          ['电子考勤系统', '36,320', '3'],
          ['内部管理OA', '30,000', '1'],
          ['智能巡检', '11,000', '2'],
          ['智慧社区管理', '0', '4'],
          ['未来安全', '0', '1']
        ],
        headerHeight: 40,
        rowNum: 5,
        align: ['center', 'center', 'center']
      }
    }
  }
  // mounted () {
  //   this.getMoneyTotal()
  // },
  // methods: {
  //   getMoneyTotal () {
  //     this.$http.get('/api/Statistics/CapitalIncome').then((res) => {
  //       this.totalData = JSON.parse(res.data)
  //     })
  //   }
  // }
}
</script>

<style lang="less">
#water-level-chart {
  width: 30%;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;

  .water-level-chart-name{
    height: 30%;
    display: flex;
    flex-direction: column;

    .water-level-chart-title{
      height: 50%;
      font-weight: bold;
      display: flex;
      align-items: center;
      font-size: 20px;
      justify-content: center;
    }

    .water-level-chart-total {
      flex: 1;
      display: flex;
      align-items: baseline;

      span {
        font-size: 16px;
        color: #fff;
        margin-bottom: -5px;

        &:nth-child(1) {
          width: 30%;
          padding-left: 5%;
        }

        &:nth-child(2) {
          width: 70%;
          padding-left: 10%;
        }

        b{
          font-size: 35px;
          font-weight: bold;
          color: #58a1ff;
          margin: 0 5px;
          margin-bottom: -5px;
        }
      }
    }
  }

  .water-level-chart-table{
    height: 70%;
    display: flex;
    flex-direction: column;

    .table-name{
      font-size: 20px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .dv-scroll-board{
      flex: 1;
    }
    .table-total{
      height: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: rgb(0, 186, 255);
    }
  }
}
</style>
