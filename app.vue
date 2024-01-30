<script setup>
    import { ref } from 'vue';
    
    const message = ref('')

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
      <p>You typed: {{ message }}</p>
      <input name="search" class="search" type="search" v-model="message"/>
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
    position: absolute;
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
    background-color: rgba(255, 255, 255, 0.25);
    padding: 20px;
  }

  .search {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
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