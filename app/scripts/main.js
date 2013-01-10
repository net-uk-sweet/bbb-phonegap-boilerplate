require([

  // libs
  'jquery',
  'backbone',
  'domReady',

  // Application.
  'app',

  // Main Router.
  'router'
],

function($, Backbone, domReady, app, Router) {

  'use strict';

  domReady(function() {

    console.log('Main.domReady: ');

    function start(isDevice) {

      console.log('Main.start: running on a device: ' + isDevice);

      // Create a router on the application
      app.router = new Router();

      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to '/' by default.  Change in app.js.
      // NB. Phonegap doesn't seem to work with pushState
      Backbone.history.start( { pushState: false, root: app.root });
    }

    function onDeviceReady() {
      start(true);
    }

    if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
      // This is running on a device so waiting for deviceready event
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      // On desktop don't have to wait for anything
      start(false);
    }
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on('click', 'a:not([data-bypass])', function(evt) {
    // Get the absolute anchor href.
    var href = $(this).attr('href');

    // If the href exists and is a hash route, run it through Backbone.
    if (href && href.indexOf('#') === 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href, true);
    }
  });

});
