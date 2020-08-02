<template> 
  <div class="Search">
    <form v-on:submit.prevent="goSearch()">
      <div class="row">
          <div class="col-4 mb-4">
              <div class="content_search">
                  <input type="search" name="search" placeholder="Buscas alguna Imagen?" v-model="searchImg">
                  <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                          <g transform="translate(-2 -2)" fill="none" fill-rule="evenodd">
                              <path d="M0 0h30v30H0z" />
                              <circle cx="12.5" cy="12.5" r="8.75" stroke="#9BAAB7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.875" />
                              <path stroke="#9BAAB7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.875" d="M26.25 26.25l-7.5-7.5" />
                          </g>
                      </svg>
                  </span>
              </div>
          </div>
          <div class="col-8">
              <input type="submit" class="btn btn-primary" value="Buscar" name="submit" >
          </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchImg: null
    }
  },
  methods: {
      goSearch(){
          this.$router.push('/redirigir/'+this.searchImg);
      }
  }
}
</script>
