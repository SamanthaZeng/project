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
    <table-proj></table-proj>
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
      :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
      auto-draw
      smooth>
    </trend>
  </div>
  </div>
</template>
<script>
  import table from '@/components/table'
    export default {
        name: "index",
        components:{
            'table-proj':table
        }
    }
</script>

<style scoped>
  @import '../components/css/style.css';
</style>
