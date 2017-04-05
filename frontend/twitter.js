const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
$(() => {
  let buttons = $('button.follow-toggle');
  buttons.each((idx, el) => {
    new FollowToggle(el);
  });

  let usersSearch = $('nav.users-search');
  usersSearch.each((idx, el) => {
    new UsersSearch(el);
  });
  let tweetCompose = $('form.tweet-compose');
  tweetCompose.each( (idx, el) => {
    new TweetCompose(el);
  });
});
