<template>
  <router-view></router-view>
</template>

<style>
/* 清除浏览器默认的内外边距，让布局贴边 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
</style>