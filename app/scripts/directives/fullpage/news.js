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
      templateUrl: '/views/fullpage/news.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {

      	scope.startForm = function(){
          scope.newsData = {};

          scope.selectedIndex = null;
          
          scope.viewGallery = false;
          scope.showLoader = false;
          scope.alertMsg = false;
          scope.viewForm = true;
          scope.showConfirm = false;
          scope.showeditNews = false;
          scope.showUploader = false;

          scope.mainTitle = '<i class="fa fa-plus-circle"></i> Add News';
          scope.messageAdd = '<i class="fa fa-info-circle"></i> Fill the form below to add News';
          scope.messageNews = '<i class="fa fa-chevron-circle-down"></i> Edit News from the list below';

          scope.newsPublished = true;
          scope.newsPublishedMsg = '<span class="green"><i class="fa fa-eye"></i> Publish</span>';
          scope.newsData.news_published = 1;
        }

        scope.startForm();

      	scope.update_news = function(){
       		CommonMain.get_news().then( function(d) {
	          // success
	          if(d){
	          	scope.newsObj = d;
	          	console.log(scope.newsObj);
              scope.startForm();
	          	scope.showLoader = false;
	          	scope.messageAdd = '<i class="fa fa-info-circle"></i> Fill the form below to add News';
	          }
	        }, function(d) {
	          // request rejected (error)
	          scope.newsObj = {};
	        });
	        return;
       	}

        scope.confirmAdd = function(){
          scope.showConfirm = !scope.showConfirm;
          scope.viewForm = !scope.viewForm;
          scope.mainTitle = '<i class="fa fa-exclamation-triangle"></i> Confirm Add News';
          scope.messageAdd = '<i class="fa fa-info-circle"></i> Click Publish to change publishing option';
        }

        scope.AddNews = function(){
          CommonMain.insert_news(scope.newsData).then( function(d) {
            // success
            if(d){
              scope.insertConfirm = d;
              console.log(scope.insertConfirm);
              if (d.success){
                scope.newsData = {};
                scope.backToAdd();
                scope.messageAdd = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
                $timeout(function(){
                  scope.messageAdd = '<i class="fa fa-info-circle"></i> Fill the form below to add News';
                }, 2000);
              } else{
                  scope.messageAdd = '<i class="fa fa-info-circle"></i> ' + d.msg +'. Go Back to add info!';
              }
              
            }
          }, function(d) {
            // request rejected (error)
            scope.insertConfirm = {};
          });
          return;
        }

        scope.publishNews = function(){
          if (!scope.newsPublished){
            scope.newsPublished = !scope.newsPublished;
            scope.newsPublishedMsg = '<span class="green"><i class="fa fa-eye"></i> Publish</span>';
            scope.newsData.news_published = 1;
          }  else {
            scope.newsPublishedMsg = '<i class="fa fa-eye-slash"></i> Unpublish';
            scope.newsPublished = !scope.newsPublished;
            scope.newsData.news_published = 0;
          }
          
        }

        scope.editNews = function(id){
          scope.showeditNews = !scope.showeditNews;
          scope.newsData = {};
          scope.newsID = id;
          scope.newsData.news_id = id;
          scope.newsData.news_picture = null;
          scope.message = '<i class="fa fa-chevron-circle-down"></i> Fill the form below to update the Tattoist';
        }

        scope.confirm_update = function(pub){
          scope.newsID = null;
          scope.showConfirm = true;
          scope.newsData.news_published = pub;
          scope.publishNews();
        }

        scope.UpdateNews = function(){
          CommonMain.update_news(scope.newsData).then( function(d) {
            // success
            if(d){
              scope.updateConfirm = d;
              console.log(scope.insertConfirm);
              if (d.success){
                //scope.newsData = {};
                scope.backToList();
                scope.messageNews = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
                $timeout(function(){
                  scope.messageNews = '<i class="fa fa-chevron-circle-down"></i> Edit News from the list below';
                }, 2000);
              } else{
                  scope.messageNews = '<i class="fa fa-info-circle"></i> ' + d.msg +'. Go Back to add info!';
              }
              
            }
          }, function(d) {
            // request rejected (error)
            scope.updateConfirm = {};
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
	          scope.newsObj = {};
	        });
	        return;
       	}

        scope.refresh_gallery = function(){
          CommonMain.get_gallery().then( function(d) {
            // success
            if(d){
              scope.galleryObj = d;
              console.log(scope.galleryObj);
            }
          }, function(d) {
            // request rejected (error)
            scope.galleryObj = {};
          });
          return;
        }

       	scope.display_gallery = function(){
       		scope.viewForm = !scope.viewForm;
          scope.newsID = null;
          scope.showLoader = true;
          scope.update_gallery();
        }

       	scope.selectThumb = function(index, link, backToEdit){
       		scope.selectedIndex = null;
       		scope.selectedIndex = index;
       		scope.newsData.news_picture = link;
       		$timeout(function(){
            backToEdit ? scope.backToEdit() : scope.backToAdd();
          }, 500);
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

        scope.showFileUploader = function(){
          scope.showUploader = !scope.showUploader;
        }

       	scope.backToGallery =function(){
          scope.mainTitle = '<i class="fa fa-file-image-o"></i> Manage Gallery';
          scope.messageAdd = '<i class="fa fa-info-circle"></i> Select a picture from the list below';
          scope.alertMsg = false;
          scope.update_gallery();
        }

        scope.backToAdd =function(){
       		if (!scope.showConfirm){
            scope.mainTitle = '<i class="fa fa-plus-circle"></i> Add News';
            scope.messageAdd = '<i class="fa fa-info-circle"></i> Edit News in the list below';
            scope.viewForm = !scope.viewForm;
            scope.viewGallery = !scope.viewGallery;
          } else {
            scope.mainTitle = '<i class="fa fa-plus-circle"></i> Add News';
            scope.messageAdd = '<i class="fa fa-info-circle"></i> Edit News in the list below';
            scope.showConfirm = !scope.showConfirm;
            scope.viewForm = !scope.viewForm;
          }
          
       	}

        scope.backToList = function(){
          scope.showeditNews = !scope.showeditNews;
          scope.newsID = null;
          scope.showConfirm = false;
          scope.update_news();

        }

        scope.backToEdit = function(){
          scope.newsID = scope.newsData.news_id;
          scope.showConfirm = false;
          scope.viewGallery = !scope.viewGallery;
        }



      	scope.morphyBtn();

      }
    };
  });
