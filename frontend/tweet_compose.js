const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.submitButton = this.$el.find('input[type=submit]');
    this.feed = this.$el.data('tweets-ul');
    this.charsLeft = $(this.$el.find('.chars-left')[0]);
    this.body = this.$el.find('textarea');
    this.submit();
    this.charsCount();
  }

  clearInput() {
    this.$el.find('textarea').val('');
    this.$el.find('select').val('').removeAttr('selected');
  }

  handleSuccess(tweetData) {
    this.clearInput();
    // let tweetData = JSON.stringify(data);
    let tweetString = `${tweetData.content} -- <a href="/users/${tweetData.user_id}">${tweetData.user.username}</a> -- ${tweetData.created_at}`;
    $(this.feed).prepend($(`<li>${tweetString}</li>`));
  }

  submit() {
    this.submitButton.on('click', (e) => {
      e.preventDefault();
      let tweetData = this.$el.serializeJSON();
      APIUtil.createTweet(tweetData).then((data) => {
        this.handleSuccess(data);
      });
    });
  }

  charsCount() {
    this.body.on('input', (e) => {
      let tweetBody = $(this.body[0]);
      if (tweetBody[0].value.length >= 140) {
        tweetBody[0].value = tweetBody[0].value.substring(0, 140);
      }
      this.charsLeft.text(140-this.body[0].value.length);// = 140 - this.body[0].value.length;
    });
  }
}

module.exports = TweetCompose;
