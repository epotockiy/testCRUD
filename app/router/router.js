(function() {

    var App = Pilot.extend({
        rootUri: 'http://jsonplaceholder.typicode.com',
        jsCrud: function(url, method, params) {
            return $.ajax({
                url: url,
                data: $.extend({ method: method }, params)
            });
        }
    });


    App.location = Pilot.View.extend({
        events: {
            'click .js-back': 'onBack',
            'click .js-forward': 'onForward'
        },
        loadData: function() {
            this.$('.js-spinner').show();
        },
        onRoute: function(evt, req) {
            var router = this.router;
            this.$('.js-spinner').hide();
            this.$('.js-address').html(req.path);
            this.$('.js-back').toggleClass('app__location__nav_active', router.hasBack());
            this.$('.js-forward').toggleClass('app__location__nav_active', router.hasForward());
        },
        onBack: function() {
            this.router.back();
        },
        onForward: function() {
            this.router.forward();
        }
    });
    App.index = Pilot.View.extend({
        tag: '#app-view div.app__index',
        templateFile: '../../templates/post.tmpl.html',
        template: function(obj) {
            //return ['<a href="' + router.getUrl('gallery', { tag: 'cubism' }) + '">cubism</a>', '<a href="' + router.getUrl('gallery', { tag: 'impressionism' }) + '">impressionism</a>', '<a href="' + router.getUrl('gallery', { tag: 'neoclassicism' }) + '">neoclassicism</a>'].join('<br/>');
            // console.log(this.getData());
            // console.log(this.router.getUrl('posts'))
            return this.getData();
        },
        loadDataOnce: function(req) {
            return this.router.jsCrud(this.templateFile, 'GET', {})
                .done(this.bound(function(data) {
                    this.setData(data);
                }));
        },
        init: function() {
            console.log(this.getLoadedData())

            this.render();
            // App.nav('/')
        }
    });

    App.post = Pilot.View.extend({
        tag: '#app-view div.app__index',
        template: function(){
            // console.log('lol')
        },

        loadDataOnce: function(req){
            // console.log('lol')
        },

        onRoute: function(){
            // console.log('lol')
            this.render();
            // App.nav('/posts/:id')

        }
    });





    App.gallery = Pilot.View.extend({
        tag: '#app-view div.app__gallery',
        grid: { 6: 150, 12: 110, 20: 85 },

        template: function(photoset) {
            var params = this.request.params;
            var tag = params.tag;
            var router = this.router;
            var width = this.grid[params.perPage || 12];

            var html = $.map(photoset, function(photo) {
                var url = router.getUrl('artwork', { id: photo.id });
                return '<a href="' + url + '"><img class="app__img" width="' + width + '" src="' + photo.url_q + '" /></a>';
            }).join('');

            html += '<div class="app__perPage">per page:' +
                '  <a href="' + router.getUrl('gallery', { perPage: 6, tag: tag }) +
                '">6</a>' + ', <a href="' + router.getUrl('gallery', { perPage: 12, tag: tag }) +
                '">12</a>' + ', <a href="' + router.getUrl('gallery', { perPage: 20, tag: tag }) +
                '">20</a>' + '</div>' + '<div class="app__paginator">paginator:' +
                '  <a href="' + router.getUrl('gallery', params, { page: 1 }) + '">1</a>' +
                ', <a href="' + router.getUrl('gallery', params, { page: 2 }) + '">2</a>' +
                ', <a href="' + router.getUrl('gallery', params, { page: 3 }) + '">3</a>' +
                '</div>';
            return html;
        },

        loadData: function(req) {
            var key = req.path;
            if (this._cacheKey != key) {
                this._cacheKey = key;

                return this.router.jsCrud('', 'flickr.photos.search', {
                    page: req.params.page || 1,
                    per_page: req.params.perPage || 12,
                    extras: 'url_q',
                    tags: req.params.tag
                }).done(this.bound(function(data) {
                    // Set photolist
                    this.setData(data.photos.photo);
                }));
            }
        },

        onRoute: function() {
            this.render();
        }
    });

    App.gallery.artwork = Pilot.View.extend({
        tag: '#app-view div.app__photo',
        patternSrc: 'http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_b.jpg',

        template: function(photo) {
            var src = this.getSrc(photo);
            return '<img src="' + src + '" width="100%"/>';
        },

        loadData: function(req) {
            var df = $.Deferred();
            this.router
                .jsCrud('', 'flickr.photos.getInfo', { photo_id: req.params.id })
                .done(this.bound(function(res) {
                    this.setData(res.photo);
                    $(new Image)
                        .attr('src', this.getSrc(res.photo))
                        .load(df.resolve);
                }));
            return df;
        },

        getSrc: function(photo) {
            return this.patternSrc.replace(/\{([^}]+)\}/g, function(_, key) {
                return photo[key];
            });
        },

        onRoute: function() {
            this.render();
        }
    });

    var Ace = new App()//{ el: '#app-view' }
        /*.on('404', function(req){
            console.log('Route not found!');
        })
        .route('#/lol', function(evt,req){
            console.log('lol');
        })
        .route('*', App.location)
        .route('index', '/', App.index)
        .route('posts', '/posts/:id', App.post)
        .route('gallery', '/gallery/:tag/:perPage?(/page/:page)?', App.gallery)
        .route('artwork', '/artwork/:id', App.gallery.artwork)*/

        // .nav('/')
        // .nav('/')
        // .nav('/')
        // .nav('/')
        .createGroup('/')
            .route('.', function(evt, req){
                // Ace.nav('/')
                console.log('def');
            })
            .closeGroup()
        
     Ace.start();
    /*Ace.nav('/');
    Ace.nav('/posts/:id');
    Ace.nav('/comments/:id');*/
        

})();
