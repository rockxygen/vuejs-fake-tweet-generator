<template>
  <div id="app">
    <Sidebar :tweet="fake" @changeAvatar="setAvatar($event)" />
    <Tweet :tweet="fake" @getData="fetchData($event)" />
  </div>
</template>

<script>
import Sidebar from './components/Settings';
import Tweet from './components/Content';

export default {
  name: 'App',
  title: 'VueJS Fake Tweet Generator',
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
        }
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
    convertImgToBase64(url, callback, outputFormat){
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
      };
      img.src = url;
    },
    fetchData(username){
      fetch(`https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`)
      .then(res => res.json())
      .then(data => {
        const twitter = data[0];
        const vm = this;

        this.convertImgToBase64(twitter.profile_image_url_https, function(base64Image){
          vm.fake.avatar = base64Image;
        });

        this.fake = {
          name: twitter.name,
          username: twitter.screen_name,
          tweet: twitter.status.text,
          avatar: vm.fake.avatar,
          stats: {
            retweet: twitter.status.retweet_count,
            quotes: 0,
            likes: twitter.status.favorite_count
          }
        }

      })
      .catch(err => console.log(err));
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
