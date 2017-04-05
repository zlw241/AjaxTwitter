const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.submitButton = this.$el.find('input[type=submit]');
    // this.userId = this.submitButton.data('user-id');
    // this.body = this.$el.find('textarea');
    this.submit();
  }

  submit() {
    this.submitButton.on('click', (e) => {
      e.preventDefault();
      let tweetData = this.$el.serializeJSON();
      APIUtil.createTweet(tweetData).then((data) => {
        console.log('hello');
        console.log(data);
      });
    });
  }
}

module.exports = TweetCompose;
