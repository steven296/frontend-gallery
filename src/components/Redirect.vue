<template> 
  <div class="Redirect">
    <h4>Redirigiendo...</h4>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  mounted() {
        var searchString = this.$route.params.searchString;
        this.$router.push('/buscador/'+searchString);
    }
}
</script>
