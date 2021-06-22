<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>
      Am I Logged in?
      {{this.$store.state.isLoggedIn}}
    </p>

    <p v-if="this.$store.state.loggedInAs">
      Logged in as:
      {{this.$store.state.loggedInAs}}
    </p>
    <div v-if="!this.$store.state.isLoggedIn">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="pass" type="password" placeholder="Password">
      <button @click="login">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Home',
  data(){
    return {
      userCredentials: null,
      username: '',
      pass: ''
    }
  },
  methods: {
    login(){
      if(this.userCredentials == null) {
        axios.get('https://api.npoint.io/1000709855bae40f18d8')
              .then(response => {
                this.userCredentials = response.data.Users;
                this.compareCreds();
              })
      } else {
        this.compareCreds();
      }
    },
    compareCreds(){
      var credentialMatch = false;
      for(var i = 0; i< this.userCredentials.length;i++ ){
        if(this.username === this.userCredentials[i].username && this.pass === this.userCredentials[i].password){
          this.$store.commit('changeLoginUser', this.username);
          credentialMatch = true;
          this.$router.push('/chat')
        } 
      }
      if(credentialMatch == false) {
          alert('Wrong Credentials');
        }
    }
  }
}
</script>

<style lang="scss">
input,
button {
  display: block;
  margin: 10px auto;
}
</style>