<template>
  <div class="ImageCard">
    <div class="content-img">
        <img v-bind:src="'data:image/'+ image.extension +';base64,'+image.image" >
        <div class="content-img-title">
            <router-link :to="{name:'image', params: {id: image.image_id}}"> {{ image.name }} </router-link>
        </div>
        <div class="content-img-description">
            <p>{{ image.description }}</p>
        </div>
        <div class="content-img-link">
            <router-link :to="'/editar/'+image.image_id" class="btn btn-success">Editar</router-link>
            <button class="btn btn-danger"  @click="deleteImage(image.image_id)">Eliminar</button>
        </div>
    </div>
  </div>
</template>

<script>
import Global from '../Global';
import axios from 'axios';
import swal from 'sweetalert';
export default {
  name: 'ImageCard',
  props: ['image'],
  data() {
      return {
          url: Global.url
      }
  },
  methods: {
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
  
                    location.reload();
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
