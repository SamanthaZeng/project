<template>
  <div>
    <div class="border">
    <div class="header">
      <div class="left">
        <div class="content">
          <font-awesome-icon style="color:#888888" :icon = "['fas','table']"/>
          <i> Crime in Boston</i>
        </div>
      </div>
    </div>
    <table-proj @my-event="getMyEvent"></table-proj>
  </div>
  <div class="border">
    <div class="header">
      <div class="left">
        <div class="content">
          <font-awesome-icon style="color:#888888" :icon = "['fas','table']"/>
          <i> data visualization</i>
        </div>
      </div>
    </div>
    <trend
  :data="hournumber"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>

    <!-- 柱状图 -->
    <div class="echarts">

    <chart
      :option="bar"
      :loading="loading"
      @ready="onReady"
    />
  </div>

  </div>
  </div>
</template>
<script>
  import table from '@/components/table'

    export default {
        name: "index",
        components:{
            'table-proj':table
        },
        data(){
            return{
                crimerecords : [],
                hournumber:new Array(24),
                bar: {},
                loading: true,
            }
        },
        methods:{
            getMyEvent(msg){
                this.crimerecords = msg
                console.log("crimerecords",this.crimerecords[2].map(Number))
                this.crimerecords[2] = this.crimerecords[2].map(Number)
                this.caculatehour()
            },
            caculatehour(){
                let j = 0
                // for (; j++; j < 30){
                //     console.log("hello")
                // }
                let numbers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                for (let item of this.crimerecords[2]){
                    numbers[item]++
                }
                console.log("numbers",numbers)
                this.hournumber = numbers
                console.log('hournumber',this.hournumber)

                this.bar = {
                    title: {
                        text: 'number of hour'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['0','1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.hournumber,
                        type: 'bar'}]
                }
            },
            onReady(instance, ECharts) {
                console.log(instance, ECharts);
                },
        }
    }
</script>

<style scoped>
  @import '../components/css/style.css';
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>
