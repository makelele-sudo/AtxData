<template>
  <div id="data-view">
    <dv-full-screen-container>

      <top-header />

      <div class="main-content">
        <top-bar />
        <div class="block-left-right-content">
          <div class="left">
            <product-user />
            <ranking-board />
          </div>
          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <user-address />
              <china-map />
              <product-mount />
              <water-levelChart />
            </div>

            <right-bottom />
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
import rightBottom from './rightBottom'
import chinaMap from './map'
import userAddress from './address'

export default {
  name: 'DataView',
  components: {
    topHeader,
    topBar,
    rankingBoard,
    productMount,
    waterLevelChart,
    chinaMap,
    userAddress,
    productUser,
    rightBottom
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
    flex: 1;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;

    .left{
      width: 20%;
      height: 100%;
    }
  }

  .block-left-right-content {
    flex: 1;
    height: calc(75% - 20px);
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
