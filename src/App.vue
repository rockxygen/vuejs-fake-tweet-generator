<template>
  <div id="app">
    <Sidebar />
    <Tweet />
  </div>
</template>

<script>
import Sidebar from './components/Settings';
import Tweet from './components/Content';

export default {
  name: 'App',
  data(){
    return {
      name: '',
      username: '',
      isVerifeid: false,
      tweet: '',
      avatar: '',
      info: {
        retweet: 0,
        quotes: 0,
        likes: 10
      }
    }
  },
  components: {
    Sidebar,
    Tweet
  }
}
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
