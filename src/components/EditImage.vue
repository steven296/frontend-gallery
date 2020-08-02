<template>
  <section id="EditImage">
    <div class="wrapper mt-5">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card">
                    <form v-on:submit.prevent="edit()">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6">
                                    <h5 class="mb-0">Editar Imagen</h5>
                                </div> 
                                <div class="col-6">
                                    <button class="btn btn-dark float-right" @click="redirigirAlHome()">Mis Imagenes</button>
                                </div>  
                            </div>  
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label for="first-name">nombre *</label>
                                            <input type="text" class="form-control" name="name" v-model="image.name" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address-line-1">Descripcion</label>
                                        <textarea class="form-control" name="description" v-model="image.description"></textarea>      
                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex justify-content-center img-edit">
                                    <img :src="'data:image/'+ image.extension +';base64,'+ image.image">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address-line-2">Imagen</label>
                                <input type="file" class="form-control-file" name="file-input" id="file" ref="file" @change="fileChange()">
                            </div>
                            
                        </div>
                        <div class="card-footer text-muted d-flex align-items-center">
                            <input type="submit" class="btn btn-primary mr-3" value="Editar" />
                            <small class="text-danger">Los campos marcados * son obligatorios</small>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
  </section>
</template>

<script>
import Image from '../models/Image';
import axios from 'axios';
import Global from '../Global';
import swal from 'sweetalert';
export default {
    name: 'EditImage',
    data() {
        return {
            url: Global.url,
            file: '',
            image: new Image('', '', '')
        }
    },
    mounted() {
        var imageId = this.$route.params.id;
        this.getImage(imageId);
    },
    methods: {
        redirigirAlHome() {
            this.$router.push('/home');
        },
        getImage(imageId) {
            axios.get(this.url + 'images/' + imageId)
                .then(response => {
                    if(response.data.success) {
                        this.image = response.data.image;
                    }
                }).catch(e => console.log(e));
        },
        edit() {
            var imgId = this.$route.params.id;

            axios.patch(this.url + 'images/'+imgId, this.image)
                .then(response => {
                    
                    if(response.data.success){
                        
                        if(this.file != null && this.file != 'undefined' && this.file != ''){
                            
                            const formData = new FormData();
                            formData.append('file-input', this.file, this.file.name);
                            var image_id = response.data.image.image_id;

                            axios.post(this.url + 'upload-image/'+image_id, formData)
                                .then(response => {
                                    if(response.data.success){

                                        swal(
                                            'Imagen Actualizada con Exito',
                                            'Se actualizo la imagen de manera exitosa.',
                                            'success'
                                        );
                                        
                                        this.image = response.data.image;
                                        this.$router.replace('/imagen/'+this.image.image_id);
                                        
                                    }else {
                                        swal(
                                            'Error al subir la Imagen',
                                            'Hubo un error al intentar subir la imagen.',
                                            'error'
                                        );
                                    }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        
                        }else {
                            swal(
                                'Imagen Actualizada con Exito',
                                'Se actualizo la imagen de manera exitosa.',
                                'success'
                            );
                            
                            this.image = response.data.image;
                            this.$router.push('/imagen/'+this.image.image_id);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
           
        },
        fileChange() {
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>

<style>
.card-body .img-edit img{
    width:80%;
}
</style>