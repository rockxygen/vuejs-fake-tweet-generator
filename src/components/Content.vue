<template>
    <div class="fake-tweet">
      <div class="search-console">
        <input type="text" v-model="tweet.username" placeholder="Twitter Kullanıcı Adı">
        <button @click="getUserData(tweet.username)">Son Tweet'i Çek</button>
      </div>
      <div class="tweet-container">
        <div class="tweet" ref="getImage">
          <div class="author">
            <img :src="tweet.avatar || 'https://img2.pngindir.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg'" alt="">
            <div>
              <div class="name">
                <span>{{ tweet.name || 'Ad Soyad' }}</span>
                <img src="../assets/verified.svg" alt="" v-if="tweet.isVerifeid">
              </div>
              <div class="username">@{{ tweet.username || 'Kullanıcı Adı' }}</div>
            </div>
          </div>
          <div class="content">
            <p v-html="$options.filters.tweetFormat(tweet.tweet || 'Tweet')"></p>
            <img v-if="tweet.image" :src="tweet.image" width="auto" alt="">
          </div>
          <div class="stats">
            <span>
              <b>{{ tweet.stats.retweet | numberFormat }}</b> Retweet
            </span>
            <span>
              <b>{{ tweet.stats.quotes | numberFormat }}</b> Alıntı tweetler
            </span>
            <span>
              <b>{{ tweet.stats.likes | numberFormat }}</b> Beğeni
            </span>
          </div>
          <div class="actions">
            <span>
              <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#6e767d"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
            </span>
            <span>
              <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#6e787d"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
            </span>
            <span>
              <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#6e767d"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
            </span>
            <span>
              <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#6e767d"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    tweet: [Object]
  },
  methods: {
    getUserData(e){
      if(e) {
        this.$emit('getData', e);
        return;
      }
      alert('Twitter kullanıcı adını yazınız!');
    }
  },
  filters: {
    numberFormat(number) {
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + ' T';
      }
      if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
      }
      if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + ' B';
      }
      return number;
    },
    tweetFormat(tweet){
      tweet = tweet.replace(/@([\w]+)/g, '<span style="color: rgb(29, 161, 242)">@$1</span>')
      .replace(/#([\wşçöğüıİ]+)/gi, '<span style="color: rgb(29, 161, 242)">#$1</span>')
      .replace(/(https?:\/\/[\w\\.\\/]+)/gi, '<span style="color: rgb(29, 161, 242)">$1</span>')
      .replace(/\n/g, '<br />');
      return tweet;
    }
  }
}
</script>

<style scoped>
.fake-tweet {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: auto;
}

.search-console {
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 40px;
}

.search-console input {
  flex: 1;
  background: #2f3336;
  height: 40px;
  line-height: 40px;
  border-radius: 3px 0 0 3px;
  color: #fff;
  padding: 0 15px;
  font-size: 15px;
}

.search-console button {
  height: 40px;
  padding: 0 20px;
  font-size: 15px;
  background: #1da1f2;
  color: #fff;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
}

.tweet-container {
  display: flex;
  align-items: center;
  flex: 1;
}

.tweet {
  border: 1px solid #2f3336;
  width: 600px;
  padding: 0 16px;
  margin: 0 auto;
  background: #000;
}

.author {
  height: 48px;
  margin-top: 17px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 15px;
}

.author img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
}

.author .name {
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.author .name img {
  width: 19px;
  height: 19px;
  margin-left: 3px;
}

.author .username {
  color: #6e767d;
}

.content {
  padding: 12px 0;
  position: relative;
}

.content img {
  margin-top: 10px;
  max-width: 100%;
  /* max-height: 100%; */
  border-radius: 5px;
}

.content p {
  font-size: 23px;
  line-height: 28px;
  color: #fff;
  word-wrap: break-word;
}

.content p>span {
  color: #1da1f2 !important;
}

.stats {
  height: 53px;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #6e767d;
  border-top: 1px solid #2f3336;
}

.stats span b {
  color: #fff;
  text-transform: uppercase;
}

.stats span:not(:last-child) {
  margin-right: 20px;
}

.actions {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #2f3336;
  color: #fff;
}
</style>