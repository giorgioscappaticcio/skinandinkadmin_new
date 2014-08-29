'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:fullpage/fullpage
 * @description
 * # fullpage/fullpage
 */

 angular.module('adminApp')
   .directive('fullpage', function (CommonMain, $timeout) {
     return {
       templateUrl: '/views/fullpage/fullpage.html',
       restrict: 'AE', 
       link: function postLink(scope, element, attrs) {
       
       	scope.formData = {}
       	scope.tattooData = {}

       	scope.displayForm = false;
       	scope.editTattoist = false;
         scope.addTattoist = false;
         scope.alertMsg = false;
         scope.successMsg = true;
         scope.showLoader = true;

         scope.green = {
           'color' : 'green'
         }

       	//validation
       	scope.noName = false;

         scope.message = '<i class="fa fa-info-circle"></i> ' + 'Waiting Tattoist list loading...';
         scope.message_general_info = '<i class="fa fa-info-circle"></i> ' + 'Click Edit to update the info';

       	scope.update_general_info = function(){
       		CommonMain.update_general_info(scope.formData).then( function(d) {
 		          // success
 		          if(d){
 		          	scope.update_general_content();
 		          	scope.displayForm = !scope.displayForm;
                 if (d.success == true) {
                   scope.message_general_info = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
                   $timeout(function(){
                     scope.message_general_info = '<i class="fa fa-info-circle"></i> ' + 'Click Edit to update the info';
                   }, 5000);
                 } else if (d.success == false){
                   scope.message_general_info = '<i class="fa fa-info-circle"></i> ' + d.msg;
                 }

 		          }
 		        }, function(d) {
 		          // request rejected (error)
 		        });
       	}

       	scope.update_tattoo_info = function(){
           //scope.editTattoist = false;
           scope.message = '<i class="fa fa-cog rotate"></i> ' + 'Uploading content';
           scope.noName = false;
       		scope.noFbID = false; 
       		scope.noFbAlbumID = false;
       		scope.noNavPos = false; 
       		if (scope.tattooData.tattoo_name == '' || scope.tattooData.tattoo_name == undefined ){
       			scope.noName = true;
       			return;
       		} else if (scope.tattooData.fb_id == '' || scope.tattooData.fb_id == undefined ){
       			scope.noFbID = true;
       			return;
       		} else if (scope.tattooData.fb_album == '' || scope.tattooData.fb_album == undefined ){
       			scope.noFbAlbumID = true;
       			return;
       		} else if (scope.tattooData.nav_pos == '' || scope.tattooData.nav_pos == undefined ){
       			scope.noNavPos = true;
       			return;
       		}
       		CommonMain.update_tattoo_info(scope.tattooData).then( function(d) {
 		          // success
 		          if(d){
 		          	console.log(d)
                 if (d.success == true){
                   scope.message = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
                   scope.successMsg = true;
                   $timeout(function(){
                     scope.message = '<i class="fa fa-chevron-circle-down"></i> Fill the form below to update the content';
                   }, 5000);
                 } else if (d.success == false){
                   scope.message = '' + d.msg;
                   scope.successMsg = true;
                 }
 		          }
 		        }, function(d) {
 		          // request rejected (error)
 		        });
       	}

         scope.insert_new_tattoist = function(){
           CommonMain.insert_tattoo_info(scope.tattooData).then( function(d) {
               // success
               if(d){
                 //scope.update_tattoo_content();
                 if (d.success == true ){
                   scope.tattooData = {};
                   scope.message = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
                   $timeout(function(){
                     scope.message = '<i class="fa fa-chevron-circle-down"></i> ' + 'Fill the form below to add a new Tattoist';
                   }, 5000);
                 } else if (d.success == false){
                   scope.message = '' + d.msg;
                 }
               }
             }, function(d) {
               // request rejected (error)
             });
         }

         scope.remove_tattoist = function(id, name){
           scope.tattoisToRemove = id;
           scope.tattoistName = name;
           scope.editTattoist = true;
           scope.alertMsg = true;  
           scope.message = '<i class="fa fa-exclamation-triangle"></i> Warning: Delete confirmation.' 
         }

         scope.confirm_delete = function(){
           CommonMain.remove_tattoo_info(scope.tattoisToRemove).then( function(d) {
               // success
               if(d){
                 scope.update_tattoo_content();
                 scope.resetForm();
                 console.log(d)

               }
             }, function(d) {
               // request rejected (error)
             });
         } 

       	scope.resetForm = function(){
       		scope.update_tattoo_content();
           scope.editTattoist = false; 
       		scope.tattooID = null;
       		scope.tattooData = {};
       		scope.noName = false;
       		scope.noFbID = false; 
       		scope.noFbAlbumID = false;
       		scope.noNavPos = false; 
           scope.addTattoist = false;
           scope.alertMsg = false;
           scope.tattoisToRemove = null;
           scope.tattoistName = null;
           //scope.message = '<i class="fa fa-chevron-circle-down"></i> ' + 'Edit Facebook info from in the list below';
           scope.successMsg = true;
       	}

       	scope.showForm = function(){
           scope.message_general_info = '<i class="fa fa-info-circle"></i> ' + 'Fill the form to update the info';
           scope.displayForm = !scope.displayForm;
       	}

       	scope.displayTattoistForm = function(id){
     			scope.editTattoist = !scope.editTattoist;
     			scope.tattooID = id;
     			scope.tattooData.tattoo_id = id;
           scope.message = '<i class="fa fa-chevron-circle-down"></i> Fill the form below to update the Tattoist';
       	}

         scope.addNewTattoist = function(){
           scope.tattooData = {};
           scope.addTattoist = true;
           scope.message = '<i class="fa fa-chevron-circle-down"></i> ' + 'Fill the form below to add a new Tattoist';
           scope.editTattoist = !scope.editTattoist;
         }

       	scope.update_general_content = function(){
       		CommonMain.general_info().then( function(d) {
 		          // success
 		          if(d){
 		          	scope.studioInfo = d;
 		          	console.log(scope.studioInfo);
 		          	
 		          }
 		        }, function(d) {
 		          // request rejected (error)
 		          $scope.studioInfo = {};
 		        });
       	}

       	scope.update_tattoo_content = function(){
       		
       		CommonMain.tattoo_info().then( function(d) {
 		          // success
 		          if(d){
 		          	scope.tattooInfo = d;
 		          	console.log(scope.tattooInfo)
 		          	scope.showLoader = false;
                 scope.message = '<i class="fa fa-chevron-circle-down"></i> ' + 'Edit Facebook info from in the list below';

 		          }
 		        }, function(d) {
 		          // request rejected (error)
 		          $scope.tattooInfo = {};
 		        });
       	}


       	
       	scope.$watch('fb_integration',function(oldvalue, newvalue){
       		if (oldvalue === newvalue){
       			return;
       		} else{
     				scope.update_general_content();
     				scope.update_tattoo_content();
     			}
       	});

         
         // Contribute by Codrops --> 
       	scope.morphyBtn = function(){
       		var docElem = window.document.documentElement, didScroll, scrollPosition;

             // trick to prevent scrolling when opening/closing button
             function noScrollFn() {
                 window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
             }

             function noScroll() {
                 window.removeEventListener( 'scroll', scrollHandler );
                 window.addEventListener( 'scroll', noScrollFn );
             }

             function scrollFn() {
                 window.addEventListener( 'scroll', scrollHandler );
             }

             function canScroll() {
                 window.removeEventListener( 'scroll', noScrollFn );
                 scrollFn();
             }

             function scrollHandler() {
                 if( !didScroll ) {
                     didScroll = true;
                     setTimeout( function() { scrollPage(); }, 60 );
                 }
             };

             function scrollPage() {
                 scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
                 didScroll = false;
             };

             scrollFn();

             [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
                 new UIMorphingButton( bttn, {
                     closeEl : '.icon-close',
                     onBeforeOpen : function() {
                         // don't allow to scroll
                         noScroll();
                     },
                     onAfterOpen : function() {
                         // can scroll again
                         canScroll();
                     },
                     onBeforeClose : function() {
                         // don't allow to scroll
                         noScroll();
                     },
                     onAfterClose : function() {
                         // can scroll again
                         canScroll();
                     }
                 } );
             } );

             // for demo purposes only
             [].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
                 bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
             } );
       	}

       	scope.morphyBtn();


       	
       }
     };
   });
