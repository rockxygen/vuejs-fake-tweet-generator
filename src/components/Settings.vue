<template>
    <div class="tweet-settings">
      <h3>Tweet Ayarları</h3>
      <ul>
        <li>
          <label>Ad Soyad</label>
          <input type="text" class="input" v-model="tweet.name">
        </li>
        <li>
          <label>Kullanıcı Adı</label>
          <input type="text" class="input" v-model="tweet.username">
        </li>
        <li>
          <label>Avatar</label>
          <input type="file" class="input" @change="avatarHandle($event)">
        </li>
        <li>
          <label>Doğrulanmış Hesap</label>
          <div>
            <label class="checkbox-input">
              <input type="checkbox" v-model="tweet.isVerifeid">
              <span class="checkbox"></span>
            </label>
          </div>
        </li>
        <li>
          <label>Tweet</label>
          <textarea cols="30" rows="5" class="input" v-model="tweet.tweet" maxlength="290"></textarea>
        </li>
        <li>
          <label>Retweet</label>
          <input type="number" class="input" value="0" v-model="tweet.stats.retweet">
        </li>
        <li>
          <label>Alıntı Tweetler</label>
          <input type="number" class="input" value="0" v-model="tweet.stats.quotes">
        </li>
        <li>
          <label>Beğeniler</label>
          <input type="number" class="input" value="0" v-model="tweet.stats.likes">
        </li>
        <li>
          <button @click="createTweet">Tweet Yarat</button>
          <a style="display: none;" ref="downloadLink" :href="tweet.tweetOutImage" download="tweet.png">Tweet Download</a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    tweet: [Object]
  },
  methods: {
    avatarHandle(e){
      const vm = this;
      const reader = new FileReader();
      reader.addEventListener('load', function() {
        vm.$emit('changeAvatar', this.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    },
    async createTweet(){
      const image = document.querySelector('.tweet');
      const options = {
        type: 'dataURL'
      }
      const tweetImage = await this.$html2canvas(image, options);
      // this.$emit('canvasChange', tweetImage);

      this.$refs.downloadLink.href = tweetImage;

      if(tweetImage){
        this.$refs.downloadLink.click();
      }
    }
  }
}
</script>

<style scoped>
.tweet-settings {
  width: 350px;
  color: #fff;
  border-right: 1px solid #2f3336;
  height: 100%;
  padding: 25px;
  overflow: auto;
}

ul li:not(:last-child) {
  margin-bottom: 20px;
}

button {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  background: #1da1f2;
  cursor: pointer;
}

.input {
  width: 100%;
  background: transparent;
  border-bottom: 1px solid #2f3336;
  font-size: 15px;
  color: #fff;
  padding: 10px 0 15px;
  resize: none;
}

.input::placeholder {
  color: #fff;
}

.input:focus {
  border-color: #586066;;
}

.checkbox-input .checkbox {
  width: 66px;
  display: block;
  height: 37px;
  border: 2px solid #D8DBE6;
  border-radius: 37px;
  position: relative;
  cursor: pointer;
  margin-top: 20px;
}

.checkbox-input .checkbox::before {
  content: '';
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #9298AD;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: 300ms left, 300ms background-color;
}

.checkbox-input input {
  display: none;
}

.checkbox-input input:checked + .checkbox::before {
  left: 33px;
  background: #1da1f2;
}

h3 {
  font-size: 20px;
  font-weight: normal;
  border-bottom: 1px solid #2f3336;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
</style>