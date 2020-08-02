<template>
  <section id="ShowImages">
    <div class="wrapper mt-5">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6">
                                    <h5 class="mb-0">{{ image.name }}</h5>
                                </div> 
                                <div class="col-6">
                                    <button class="btn btn-dark float-right" @click="redirigirAlHome()">Mis Imagenes</button>
                                </div>  
                            </div>  
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 col-xs-12">
                                    <div class="content-img">
                                        <img :src="'data:image/'+ image.extension +';base64,'+ image.image">
                                    </div>
                                </div>

                                <div class="col-lg-6 col-xs-12">
                                    <div class="content-img">
                                        <div class="content-img-title">
                                            {{ image.name }}
                                        </div>
                                        <div class="content-img-description">
                                            <p>{{ image.description }}</p>
                                        </div>
                                        <div class="content-img-description">
                                            <p>Nombre: {{ image.name }}</p>
                                        </div>
                                        <div class="content-img-description">
                                            <p>Tamaño: {{ image.size }} MB</p>
                                        </div>
                                        <div class="content-img-description">
                                            <p>Extension: {{ image.extension }}</p>
                                        </div>
                                        <div class="content-img-description">
                                            <p>Ancho: {{ image.width }}</p>
                                        </div>
                                        <div class="content-img-description">
                                            <p>Altura: {{ image.height }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-muted d-flex align-items-center">
                            <router-link :to="'/editar/'+image.image_id" class="btn btn-success mr-1">Editar</router-link>
                            <button class="btn btn-danger" @click="deleteImage(image.image_id)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
export default {
    name: 'ShowImages',
    data() {
        return {
            url: Global.url,
            image: []
        }
    },
    mounted() {
        var imageId = this.$route.params.id;
        this.getImage(imageId);
    },
    methods: {
        getImage(imageId) {
            axios.get(this.url + 'images/' + imageId)
                .then(response => {
                    if(response.data.success) {
                        this.image = response.data.image;
                    }
                }).catch(e => console.log(e));
        },
        redirigirAlHome() {
            this.$router.push('/home');
        },
        deleteImage(imageId) {
            swal({
                title: "Estas seguro de Eliminar?",
                text: "¡No podrá recuperar esta imagen!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    
                    axios.delete(this.url + 'images/' + imageId)
                        .then(response => {
                            if(response.data.success) {
                                swal(
                                    'Imagen Eliminada con Exito',
                                    'Se elimino la imagen de manera exitosa.',
                                    'success'
                                );

                                this.$router.push('/home');
                            }
                        }).catch(e => console.log(e));

                } else {
                    swal("Cancelado", "No se elimino la imagen", "error");
                }
            });
        }
    }
}
</script>