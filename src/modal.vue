<script>
    export default{
     data(){
        return{
            name:'AlertDefault',
            openClose:this.visible
        }
     } ,
     props:{
        visible:Boolean
     },
     methods:{
        openCloseFun(){
            this.openClose = !this.openClose;
        }
    },
    watch:{
            visible:function(newVal,oldVal){
                this.openClose = newVal;
            }
    }   
    }
</script>
<template>

<div v-if="openClose" class="modal fade show d-block" >
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" @click="openCloseFun()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>The city not Found</p>
      </div>
      <div class="modal-footer">
       
        <button type="button" @click="openCloseFun()" class="btn btn-dark" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>