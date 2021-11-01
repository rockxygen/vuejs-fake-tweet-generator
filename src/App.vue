<template>
  <div id="app">
    <Sidebar :tweet="fake" @changeAvatar="setAvatar($event)" @canvasChange="setCanvas($event)" />
    <Tweet :tweet="fake" />
  </div>
</template>

<script>
import Sidebar from './components/Settings';
import Tweet from './components/Content';

export default {
  name: 'App',
  data(){
    return {
      fake: {
        name: '',
        username: '',
        isVerifeid: false,
        tweet: '',
        avatar: '',
        stats: {
          retweet: 0,
          quotes: 0,
          likes: 0
        },
        tweetOutImage: ''
      }
    }
  },
  components: {
    Sidebar,
    Tweet
  },
  methods: {
    setAvatar(e){
      this.fake.avatar = e;
    },
    setCanvas(e){
      this.fake.tweetOutImage = e;
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  border: 0;
  outline: none;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

html, body {
  height: 100%;
  background: #000;
}

#app {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
