
class TweetCompose {

  constructor (el) {
    this.$el = $(el);
    this.submit = this.$el.find('input[type=submit]');
    this.userId = this.submit.data('user-id');
    this.body = this.$el.find('textarea');
    this.handleSubmit();
  }

  handleSubmit() {
    this.submit.on('click', (e) => {
      e.preventDefault();
      console.log(this.userId);
    });
  }
}

module.exports = TweetCompose;
