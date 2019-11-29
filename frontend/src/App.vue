<template>
  <div id="app">
    <navbar-proj></navbar-proj>
    <div style = "padding: 20px">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import navbar from '@/components/navbar';
  export default {
    name: 'App',
    components:{
        'navbar-proj':navbar
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
