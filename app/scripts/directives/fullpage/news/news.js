'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:fullpage/news/news
 * @description
 * # fullpage/news/news
 */
angular.module('adminApp')
  .directive('news', function (CommonMain, $timeout) {
    return {
      templateUrl: '/views/fullpage/news/news.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {

      	scope.newsData = {};

      	scope.viewGallery = false;
      	scope.showLoader = false;
        scope.alertMsg = false;
        scope.viewForm = true;

      	scope.mainTitle = '<i class="fa fa-plus-circle"></i> Add News';
      	scope.messageAdd = '<i class="fa fa-info-circle"></i> Edit News in the list below';

      	scope.update_news = function(){
       		CommonMain.get_news().then( function(d) {
	          // success
	          if(d){
	          	scope.newsObj = d;
	          	console.log(scope.newsObj);
	          	scope.showLoader = false;
	          	scope.messageAdd = '<i class="fa fa-info-circle"></i> Edit News in the list below';
	          }
	        }, function(d) {
	          // request rejected (error)
	          $scope.newsObj = {};
	        });
	        return;
       	}

       	scope.update_gallery = function(){
       		CommonMain.get_gallery().then( function(d) {
	          // success
	          if(d){
	          	scope.galleryObj = d;
	          	console.log(scope.galleryObj);
	          	scope.showLoader = false;
	          	scope.messageAdd = '<i class="fa fa-info-circle"></i> Select a picture from the list below';
	          	scope.mainTitle = '<i class="fa fa-file-image-o"></i> Manage Gallery'
       			scope.viewGallery = !scope.viewGallery;
	          }
	        }, function(d) {
	          // request rejected (error)
	          $scope.newsObj = {};
	        });
	        return;
       	}

       	scope.display_gallery = function(){
       		scope.viewForm = !scope.viewForm;
          scope.showLoader = true;
       		scope.update_gallery();
       	}

       	scope.selectThumb = function(index, link){
       		scope.selectedIndex = null;
       		scope.selectedIndex = index;
       		scope.newsData.picUrl = link;
       		$timeout(function(){scope.backToAdd();}, 500);
        }

        scope.delete_picture = function(id, url){
          scope.alertMsg = true;
          scope.viewGallery = !scope.viewGallery;
          scope.pictureToDelete = id;
          scope.pictureUrl = url;
          scope.messageAdd = '<i class="fa fa-exclamation-triangle"></i> Warning: Delete confirmation.' 
        }

        scope.confirm_delete_picture = function(){
          CommonMain.delete_picture(scope.pictureToDelete).then( function(d) {
            // success
            if(d){
              scope.deleteConfirm = d;
              console.log(scope.deleteConfirm);
              scope.backToGallery();
            }
          }, function(d) {
            // request rejected (error)
            $scope.newsObj = {};
          });
          return;
        }

       	scope.backToGallery =function(){
          scope.mainTitle = '<i class="fa fa-file-image-o"></i> Manage Gallery';
          scope.messageAdd = '<i class="fa fa-info-circle"></i> Select a picture from the list below';
          scope.alertMsg = false;
          scope.update_gallery();
        }

        scope.backToAdd =function(){
       		scope.mainTitle = '<i class="fa fa-plus-circle"></i> Add News';
       		scope.messageAdd = '<i class="fa fa-info-circle"></i> Edit News in the list below';
       		scope.viewForm = !scope.viewForm;
          scope.viewGallery = !scope.viewGallery;
       	}

      	scope.morphyBtn();

      }
    };
  });
