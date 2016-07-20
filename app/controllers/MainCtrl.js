app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.root = 'http://jsonplaceholder.typicode.com';


    $scope.numPreLoad = 0;
    $scope.more = true;
    $scope.headlines = [];

    $http.get($scope.root + '/posts')
        .success(function(res) {
            $scope.headlines = res.slice(0, 10);
        });


    $scope.lol = function() {
        $scope.numPreLoad += 10;

        $scope.limit = $scope.limit || $scope.numPreLoad;

        $http.get($scope.root + '/posts')
            .success(function(res) {
                $scope.posts = res.slice($scope.numPreLoad);
                var i = 0;


                if (Object.keys($scope.posts).length < $scope.limit + 1) {
                    $scope.more = false;
                }
                angular.forEach($scope.posts, function(value, key) {
                    if (i == $scope.limit) {
                        return false;
                    }
                    $scope.headlines.push(value);
                    i++;

                });
            })
            .error(function(err) {
                console.log("status" + err);
            });
    };
$scope.deletePost = function(item) {
        var index = $scope.headlines.indexOf(item)
        $scope.headlines.splice(index, 1);
    };









}]);

