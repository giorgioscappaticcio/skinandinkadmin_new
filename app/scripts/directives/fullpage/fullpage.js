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
       
       	scope.$watch('fb_integration',function(oldvalue, newvalue){
          if (oldvalue === newvalue){
            return;
          } else{
            scope.update_general_content();
            scope.update_tattoo_content();
          }
        });

        scope.$watch('shownews',function(oldvalue, newvalue){
          if (oldvalue === newvalue){
            return;
          } else{
            scope.update_news();
            //scope.update_tattoo_content();
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

        
       	
       }
     };
   });
