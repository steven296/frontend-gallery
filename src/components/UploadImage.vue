<template>
  <section id="UploadImage">
    <div class="wrapper mt-5">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card">
                    <form v-on:submit.prevent="save()">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6">
                                    <h5 class="mb-0">Subir Nueva Imagen</h5>
                                    <p class="text-muted mb-0">Suba cualquier imagen en formato png o jpg.</p>
                                </div> 
                                <div class="col-6">
                                    <button class="btn btn-dark float-right" @click="redirigirAlHome()">Mis Imagenes</button>
                                </div>  
                            </div>  
                        </div>
                        <div class="card-body">
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
                            <div class="form-group">
                                <label for="address-line-2">Imagen *</label>
                                <input type="file" class="form-control-file" name="file-input" id="file" ref="file" @change="fileChange()">
                            </div>
                            
                        </div>
                        <div class="card-footer text-muted d-flex align-items-center">
                            <input type="submit" class="btn btn-primary mr-3" value="Registrar" />
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
import Global from '../Global';
import Image from '../models/Image';
import axios from 'axios';
import swal from 'sweetalert';
export default {
    name: 'UploadImage',
    data() {
        return {
            url: Global.url,
            file: '',
            image: new Image('', '', '')
        }
    },
    mounted() {
        //console.log(this.image);
    },
    methods: {
        redirigirAlHome() {
            this.$router.push('/home');
        },
        save() {

            axios.post(this.url + 'images', this.image)
                .then(response => {
                    
                    if(response.data.success){

                        const formData = new FormData();
                        formData.append('file-input', this.file, this.file.name);
                        var image_id = response.data.image.image_id;

                        axios.post(this.url + 'upload-image/'+image_id, formData)
                            .then(response => {
                                if(response.data.success){

                                    swal(
                                        'Imagen Guardada con Exito',
                                        'Se guardo la imagen de manera exitosa.',
                                        'success'
                                    );

                                    this.image = response.data.image;
                                    this.$router.push('/home');
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