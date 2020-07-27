<template>
  <div id="data-view">
    <dv-full-screen-container>

      <top-header />

      <div class="main-content">
        <top-bar />
        <div class="block-main-content">
          <div class="block-main-content-top">
            <div class="active-user">
              <product-mount />
            </div>
            <div class="map">
              <china-map />
            </div>
            <div class="table">
              <water-level-chart></water-level-chart>
            </div>
          </div>
          <div class="block-main-content-bottom">
            <div class="cards-item product">
              <ranking-board></ranking-board>
            </div>
            <div class="cards-item product-user">
              <product-user></product-user>
            </div>
            <div class="cards-item inactive-user">
              <inactive-user></inactive-user>
            </div>
            <div class="cards-item order">
              <last-month-order></last-month-order>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import topBar from './topBar'
import rankingBoard from './rankingBoard'
import productMount from './productMount'
import waterLevelChart from './waterLevelChart'
import productUser from './productUser'
import chinaMap from './map'
import inactiveUser from './inactiveUser'
import lastMonthOrder from './lastMonthOrder'

export default {
  name: 'DataView',
  components: {
    topHeader,
    topBar,
    rankingBoard,
    productMount,
    waterLevelChart,
    chinaMap,
    productUser,
    inactiveUser,
    lastMonthOrder
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;

    .block-main-content {
      width: 100%;
      height: calc(85% - 20px);
      display: flex;
      margin-top: 20px;
      flex-direction: column;

      .block-main-content-top{
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: space-between;

        .active-user{
          width: 40%;
          height: 100%;
        }

        .map{
          margin: 0 20px;
          width: 30%;
          height: 100%;
        }

        .table{
          width: 30%;
          height: 100%;
        }
      }

      .block-main-content-bottom {
        width: 100%;
        height: calc(50% - 20px);
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;

        .cards-item{
          width: 25%;
          height: 100%;
          border-top: 2px solid rgba(1, 153, 209, .5);
          background-color: rgba(6, 30, 93, 0.5);
        }

        .inactive-user,
        .order,
        .product-user{
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
