<template>
  <div id="app">
    <!--<LastImages></LastImages>-->
    <router-view></router-view>

  </div>
</template>

<script>
/*import LastImages from './components/LastImages.vue'*/
/*import UploadImage from './components/UploadImage.vue'*/
export default {
  name: 'App',
  components: {
    /*LastImages*/
    /*UploadImage*/
  },
  data() {
    return {
      images: null
    }
  },
}
</script>

