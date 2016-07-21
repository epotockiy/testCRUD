/*(function() {
    $Router = {
        root: '#/',
        routes: [],
        urls: [],
        titles: [],
        add: function(_path, _url, _title) {
            this.routes.push(_path);
            this.urls.push(_url);
            this.titles.push(_title);
        },
        navigate: function() {
            $routes = this.routes;
            $urls = this.urls;
            $root = this.root;

            function loading() {
                $a = $.inArray(location.hash, $routes);
                $template = $urls[0];
                if ($a === -1) {
                    location.hash = $root;
                    $('#view').load($urls[0]);
                } else {
                    $('#view').load($template);
                    if ($a === 0) {
                        window.scrollTo(0, 0);
                    } else {
                        window.scrollTo(0, 90);
                    }
                }
            }
            window.onload = loading;
            window.onhashchange = loading;
        }
    };

    $Router.add("#/", "../index.html", "HOME");
    $Router.add("#/msgs", "../messages.html", "MSGs");

    $Router.navigate();
})();*/

//var Routie=function(a,b){var c=[],d={},e="routie",f=a[e],g=function(a,b){this.name=b,this.path=a,this.keys=[],this.fns=[],this.params={},this.regex=h(this.path,this.keys,!1,!1)};g.prototype.addHandler=function(a){this.fns.push(a)},g.prototype.removeHandler=function(a){for(var b=0,c=this.fns.length;c>b;b++){var d=this.fns[b];if(a==d)return void this.fns.splice(b,1)}},g.prototype.run=function(a){for(var b=0,c=this.fns.length;c>b;b++)this.fns[b].apply(this,a)},g.prototype.match=function(a,b){var c=this.regex.exec(a);if(!c)return!1;for(var d=1,e=c.length;e>d;++d){var f=this.keys[d-1],g="string"==typeof c[d]?decodeURIComponent(c[d]):c[d];f&&(this.params[f.name]=g),b.push(g)}return!0},g.prototype.toURL=function(a){var b=this.path;for(var c in a)b=b.replace("/:"+c,"/"+a[c]);if(b=b.replace(/\/:.*\?/g,"/").replace(/\?/g,""),-1!=b.indexOf(":"))throw new Error("missing parameters for url: "+b);return b};var h=function(a,b,c,d){return a instanceof RegExp?a:(a instanceof Array&&(a="("+a.join("|")+")"),a=a.concat(d?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(a,c,d,e,f,g){return b.push({name:e,optional:!!g}),c=c||"",""+(g?"":c)+"(?:"+(g?c:"")+(d||"")+(f||d&&"([^/.]+?)"||"([^/]+?)")+")"+(g||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+a+"$",c?"":"i"))},i=function(a,b){var e=a.split(" "),f=2==e.length?e[0]:null;a=2==e.length?e[1]:e[0],d[a]||(d[a]=new g(a,f),c.push(d[a])),d[a].addHandler(b)},j=function(a,b){if("function"==typeof b)i(a,b),j.reload();else if("object"==typeof a){for(var c in a)i(c,a[c]);j.reload()}else"undefined"==typeof b&&j.navigate(a)};j.lookup=function(a,b){for(var d=0,e=c.length;e>d;d++){var f=c[d];if(f.name==a)return f.toURL(b)}},j.remove=function(a,b){var c=d[a];c&&c.removeHandler(b)},j.removeAll=function(){d={},c=[]},j.navigate=function(a,b){b=b||{};var c=b.silent||!1;c&&o(),setTimeout(function(){window.location.hash=a,c&&setTimeout(function(){n()},1)},1)},j.noConflict=function(){return a[e]=f,j};var k=function(){return window.location.hash.substring(1)},l=function(a,b){var c=[];return b.match(a,c)?(b.run(c),!0):!1},m=j.reload=function(){for(var a=k(),b=0,d=c.length;d>b;b++){var e=c[b];if(l(a,e))return}},n=function(){a.addEventListener?a.addEventListener("hashchange",m,!1):a.attachEvent("onhashchange",m)},o=function(){a.removeEventListener?a.removeEventListener("hashchange",m):a.detachEvent("onhashchange",m)};return n(),b?j:void(a[e]=j)};"undefined"==typeof module?Routie(window):module.exports=Routie(window,!0);

/*
var Route = 
{
    map: function(path)
    {
        if (Route._routes.defined.hasOwnProperty(path)) {
            return Route._routes.defined[path];
        } else {
            return new Route._core.route(path);
        }
    },
    
    listen: function()
    {
        if (location.hash !== '') {
            Route._dispatch();
        }

        if ('onhashchange' in window) {
            window.onhashchange = Route._dispatch;
        } else {
            setInterval(Route._dispatch, 50);
        }
    },
    
    resetAction: function(fn)
    {
        Route._routes.resetAction = fn;
    },
    
    
    _match: function(path, parameterize) 
    {
        var params = {}, _possibleRoutes, slice, slicePaths, i, j, compare;

        for (var route in Route._routes.defined) {

            if (route === null || route === undefined) continue;

            route = Route._routes.defined[route];
            _possibleRoutes = route._partition();
            
            for (j = 0; j < _possibleRoutes.length; j++) {
                
                slice   = _possibleRoutes[j];
                compare = path;
                
                if (slice.search(/\*|:/) > 0) {
                    
                    slicePaths = slice.split('/');
                    for (i = 0; i < slicePaths.length; i++) {
                        
                        if ((i < compare.split('/').length) && (slicePaths[i][0] === ':')) {
                            params[slicePaths[i].replace(/:/, '')] = compare.split('/')[i];
                            compare = compare.replace(compare.split('/')[i], slicePaths[i]);
                        }
                        
                        if ((i + 1) == slicePaths.length && slicePaths[i] === '*' && compare.split('/').length >= i) {
                            var compPaths = compare.split('/').slice(i);
                            var n = 0;
                            while (true) {
                                if (compPaths[n] === undefined) break;
                                params[compPaths[n]] = compPaths[n+1];
                                n = n + 2;
                            }
                            compare = compare.split('/').slice(0, i).join('/') + '/*';
                        }
                    }
                }
                
                if (slice === compare) {
                    if (parameterize) {
                        route._params = params;
                    }
                    return route;
                }
            }
        }

        return null;
    },
    
    _dispatch: function() 
    {
        if (Route._routes.current !== location.hash) {
            
            Route._routes.previous = Route._routes.current;
            Route._routes.current  = location.hash;
            var _matchedRoute     = Route._match(location.hash, true);

            if (Route._routes.previous) {
                var _previousRoute = Route._match(Route._routes.previous);
                if (_previousRoute !== null && _previousRoute._afterAction !== null) {
                    _previousRoute._afterAction();
                }
            }

            if (_matchedRoute !== null) {
                _matchedRoute._run();
            } else {
                if (Route._routes.resetAction !== null) {
                    Route._routes.resetAction();
                }
            }
        }
    },
    
    _core: 
    {
        route: function(path) 
        {
            this._path    = path;
            this._action  = [];
            this._params  = {};
            
            this._getParam = function(name, defaultValue) {
                return typeof(this._params[name]) !== 'undefined' ? this._params[name] : defaultValue;
            };
            
            this._getAllParams = function() {
                return this._params;
            };
            
            this._beforeAction = [];
            this._afterAction  = null;
            Route._routes.defined[path] = this;
        }
    },
    
    _routes: {
        'current': null,
        'previous': null,
        'resetAction': null,
        'defined': {}
    }
};


Route._core.route.prototype = 
{
    to: function(fn) 
    {
        this._action.push(fn);
        return this;
    },
    
    before: function(fns)
    {
        if (fns instanceof Array) {
            this._beforeAction = this._beforeAction.concat(fns);
        } else {
            this._beforeAction.push(fns);
        }
        return this;
    },
    
    after: function(fn)
    {
        this._afterAction = fn;
        return this;
    },
    
    
    _partition: function()
    {
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this._path)) {
            parts.push(text[1]);
        }
        options.push(this._path.split('(')[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    
    _run: function() 
    {
        var _haltExecution = false, i, result, previous,
            _currRoute = Route._routes.defined[this._path];
        
        if (_currRoute.hasOwnProperty('_beforeAction')) {
            if (_currRoute._beforeAction.length > 0) {
                for (i = 0; i < _currRoute._beforeAction.length; i++) {
                    result = _currRoute._beforeAction[i]();
                    if (result === false) {
                        _haltExecution = true;
                        break;
                    }
                }
            }
        }
        
        if (!_haltExecution) {
            for (var n in _currRoute._action) {
                _currRoute._action[n].apply(_currRoute);
            }
        }
    }
};*/



    Path.map('#/').to(function() {
        $.get('templates/home.html', function(data) {
            $("#view").empty();
            $('#view').append(data);
        });
    });

    Path.map('#/posts/:id').to(function() {
        $.get('templates/messages.html', function(data) {
            $('#view').empty();
            $('#view').append(data);
        });
    });


    Path.root('#/');

    Path.listen();