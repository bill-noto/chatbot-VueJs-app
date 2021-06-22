<template>
  <div class="about">
    <h1>Welcome to SAE Chatbot! Logged in as: {{this.$store.state.loggedInAs}}</h1>
    <div>User Messages: {{this.$store.state.messageCounter}} / Total Messages {{this.$store.getters.totalMsgCounter}}</div>
    <div v-for="(message, index) in messages" v-bind:key="index">
      <p class="message" :class='{isBot: message.isBot}'>{{message.msgContent}}</p>
    </div>
    <input @keypress="checkEnter" id="inputMessage" v-model="newMessage" type="text" placeholder="Type messsage here">
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data(){
    return {
      newMessage: '',
      botMessages: {
        greetingMessages: ['Hello Human!', 'Nice to see a human here', 'Hi there!'],
        otherMessage: ['We will take over the world', 'Oh you scared me!', 'Welcome to the end!']
      },
      messages: []
    }
  },
  methods: {
    sendMessage(){
      this.messages.push({
          isBot: false,
          msgContent: this.newMessage
        })
        this.$store.commit('increaseCounter');
        if(this.newMessage.toUpperCase() === 'HELLO' || this.newMessage.toUpperCase() === 'HI' || this.newMessage.toUpperCase() === 'HEY'){
          this.messages.push({
          isBot: true,
          msgContent: this.botMessages.greetingMessages[Math.round(Math.random() * (this.botMessages.greetingMessages.length - 1))]
        })
        } else {
          this.messages.push({
          isBot: true,
          msgContent: this.botMessages.otherMessage[Math.round(Math.random() * (this.botMessages.otherMessage.length - 1))]
        })
        }
        this.newMessage = ''
    },
    checkEnter: function (event){
      if (event.key == 'Enter') {
        this.sendMessage()
      }
    }
  },
  mounted(){
    if(this.$store.state.isLoggedIn == false){
      this.$router.push('/');
    }
    document.getElementById('inputMessage').focus()
    this.$store.dispatch('popUpAd');
  }
}
</script>

<style lang="scss">
.message{
  padding: 10px 20px;
  margin: 10px;
  text-align: right;
  background-color: aqua;
}
.isBot {
  text-align: left;
  background-color: burlywood;
}
</style>