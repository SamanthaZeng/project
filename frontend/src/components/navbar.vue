<template>
  <div>
    <ul >
      <li class="active"><a href="#">home</a></li>
      <li><a href="#">Datasets</a></li>
      <li><a href="#">Notebooks</a></li>
      <li><a href="#">Discussion</a></li>
      <li><a href="#">Documentation</a></li>
      <li><a href="#">Progression</a></li>
      <li style="float: right;color: #f2f2f2;padding: 12px; font-size:20px">
        <font-awesome-icon :icon="['fas','user-secret']"/>
      </li>
      <li style="float: right;color: #f2f2f2;padding: 12px; font-size:20px">
        <font-awesome-icon :icon="['fas','bell']"/>
      </li>
      <li style="float: right;padding: 5px">
        <el-input placeholder="Search"
                prefix-icon="el-icon-search"
                v-model="input1">
       </el-input>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                input1: '',
            }
        },
        name: "navbar"
    }
</script>

<style scoped>
  @import './css/style.css';
</style>
