/*
 * A simple, lightweight JavaScript-only lib for client-side formatting of tweet strings
 *
 * What this lib does:
 *   - wraps URLs in an <a> tag and removes the protocol from the user-visible link
 *   - wraps @ mentions an an <a> that links to the user's profile on twitter.com
 *   - wraps hashtags in a <span> tag
 *
 * Usage:
 *   TweetFormatter.formatTweet("Hey @darinwilson check this out http://bit.ly/2Aiqdv #js")
 *
 * Returns:
 *   Hey <a href="http://twitter.com/darinwilson" class="tf-mention">@darinwilson</a> check 
 *   this out <a href="http://bit.ly/2Aiqdv" class="tf-link">bit.ly/8wjds</a> 
 *   <span class="tf-hashtag">#js</span>
 *
 * As shown above, CSS classes are added for each of the added tags. By default, the classes
 * are prefixed with "tf", but you can supply your prefix as an optional parameter
 * to formatTweet:
 *
 *   TweetFormatter.formatTweet("Just a #hashtag", "myprefix")
 *     -> Just a <span class="myprefix-hashtag">#hashtag</span>
 * 
 * Version 1.0
 * (c) 2013 Darin Wilson
 * MIT License - http://opensource.org/licenses/MIT
 *
 * Thanks to Andrew Dupont for the regexes http://andrewdupont.net/2008/11/04/auto-format-tweets/
 */
var TweetFormatter = {  
  URLS_REGEX: /https?:\/\/(?:[-\w\.]+)+(?::\d+)?(?:\/(?:[\w\/_\.]*(?:\?\S+)?)?)?/g,
  USERNAMES_REGEX: /@[A-Za-z0-9_]*\b/g,
  HASHTAGS_REGEX: /#\w+/g,
  
  // main "public" function
  // params:
  //   - tweet : the full tweet text
  //   - cssPrefix : (optional) the prefix to use in the css classes of added tags
  //                 default: tf
  formatTweet: function(tweet, cssPrefix) {
    if (!cssPrefix) {
      cssPrefix = "tf";
    }
    tweet = this.formatLinks(tweet, cssPrefix);
    tweet = this.formatMentions(tweet, cssPrefix);
    tweet = this.formatHashtags(tweet, cssPrefix);
    return tweet;
  },
  
  // "private" functions

  processTokensFromRegex: function(tweet, regex, callback) {
    var tokens = tweet.match(regex);
    if (!tokens) {
      return;
    }
    for (var i = 0; i < tokens.length; i++) {
      callback(tokens[i])
    }
  },
  
  formatLinks: function(tweet, cssPrefix) {
    cssClass = cssPrefix + "-link";
    this.processTokensFromRegex(tweet, this.URLS_REGEX, function(token) {
      var shortUrl = token.replace(/https?:\/\//, '');
      tweet = tweet.replace(token, '<a href="' + token + '" class="' + cssClass + '">' + 
        shortUrl + "</a>");
    });
    return tweet;
  },
  
  formatMentions: function(tweet, cssPrefix) {
    cssClass = cssPrefix + "-mention";
    this.processTokensFromRegex(tweet, this.USERNAMES_REGEX, function(token) {
      tweet = tweet.replace(token, 
        '<a href="http://twitter.com/' + token.substr(1) + '" class="' + cssClass + '">' + 
          token + "</a>");
    });
    return tweet;
  },
  
  formatHashtags: function(tweet, cssPrefix) {
    cssClass = cssPrefix + "-hashtag";
    this.processTokensFromRegex(tweet, this.HASHTAGS_REGEX, function(token) {
      tweet = tweet.replace(token, '<span class="' + cssClass + '">' + token + '</span>');
    });
    return tweet;
  }
  
};