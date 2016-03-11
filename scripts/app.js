angular.module('app', [])
.controller('AppCtrl', ['$scope', function($scope) {
  $scope.name = 'World';
}])
.directive('learn', function(){
  return {
    restrict: 'E',
    compile: function(){
      console.log('learn: compile');
      return {
        pre: function(){
          console.log('learn: preLink');
        },
        post: function(){
          console.log('learn: postLink or Link');
        }
      }
    },
    controller: function($scope){
      console.log('learn: controller');
    }                                                       
  }
})
.directive('life', function(){
  return {
    restrict: 'E',
    compile: function(){
      console.log('life: compile');
      return {
        pre: function(){
          console.log('life: preLink');
        },
        post: function(){
          console.log('life: postLink or Link');
        }
      }
    },
    controller: function($scope){
      console.log('life: controller');
    }
  }
})
.directive('cycle', function(){
  return {
    restrict: 'E',
    compile: function(){
      console.log('cycle: compile');
      return {
        pre: function(){
          console.log('cycle: preLink');
        },
        post: function(){
          console.log('cycle: postLink or Link');
        }
      }
    },
    controller: function($scope){
      console.log('cycle: controller');
    }                                                       
  }
});
