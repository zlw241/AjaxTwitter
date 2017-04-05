/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {



const APIUtil = {
  followUser: (id) => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },

  unfollowUser: (id) => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'JSON',
      data: queryVal.serialize(),
      success
    });
  },

  createTweet: (data) => {
    return $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'JSON',
      data: data
    });
  }

};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map