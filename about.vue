<script setup>
    import ref from 'vue'
    message = ref('')
</script>

<template>
    <p>You typed: {{ message }}</p>
    <input v-model="message"/>
</template>