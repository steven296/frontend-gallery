<template>
  <section id="LastImages">
    <div class="wrapper mt-5">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6">
                                    <h5 class="mb-0">Mis Imagenes</h5>
                                </div> 
                                <div class="col-6">
                                    <button class="btn btn-primary float-right" @click="redirigirUploadImage()">Subir Imagen</button>
                                </div>  
                            </div>  
                        </div>
                        <div class="card-body">
                            
                            <Search></Search>

                            <div class="row">
                                <div class="col-lg-3 col-xs-12" v-for="image in images" :key="image.image_id">
                                    
                                    <ImageCard :image="image"></ImageCard>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import Global from '../Global';
import ImageCard from './ImageCard.vue';
import Search from './Search.vue';
import axios from 'axios';
export default {
    name: 'LastImages',
    components: {
        Search,
        ImageCard
    },
    data() {
        return {
            url: Global.url,
            images: []
        }
    },
    mounted() {
        this.getImages();
    },
    methods: {
        getImages() {
            axios.get(this.url + 'images')
                .then(response => {
                    if(response.data.success) {
                        this.images = response.data.images;
                    }
                }).catch(e => console.log(e));
        },
        redirigirUploadImage() {
            this.$router.push('/subir-imagen');
        }
    }
}
</script>

<style>
@import '../assets/css/styles.css';
</style>