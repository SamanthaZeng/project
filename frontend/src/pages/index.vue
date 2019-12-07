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

    <div class="charts">
        <div id="main" style=" width:100%; height:350px;"></div>
  </div>
    <!--饼状图-->
    <div class="charts">
        <div id="main2" style=" width:100%; height:350px;"></div>
  </div>

  </div>
  </div>
</template>
<script>
  import table from '@/components/table'
   import echarts from 'echarts';
    export default {
        name: "index",
        components:{
            'table-proj':table
        },
        data(){
            return{
                crimerecords : [],
                hournumber:new Array(24),
                weeknumber:new Array(7),
                opinion: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
                opinionData:[],
                bar: {},
                loading: true,
                chart:null,
            }
        },
        methods:{
            getMyEvent(msg){
                this.crimerecords = msg
                console.log("crimerecords",this.crimerecords)
                this.crimerecords[2] = this.crimerecords[2].map(Number)
                this.caculatehour()
                this.caculateweek()
                this.draw('main')
                this.draw2('main2')
            },
            caculatehour(){
                let j = 0
                let numbers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                for (let item of this.crimerecords[2]){
                    numbers[item]++
                }
                console.log("numbers",numbers)
                this.hournumber = numbers
                console.log('hournumber',this.hournumber)

            },
            caculateweek(){
                let j = 0
                let numbers = [0,0,0,0,0,0,0]
                for (let item of this.crimerecords[0]){
                    if(item == 'Monday')
                        numbers[0]++
                    if(item == 'Tuesday')
                        numbers[1]++
                    if(item == 'Wednesday')
                        numbers[2]++
                    if(item == 'Thursday')
                        numbers[3]++
                    if(item == 'Fridat')
                        numbers[4]++
                    if(item == 'Saturday')
                        numbers[5]++
                    if(item == 'Sunday')
                        numbers[6]++
                }
                console.log("numbers",numbers)
                this.weeknumber = numbers
                console.log('weeknumber',this.weeknumber)
                let weekdata = [{value:numbers[0],name:'Monday'},{value:numbers[1],name:'Tuesday'},
                    {value:numbers[2],name:'Wednesday'},{value:numbers[3],name:'Thursday'},
                {value:numbers[4],name:'Friday'},{value:numbers[5],name:'Saturday'},
                {value:numbers[6],name:'Sunday'}]
                this.opinionData = weekdata
                console.log('opiniodata',this.opinionData)
            },
            onReady(instance, ECharts) {
                console.log(instance, ECharts);
                },
            draw(id){
                // 绘图方法
                this.chart = echarts.init(document.getElementById(id))
                    // 皮肤添加同一般使用方式
                this.chart.showLoading();
                    // 返回到data中
                var that = this
                this.chart.setOption({
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
                        type: 'bar',
                        itemStyle:{
                            normal:{
                                color:'#2c3e50'
                            }
                        }
                    }]
                })
                this.chart.hideLoading()
            },
            draw2(id){
                this.chart = echarts.init(document.getElementById(id))
                this.chart.showLoading();
                this.chart.setOption({
                    title: {
                        text: 'number of weekdays',
                        subtext: 'from monday to sunday',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: this.opinion // this
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['pie']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    series: [{
                        type: 'pie',
                        // 内圆半径，外圆半径
                        radius: [30, 100],
                        // 位置，左右，上下
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: this.opinionData, // this
                    }]
                })
                this.chart.hideLoading()
            }
        }
    }
</script>

<style scoped>
  @import '../components/css/style.css';
</style>
