<template>
  <div id="app">
    
    <nav>
      <div class="main-title"><router-link to="/red-arc">🚨 Red Arc</router-link></div>
    </nav>

    <div id="main-body">
      <router-view></router-view>
    </div>

    <footer>
      Red Arc Games - 2024
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>
