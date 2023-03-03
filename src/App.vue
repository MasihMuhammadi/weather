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
      country: '',
      city: '',
      message: '',
      dark_light: false,
      selected:'',
      visible:false,
    
    }
  },
  methods: {

    
  
    toggle_page() {
      this.dark_light = !this.dark_light
    },
    onSubmit(event) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=0c017430e8f5a73b6c783a2d01cfb982`
      )
        .then((res) => res.json())

        .then((data) => {
          this.desc = data.weather[0].description
          this.temp = data.main.temp
          this.country = data.sys.country
          this.city = data.name
        })
        .catch((err) => {
           this.visible = true
        })
    }
  }
}
</script>

<template class="">
  <Modal :visible="visible" />
  <div :class="{ background_dark: dark_light == false, background_light: dark_light }">
   
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





    <div class="mt-5 row">

  <div class="col-sm">
    <p>Weather</p>
    <h1>
    
      {{ desc }} 
    </h1>
  </div>
  <div class="col-sm">
    <p>Country</p>
    <h1>
      {{ country }} 
     
    </h1>
  </div>
  <div class="col-sm">
    <p>Temprature</p>
    <h1 v-if="selected == 'Celcius'">
       {{ Math.round( temp - 273.15)}} 
    </h1>
    <h1 v-else-if="selected == 'Kelvin'">
       {{ Math.round(Math.round(temp))}} 
    </h1>
    <h1 v-else="selected == 'Farenhait'">
       {{ Math.round((temp - 273.15) * 9/5 + 32) }} 
    </h1>
  </div>
  <div class="col-sm">
  
    <img v-bind:src="`https://flagcdn.com/${country.toLocaleLowerCase()}.svg`" width="80"/>

  </div>

</div>

  </div>
</template>





<style>
.toggle-btn {
  width: 18px;
  height: 18px;
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
