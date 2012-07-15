#jQuery.Fiddler.js
##Description
A small but beautiful jQuery plugin, written to display all your saved fiddles on jsFiddle.net.

What [jsFiddle.net] is, I have to explain probably not great. However, in a nutshell for those who do not know: jsFiddle is a nice online service that allow users to store, process and test javascript directly in their browser.

Those of you who have already worked with jsFiddle.net be able to follow me when I say, that it is a horror to 'need' to click through an endless list of pages. For example, if there is a script written in the past and you have to recover a valid approach.

Thus arose jqFiddler, a plugin using [jQuery] written to display stored code fragments of a jsFiddle user. Each user!

The data is loaded, through the [API] via jsFiddle's JSON document provided, into a searchable list. Optionally, this list can be divided into several pages.

###German is your native language?
Then you will be interested in the German [article] intended for this plugin from [Netzfakten.de]!

##Features
- It's really easy to setup (Whether markup or initialization, both is foolproof)
- No need to login (You must specify at least a username)
- No need to configure much (It works well "out of the box", if you like to see **my** fiddles!)
- Lots of settings (You have over 15 different adjustment possibilities)
- And... lots more!

***

##How to use
###Integrating jQuery and the plugin
    <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
    <script type="text/javascript" src="js/jQuery.fiddler.js"></script>

###Setting up the HTML markup
    <div id="jsFiddler"></div>
    <input class="jsfiddler-search" type="text" value="Search your fiddles..." autocomplete="off">

###Initialization of the plugin
    $(".jsFiddler").jsFiddler(); // If you define no user name, my fiddles are indicated

***

##Options
To customize the data output are some configuration options available. In the following this will be explained a little.
To change the properties settings of the plugin must be loaded only with the necessary options:
###Display options
- `name` The name of a jsFiddle-User
- `start` The position from which the JSON document is read (default: 0)
- `limit` Limits the objects to be displayed on a certain number (default: 10)
- `sort` Sorting filter (default: "date")
- `order` Change the sort order (default: "ASC")

###List Options
- `description` Return the description (default: "true")
- `author` den Return the author (default: "false")
- `url` Return the URL (default: "true")
- `created` Return the creation date (default: "true")
- `framework` Return the used framework (default: "false")
- `version` Return the version (default: "false")
- `latest_version` Return the latest version (default: "false")
- `title` Return the title (default: "true")

###Search Options
- `search` Selects the search input field for the search form (default: ".jsfiddler-search")

###Paging Options
- `paging` Activate paging (Standardwert: "false")
- `items` Number of entries per page (Standardwert: 10)
- `controls` Selector for the paging navigation (Standardwert: ".jsfiddler-controls")

***

##Demo
To get an idea of ??how the plugin works and what it does, here's a simple [demo]. This shows all fiddles from '[ARTsinn]', the corporate profile of my design company.

***

##Limitations
The plugin is currently still in beta, but it was already published in order to carry out first resonances.

- The "Paging" -function know in connection with the search still fatal errors. It will be on every single page only displays the fiddles the also have been entered in the search screen. Therefore, I recommend not to use this feature yet.

- There is currently no reloading of data possible. There must be an entire page to reload in order to bring the view up to date.

- Problems with caching the JSON data stream in the "mobile-web-app-capable" view. Say, if you look the page with an iPhone as a bookmark on the home screen. Start the WebApp, switches back to the home screen and then return back to the WebApp. The entire page and therefore the complete JSON-Data has to be recharged. For the user, the huge waiting time.

I'll try the restrictions as promptly as possible to fix. If you have tips on how you can improve the plugin, let me know!

***

##License
Copyright (c) 2012 Yannick Albert
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

***

##Changelog
v0.1 The plugin has been released

[article]: http://netzfakten.de/codeschnipsel-von-jsfiddle-net-anzeigen-lassen
[netzfakten.de]: http://netzfakten.de/
[demo]: http://jsfiddle.net/ARTsinn/CVUvD/show/
[artsinn]: http://artsinn.de/
[jsFiddle.net]: http://jsfiddle.net/
[api]: http://doc.jsfiddle.net/api/fiddles.html
[jQuery]: http://jquery.com/