app.controller('PostCommentCtrl', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log) {

    $scope.root = 'http://jsonplaceholder.typicode.com';

    $scope.thisAuthorId = $location.path().match(/[^/]*$/);

    $http.get($scope.root + '/posts/' + $scope.thisAuthorId)
        .success(function(res) {
            $scope.authorPost = res;
        })
        .error(function(err) {
            $log.info('error', err);
        });

    $http.get($scope.root + '/comments')
        .success(function(res) {
            $scope.commentsTemp = res;
            $scope.comments = [];
            angular.forEach($scope.commentsTemp, function(value, key) {
                if (value.postId == $scope.thisAuthorId) {
                    $scope.comments.push(value);
                }
            });
            $log.log($scope.comments);
        })
        .error(function(err) {
            $log.info('err', err);
        });

    $scope.newComment = function() {
        $scope.comments.push({ name: $scope.commentname, email: $scope.commentemail, body: $scope.commentbody });
        $scope.commentname = '';
        $scope.commentemail = '';
        $scope.commentbody = '';
    };
    $scope.deleteComment = function(item) {
        var index = $scope.comments.indexOf(item)
        $scope.comments.splice(index, 1);
    };
}]);
