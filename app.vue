<script setup>
    import { ref } from 'vue';
    
    const searchQuery = ref('')

    let apiget = await useFetch(`/api/featured`)
    let panelsData = ref(apiget.data.value);

    async function doSearch(){
      let get = await useFetch(`/api/query?search=${searchQuery.value}`)
      panelsData.value = get.data.value
    }

    function getPanelColor(source){
    // Define colors based on the source attribute
      switch (source) {
        case 'printables':
          return '#fe6b46'; // Orange color for Printables
        case 'thingiverse':
          return '#3498db'; // Blue color for Thingiverse
        default:
          return '#e74c3c'; // Red color for unknown source
      }
    };
</script>

<template>
  <div id="app">
    <div class="background-container">
      <div class="left-background"></div>
      <div class="right-background"></div>
    </div>
    <div class="content-container">
      <div class="logo">
        <a href="https://printables.com" target="_blank">
          <img src="./assets/Printi.svg" width="254"/>
        </a>
        <a href="https://thingiverse.com" target="_blank">
          <img src="./assets/Verse.svg" width="280"/>
        </a>
      </div>
      <p>
        <input name="search" class="search" type="search" v-model="searchQuery" @keyup.enter="doSearch()" placeholder="Search for 3D models..."/>
      </p>
      <div class="panel-grid">
        <div v-for="panel in panelsData" :key="panel.url" class="panel" :style="{ backgroundColor: getPanelColor(panel.source) }">
          <a :href="panel.url" target="_blank">
            <img :src="panel.img" alt="Thumbnail">
            <h3>{{ panel.title }}</h3>
          </a>
            <p>Creator: {{ panel.username }}</p>
            <p>Likes: {{ panel.likes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    height: 200hv; /* Full viewport height */
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: top; 
    font-family: Arial, Helvetica, sans-serif;
  }

  .background-container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left-background,
  .right-background {
    flex: 1;
  }

  .left-background {
    background-color: #fe6b46; /* Left side color*/
  }

  .right-background {
    background-color: #3498db; /* Right side color */
  }

  .content-container {
    z-index: 1;
    position: relative;
    width: 95%; /* Adjust this value based on your preference */
    height: 90%; /* Adjust this value based on your preference */
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.364);
    padding: 20px;
  }

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15vh;
    transform: translateX(18px);
  }

  .logo img{
    margin-right: 8px;
  }

  .search {
    position: relative;
    display: flex;
    width: 100%;
    height: 5vh;
    font-size: large;
    padding: 20px;
  }

  .panel-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }

  .panel {
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    color: white;
  }

  .panel img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>