<template>
    <div class="navbar">
      <ul>
        <li v-for="(item, index) in navbarItems" :key="index">
          <router-link :to="item.link">{{ item.text }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        navbarItems: [
          { text: 'Home', link: '/' },
          { text: 'About', link: '/about' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
    .navbar {
        background-color: #fe6b46;
        padding: 15px;
    }
    
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }
    
    li {
        margin-right: 15px;
    }
  
    a {
    text-decoration: none;
    color: white;
    border: 2px solid transparent;
    padding: 8px 12px;
    border-radius: 5px;
    transition: border-color 0.3s ease-in-out;
    }

    a:hover {
    border-color: #fff; /* Change this to the highlight color you prefer */
    }
  </style>