const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.getFollowState();
    this.render();
    this.handleClick();
  }

  getFollowState() {
    if (this.$el.data('initial-follow-state') === true) {
      return "followed";
    } else {
      return "unfollowed";
    }
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");

    } else if (this.followState === "Following") {
      this.$el.text("Following");
    } else if (this.followState === "Unfollowing") {
      this.$el.text("Unfollowing");
    } else {
      this.$el.text("Unfollow!");
    }
  }

  fetchSuccess(followState) {
    this.$el.data('initial-follow-state', followState);
    this.followState = this.getFollowState();
    this.$el.prop('disabled', false);
    this.render();
  }

  disableButton (buttonText) {
    this.followState = buttonText;
    this.$el.prop('disabled', true);
    this.render();
  }

  handleClick() {
    this.$el.on('click', (e) => {
      e.preventDefault();
      if (this.followState === "unfollowed") {
        APIUtil.followUser(this.userId).then((message) => {
          this.fetchSuccess(true);

        });
        this.disableButton("Following");
      } else {
        APIUtil.unfollowUser(this.userId).then((message) => {
          this.fetchSuccess(false);
        });
        this.disableButton("Unfollowing");
      }
    });
  }

}

module.exports = FollowToggle;
