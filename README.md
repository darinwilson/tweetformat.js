#tweetformat.js

A simple, lightweight JavaScript-only lib for client-side formatting of tweet strings.

What this lib does:

* wraps URLs in an `<a>` tag and removes the protocol from the user-visible link
* wraps @ mentions an an `<a>` that links to the user's profile on twitter.com
* wraps hashtags in a `<span>` tag

#Usage

    TweetFormatter.formatTweet("Hey @darinwilson check this out http://bit.ly/2Aiqdv #js")

    -> Hey <a href="http://twitter.com/darinwilson" class="tf-mention">@darinwilson</a> check 
    this out <a href="http://bit.ly/2Aiqdv" class="tf-link">bit.ly/2Aiqdv</a> 
    <span class="tf-hashtag">#js</span>
    
#Customizing    

As shown above, CSS classes are included in each of the added tags. By default, the classes are prefixed with "tf", but you can supply your own prefix as an optional parameter to formatTweet:

    TweetFormatter.formatTweet("Just a #hashtag", "myprefix")
    
    -> Just a <span class="myprefix-hashtag">#hashtag</span>

#License

Version 1.0 &copy; 2013 Darin Wilson

[MIT License](http://opensource.org/licenses/MIT)

#Credits

Thanks to [Andrew Dupont](http://andrewdupont.net/2008/11/04/auto-format-tweets/) for the regexes

