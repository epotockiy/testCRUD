require.config({
    baseUrl: './app/router',
    shim: {
        Pilot: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../../../home_files/jquery',
        Pilot: '../../../vendor/Pilot'
    }
});


// Run App
require(['app'], function(App) {
    App.start('/');
});
