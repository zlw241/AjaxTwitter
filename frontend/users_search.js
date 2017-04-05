const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.submit = this.$el.find('button');
    this.input = this.$el.find('input');
    this.ul = this.$el.find('ul');
    this.handleInput();
  }

  renderResults() {
    this.ul.children().remove();
    this.users.forEach((user) => {
      let $user = $(
        `<li>
          <a href='/users/${user.id}'>${user.username}</a>
          <button data-user-id="${user.id}" data-initial-follow-state="${user.followed}" class='follow-toggle'></button>
        </li>`
      );
      new FollowToggle($user.find('button.follow-toggle'));
      this.ul.append($user);
    });
  }

  handleInput() {
    this.input.on('input', (e) => {
      e.preventDefault();
      let queryVal = $(this.input[0]);
      APIUtil.searchUsers(queryVal).then((users) => {
        this.users = users;
        this.renderResults();
      });
    });
  }
}

module.exports = UsersSearch;
