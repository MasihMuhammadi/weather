<script>

import Modal from './modal.vue'


 export default {
 

  components:{
    Modal
  },
  
  data() {
    return {
      input: '',
      desc: '',
      temp: 0,
      country: 'AF',
      city: 'Kabul',
      message: '',
      dark_light: false,
      selected:'Celcius',
      visible:false,
      icon:'',
    
    }
  },
 
  methods: {
    toggle_page() {
      this.dark_light = !this.dark_light;
    },
    onSubmit(event) {

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=0c017430e8f5a73b6c783a2d01cfb982`
      )
        .then((res) => res.json())

        .then((data) => {
          // console.log(data)
          this.icon = data.weather[0].icon
          this.desc = data.weather[0].main
          this.temp = data.main.temp
          this.country = data.sys.country
          this.city = data.name
        })
        .catch((err) => {
        console.log(err.message),
           this.visible = true;
        })

    }
  }
}
</script>

<template class="">
  <Modal :visible="visible" />
  <div class="row align-items-center justify-content-center" :class="{ background_dark: dark_light == false, background_light: dark_light }">
   <div class="col-sm">
     <div class="toggler" :class='{toggler_dark : dark_light}' @click="toggle_page">
      <input type="checkbox" v-model="dark_light" />
      <div class="toggle-btn" :class="{ go_to: dark_light, come_to: dark_light == false }"></div>
    </div>
    <input type="text" :class="{input_dark:dark_light}" v-model="input" placeholder="City Name e.g  Paris" />
    <button :class="{btn_dark : dark_light, btn_light : dark_light == false}" @click="onSubmit">sumbit</button>
    
    <br />
    
    <select class="mt-2 bg-dark text-white" v-model="selected">
      <option selected>Kelvin</option>
      <option>Farenhait</option>
      <option>Celcius</option>
    </select>
  </div>

    <div class="mt-5 col-sm" >
      <h3>{{ city }}, {{ country }} 
        <img class="ms-3 d-inline" v-bind:src="`https://flagcdn.com/${country.toLocaleLowerCase()}.svg`" width="40"/>
    
      </h3> 
      <div class="temp-bg d-inline-block p-5">
        <h1 v-if="selected == 'Celcius'" style="font-size: 80px">
       {{ Math.round( temp - 273.15)}} <span>&#8451;</span>
        </h1>
    <h1 v-else-if="selected == 'Kelvin'" style="font-size: 80px">
       {{ Math.round(Math.round(temp)) }} <span>&#8490;</span>
    </h1>
    <h1 v-else="selected == 'Farenhait'" style="font-size: 80px">
       {{ Math.round((temp - 273.15) * 9/5 + 32) }} <span>&#8457;</span>
    </h1>
      </div>
 
      <h3 class="px-5">{{ desc }}  <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`" width="70" /></h3> 

</div>

  </div>
</template>





<style>
.temp-bg{
  background-color:rgba(95, 93, 93, 0.6);
  border-radius: 10px;
}
.toggle-btn {
  width: 18px;
  height: 17px;
  background-color: rgba(0,0,0,0.8);
  border-radius: 50%;
}
.come_to {
  transform: translateX(0px);
  transition: transform 0.5s;
  background-color: white;
}
.go_to {
  transform: translateX(20px);
  transition: transform 0.5s;
}
.btn_light{
  color:white;
  background-color: rgba(0,0,0,0.1);
  border:1px solid white;
}
.btn_light:hover{
  color:black;
  background:white;
}
.btn_dark{
  color:black;
  background-color: white;
  border:1px solid black;
}
.btn_dark:hover{
  color:white;;
  border:1px solid rgba(0,0,0,0.7);
  background-color:rgba(0,0,0,0.8);
}

</style>
