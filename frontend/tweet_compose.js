const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.submitButton = this.$el.find('input[type=submit]');
    this.feed = this.$el.data('tweets-ul');
    // this.userId = this.submitButton.data('user-id');
    // this.body = this.$el.find('textarea');
    this.submit();
  }

  clearInput() {
    this.$el.find('textarea').val('');
    this.$el.find('select').val('').removeAttr('selected');
  }

  handleSuccess(tweetData) {
    this.clearInput();
    console.log(this.feed);
    // let tweetData = JSON.stringify(data);
    let tweetString = `${tweetData.content} -- ${tweetData.user.username} -- ${tweetData.created_at}`;
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
}

module.exports = TweetCompose;
