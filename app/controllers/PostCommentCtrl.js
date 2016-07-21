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

    $scope.addNewComment = function() {
        $scope.comments.push({ name: $scope.commentName, email: $scope.commentEmail, body: $scope.commentBody });
        $scope.commentName = '';
        $scope.commentEmail = '';
        $scope.commentBody = '';
    };
    $scope.deleteComment = function(item) {
        var index = $scope.comments.indexOf(item)
        $scope.comments.splice(index, 1);
    };

    $scope.save = function(item){
        var index = $scope.comments.indexOf(item);
        var masEnter = [$scope.comments[index].name, $scope.comments[index].email, $scope.comments[index].body];
        var bool = true;
        masEnter.forEach(function(item){

         if(item == ''){
            bool = false;
          }
        });
        if(!bool){
         alert("Please fill data");
         return true;
        }
        else{
            return false;
        }
    }
}]);
