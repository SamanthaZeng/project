<template>
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
