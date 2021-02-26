<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: 'Hello webpack',
      name: '刘德樟'
    }
  },
  methods: {
    btnClick() {
      alert(this.value);
    }
  }
}
</script>

<style scoped>
.title {
  color: red;
  font-family: '华文楷体';
}
</style>