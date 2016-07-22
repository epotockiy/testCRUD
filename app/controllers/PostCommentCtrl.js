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

    $http.get($scope.root + '/posts/' + $scope.thisAuthorId + '/comments')
    // HACK: it's better load only 5 posts instead of loading all 100 posts with selection that 5 from them
        .success(function(res) {
            $scope.commentsTemp = res;
            $scope.comments = [];
            angular.forEach($scope.commentsTemp, function(value, key) {
                // if (value.postId == $scope.thisAuthorId) {
                    $scope.comments.push(value);
                // }
            });
            // $log.log($scope.comments);
        })
        .error(function(err) {
            $log.info('err', err);
        });

    $scope.addNewComment = function() {
        // if($scope.commentName.$valid && $scope.commentEmail.$valid && $scope.commentBody.$valid) {
        $http.post($scope.root + '/posts/' + $scope.thisAuthorId + '/comments', {name: $scope.commentName, email: $scope.commentEmail, body: $scope.commentBody})
          .success(function(res) {
            $scope.comments.push(res);
            $scope.commentName = '';
            $scope.commentEmail = '';
            $scope.commentBody = '';
            $log.log(res.id);
          })
          .error(function(err) {
            $log.info('err', err);
          });
        // }
    };

    $scope.deleteComment = function(item) {
        $http.delete($scope.root + '/comments/' + item.id)
          .success(function(res) {
            // $log.log(res);
            var index = $scope.comments.indexOf(item)
            $scope.comments.splice(index, 1);
          })
          .error(function(err) {
              $log.info('error', err);
          });
    };

    $scope.save = function(item){
      // var index = $scope.comments.indexOf(item);
      // var masEnter = [$scope.comments[index].name, $scope.comments[index].email, $scope.comments[index].body];
      $http.put($scope.root + '/comments/' + item.id, item)
        .success(function(res) {

        })
        .error(function(err) {
          $log.info('err', err);
        })

    }
}]);
