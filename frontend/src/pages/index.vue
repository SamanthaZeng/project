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
  :data="crimerecords[2]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>
    <!-- 柱状图 -->
<!--    <div style = "display:inline-block;left:230px;" id = "myBar" :style = " {width: '600px' ,height: '500px' ,} " >-->
<!--    </div >-->
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
                hournumber:new Array(24)
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
                for (i = 0; i++; i<24)
                    this.hournumber[i] = 0
                for (i in this.crimerecords){
                    this.hournumber[i]++
                }
                console.log('hournumber',this.hournumber)
            }
        }
    }
</script>

<style scoped>
  @import '../components/css/style.css';
</style>
