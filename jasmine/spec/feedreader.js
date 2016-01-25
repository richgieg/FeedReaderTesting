/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This tests to makes sure that each feed object has a URL defined
         * and that it's not empty.
         */
        it('have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This tests to makes sure that each feed object has a name defined
         * and that it's not empty.
         */
        it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* This test suite tests various funcionality involving the menu. */
    describe('The menu', function() {
        var body = $('body');

        /* This tests that the menu is hidden by default. The menu is hidden
         * when the body element has the class "menu-hidden" set.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* This tests that the menu appears when the menu icon is clicked for
         * the first time, but disappears when the menu icon is clicked the
         * second time.
         */
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');

            /* Check that menu appears when menu icon is clicked */
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);

            /* Check that menu hides when menu icon is clicked again */
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This test suite tests that entries appear when the app first loads. */
    describe('Initial entries', function() {

        /* Run loadFeed, passing in a callback that executes the "done" method,
         * which signals to Jasmine that it can procede to run the spec.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* This test ensures that there is at least a single .entry element
         * within the .feed container after loadFeed executes.
         */
        it('appear when the app loads', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* This test suite tests that the content actually changes when a new
     * feed is loaded.
     */
    describe('New feed selection', function() {
        var initialHTML;

        /* Run loadFeed, passing in a callback that saves the HTML of the first
         * list entry, then runs loadFeed again (targeting a different feed),
         * passing it a callback that calls the "done" method, which signals to
         * Jasmine that it can procede to run the spec.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialHTML = $('.feed .entry')[0].innerHTML;
                loadFeed(1, function() {
                    done();
                })
            });
        });

        /* This test ensures that the HTML of the first list entry after the
         * second call to loadFeed is different than the HTML of the first list
         * entry after the first call to loadFeed, since each call to loadFeed
         * targeted a different RSS feed.
         */
        it('changes the content', function() {
            expect($('.feed .entry')[0].innerHTML).not.toBe(initialHTML);
        });
    });

}());
