/*
SiteTour v1.0 - An extremely slick site tour plugin
(c) 2012 Karl Steltenpohl <http://www.karlsteltenpohl.com>
MIT-style license.

History:
This plugin was originally developed by Karl Steltenpohl @ Music Dealers for musicdealers.com

Dependencies:
- jQuery (tested with 1.7.1)
- scrollTo Plugin (http://demos.flesler.com/jquery/scrollTo/)

*/	

/**
 * The Plugin
 */
(function($) {
	
	/**
	 * Methods
	 */		
	var methods = {
        init : function(options) {
        	
        	//Default tour options
        	settings = $.extend({
    	      	autoPlay 			: 	false, 					// coming soon... 
    	      	defaultDelay		:	'5000',					// the default delay between steps in autoplay mode
    	      	theme 				: 	'dark', 				// or light, switches the overall appearance
				data				: 	[],						// array of data elements... 
				startItem			:	0,						// defaults to the first 
				initialDelay		: 	1000,  					// delay after tour is started till it starts 
				closeButtonText		:	'close',				// default close button text
				openButtonText		:	'tour',					// default "take tour" button text
				getStartedText		:	'Get Started',			// get started text
				textBoxTopOffset	:	100,					// how far the text box will be from each focused element
				/*scrollTopOffset		:	250,					// how far the window will scroll from the top of the element/text?*/
				itemDelay			:	1000,					// the timeout ms for the show item function
				elementDelay		:	500						// the timeout ms for the show element&shadow delay adds to itemDelay
    	    }, options);
        	
        	// Set Current Item and other imprtant vars
        	currentItem = settings.startItem; 						// Set the current item as the starting option's item */
        	lastItem = parseInt(settings.data.length - 1);
        	console.log('LAST ITEM: ' + lastItem);
        	windowHeight = parseInt($(window.document).height());	// Window height 
			
			// Append the tour to the page 
			$("body").append('<div class="sitetour-close">'+settings.openButtonText+'</div><div class="sitetour-overlay '+settings.theme+'" style="height:'+windowHeight+'px;"></div><div class="sitetour-wrapper"><div class="sitetour-fakemouse"></div><div class="sitetour-text"><div class="sitetour-text-main"><h1></h1><p></p></div><div class="sitetour-text-navigation"><a class="sitetour-prev">Previous</a> <a class="sitetour-next">Next</a> <a class="sitetour-get-started">' + settings.getStartedText + '</a></div><!-- <div class="sitetour-text-shadow"></div> --></div><div class="sitetour-spotlight"><div class="sitetour-dropshadow"></div></div></div>');
			
			// Maximize
			// TODO... 
			
			//Pulsate Fake Mouse
			//$(".sitetour-fakemouse").effect( "pulsate", {times:100}, 500 );
			
			// Window resize event 
			$(window).resize(function(){
				windowHeight = parseInt($(window.document).height());
				$('.sitetour-overlay').css({'height': windowHeight+'px'});
				$('.sitetour-wrapper').css({'height': windowHeight+'px'});
		    });
			
			// Window scoll event
			$(window).scroll(function(){
				windowHeight = parseInt($(window.document).height());
				$('.sitetour-overlay').css({'height': windowHeight+'px'});
				$('.sitetour-wrapper').css({'height': windowHeight+'px'});
			});
			
			// Plugin Elements as vars
			overlay 				= $(".sitetour-overlay");
		    wrapper					= $(".sitetour-wrapper");
			textbox 				= $(".sitetour-text");
		    spotlight				= $(".sitetour-spotlight");
		    dropShadow				= $(".sitetour-dropshadow");
		    navigation				= $(".sitetour-text-navigation");
		    nextbutton				= $(".sitetour-text-navigation a.sitetour-next");
		    prevbutton				= $(".sitetour-text-navigation a.sitetour-prev");
		    getstarted				= $(".sitetour-text-navigation a.sitetour-get-started");
		    closebutton				= $(".sitetour-close");
		    
		    // Minimize
			closebutton.click(function(e){ 
				$.siteTour("minimize");
			});
		    
		    // Nextbutton event
		    nextbutton.click(function(e){
		    	$.siteTour("nextItem");
		    });
		    
		    // Prevbutton event
		    prevbutton.click(function(){
		    	$.siteTour("prevItem");
		    });
		    
		    // Get Started event
		    getstarted.click(function(){
		    	$.siteTour("minimize");
		    });
		    
		    // Mousemove event for the focused elements dropshadow
		    $(window).mousemove(function(event) {
				windowHeight 	= parseInt($(window).height());
				windowWidth 	= parseInt($(window).width());
				windowCenter 	= parseInt(windowWidth/2);
				x				= parseInt(event.pageX)
				//console.log('WINDOW CENTER: '+windowCenter+'');
				//console.log('MOUSE X: '+event.pageX);
				if(x < windowCenter){
					distance 		= (windowCenter) - (x);
					//console.log('DISTANCE 1: '+distance);
					shadowDega 		= parseInt(((distance/windowCenter) * 100) / 2);
					shadowDeg		= parseInt(shadowDega - (shadowDega*2));
					loffset			= parseInt(((distance/windowCenter) * 100) / 6);					
				} else {
					distance 		= (x) - (windowCenter);
					//console.log('DISTANCE 2: '+distance);
					shadowDeg		= parseInt(((distance/windowCenter) * 100) / 2);
					loffseta		= parseInt(((distance/windowCenter) * 100) / 6);
					loffset			= parseInt(loffseta - (loffseta*2));
				}
				
				//skewOffset = dropShadow.height()/loffset; // testing this out...
				//console.log('SHADOW DEG: '+shadowDeg);
				//console.log(shadowDeg);
				//console.log(textboxShadow);
				dropShadow.css('-moz-transform','skew('+shadowDeg+'deg, 0deg)');
				dropShadow.css('-webkit-transform','skew('+shadowDeg+'deg, 0deg)');
				dropShadow.css('-ms-transform','skew('+shadowDeg+'deg, 0deg)');
				////curLeft = parseInt(dropShadow.css('left').replace('px'));
				//console.log('LOFFSET: '+loffset);
				//console.log('CURLEFT: '+curLeft);
				//console.log('Drop Shadow Parent Width: '+dropShadow.parent().width());
				//console.log('Drop Shadow Width: '+dropShadow.width());
				//console.log('Pushing: '+parseInt(loffset + ((dropShadow.parent().width()/2) - (dropShadow.width()/2)))+'px');
				dropShadow.css('left',parseInt(loffset + ((dropShadow.parent().width()/2) - (dropShadow.width()/2)))+'px');
				//dropShadow.css('left',parseInt());
				//spotlight.css('left',parseInt());
		    });
		    
        },
        start : function( ) {
        	console.log('tour start');
        	closebutton.html(settings.closeButtonText);
        	setTimeout(function(){
        		overlay.fadeIn('slow');
        		wrapper.fadeIn('slow');
        		
        		// blur text
        		$('body *').addClass('blurry-text');
        		
        		if(settings.data){
            		console.log("THIS: ");
            		console.log(this);
            		$.siteTour("showItem");
    			}
        	},settings.initialDelay);
        },
        hideItem: function(){
        	if(typeof currentElement != 'undefined'){
        		
        		//console.log('Curent Element: ');
        		//console.log(Elemement);
        		
	        	//tourItemArray = settings.data[currentItem];
	        	//currentElement = $(""+tourItemArray['selector']+"");
	        	/**
				 * Focused Elements original position
				 */
				//currentElementParent 	= currentElement.parent('div');
	        	//currentElementOffset	= currentElement.offset();
				currentElement.css('position' , currentElementPosition);
				currentElement.removeClass('sitetour-force-white');
				currentElement.css('z-index',currentElementZindex);
				if($.isFunction(tourItemArray['afterHide'])) {
					// call user provided method
					tourItemArray['afterHide'].call();
				}
        	}
        	textbox.fadeOut('fast');
        	spotlight.fadeOut('fast');
        	dropShadow.fadeOut('fast');
        	
        },
        showItem : function () {
        	
        	tourItemArray = settings.data[currentItem];					// Get the item data
			currentElement = $(""+tourItemArray['selector']+"");		// the current focused element
			
			if(!currentElement.length){
				++currentItem;
				$.siteTour("showItem");
			} else {
			
				fixedFlag = 0;
				if(currentElement.css('position') == 'fixed'){ /*currentElement.css('position','relative');*/ fixedFlag = 1; }
				
				console.log('CURRENT ELEMENT:');
				console.log(currentElement);
				
				
				if($.isFunction(tourItemArray['beforeShow'])) {
					// call user provided method
					tourItemArray['beforeShow'].call();
				}
	
				
				// Handle elements that are hidden in other jquery-ui tabs
				// literally clicks into that tab
				if(currentElement.closest('.ui-tabs-panel').length){ 
					tabid = currentElement.closest('.ui-tabs-panel').attr('id');
					
					// Handle elements that are in tabs within tabs, oooohhhhhh...
					// click this parent tab first
					if($("a[href='#"+tabid+"']").closest('.ui-tabs-panel').length){
						tabidid = $("a[href='#"+tabid+"']").closest('.ui-tabs-panel').attr('id');
						$("a[href='#"+tabidid+"']").trigger('click');
						console.log('clicked parent tab from tour #' + tabid + '');
					}
					
					// click the child tab
					$("a[href='#"+tabid+"']").trigger('click');
					//console.log("Length: "+$('ul.ui-tabs-nav li a[href="#'+tabid+'"').length);
					console.log('clicked tab from tour #' + tabid + '');
				}
				
				// Timeout wrapper, settings.itemDelay , must be longer than the tabs animations if there are any
				setTimeout(function() {
					
					// Focused Elements original position
					currentElementParent 	= currentElement.parent('div');
					currentElementPosition 	= currentElement.css('position');
					//currentElementMargin 	= currentElement.css('margin');
					currentElementOffset	= currentElement.offset();
					currentElementZindex	= currentElement.css('z-index');
					currentElementWidth 	= currentElement.css('width').replace('px','');
					
					//console.log('OFFSET: ');
					console.log('CURRENT WIDTH: '+currentElementWidth);
					
					// Centers, and shows the spotlight .5 sec after overlay
					//spotlight.css('top',(($(window).height()/2) - (spotlight.height()/2))+'px');
					
					// Bring up the spotlight in .5 sec
					if(fixedFlag != 1){
						
						// get this steps default scroll offset
						if(typeof tourItemArray['scrollTopOffset'] == 'undefined'){
							scrollTopOffset = currentElementOffset.top;
						} else {
							scrollTopOffset = tourItemArray['scrollTopOffset'];
						}
						
						// get this steps default textbox position
						if(typeof tourItemArray['textPosition'] == 'undefined'){ tourItemArray['textPosition'] = 'top'; }

						// Scroll to that element, only scroll to elements that are not fixed
						
						$.scrollTo(''+tourItemArray['selector']+'',900,{ offset : scrollTopOffset });
						
						paddingTop = parseInt(currentElement.css('padding-top').replace('px',''));
						console.log('PADDING TOP: '+paddingTop);
						
						
						spotlightTop 	= parseInt(paddingTop + currentElementOffset.top + currentElement.height() - (spotlight.height()/2));
						spotlightLeft	= parseInt(currentElementOffset.left - (currentElement.width()/4));
						spotlightWidth	= parseInt(currentElement.width() + (currentElement.width()/2));
						//console.log("spotlightTop: "+spotlightTop);
						//console.log("spotlightLeft: "+spotlightLeft);
						//console.log("spotlightWidth: "+spotlightWidth);
						spotlight.css('top',spotlightTop+'px');			// Positions spotlight at the base of the element 
						spotlight.css('left',spotlightLeft+'px'); 		// Positions spotlight 5% to the left of the current element 
						spotlight.css('width',spotlightWidth+'px'); 	// Makes spotlight width 10% larger than the current element 
						spotlight.css('position','absolute');			// Makes the spotlight absolute
						spotlight.fadeIn('slow');
						
						// Text
						// enters .7 sec after overlay
						textbox.children('.sitetour-text-main').children('h1').html(tourItemArray['title']);
						textbox.children('.sitetour-text-main').children('p').html(tourItemArray['text']);
						
						console.log('TextPosition: '+tourItemArray['textPosition']);
						
						if(tourItemArray['textPosition'] == 'left'){
							textBoxTop 	= parseInt(currentElementOffset.top) + 30;
							textBoxLeft = parseInt(currentElementOffset.left) - parseInt(textbox.width());
						}
						else if(tourItemArray['textPosition'] == 'right'){
							textBoxTop 	= parseInt(currentElementOffset.top) + 30;
							textBoxLeft = parseInt(currentElementOffset.left) + parseInt(currentElementWidth) - 10;

							//console.log("textBoxLeft width + offset:"+currentElementWidth+" + " +currentElementOffset.left);
							//console.log('MADE IT!!!!');
						}
						else if(tourItemArray['textPosition'] == 'bottom'){
							textBoxTop 	= parseInt(currentElementOffset.top - (textbox.height()) - settings.textBoxTopOffset);
							if(textBoxTop <= 10){ textBoxTop = 10; }		// Buffer the top of the window by 10px
							textBoxLeft = parseInt(currentElementOffset.left + 20);
						}
						else{
							// TOP
							textBoxTop 	= parseInt(currentElementOffset.top - (textbox.height()) - settings.textBoxTopOffset);
							if(textBoxTop <= 10){ textBoxTop = 10; }		// Buffer the top of the window by 10px
							textBoxLeft = parseInt(currentElementOffset.left + 20);
						}
						
						
						
						console.log("textBoxTop :"+textBoxTop);
						console.log("textBoxLeft :"+textBoxLeft);
						
						textbox.css("top",textBoxTop+'px');
						textbox.css("left",textBoxLeft+'px');
						textbox.css("position","absolute");
						textbox.fadeIn('1000'); // This comes in later
					}
					
					// Bring up the element in 500ms after this
					setTimeout(function() {
						if(fixedFlag == 1){ 
							console.log('Fixed');
							// fixed elements need to be positioned differently
							spotlightWidth	= parseInt(currentElement.width() + (currentElement.width()/2));
							
							fixedElementLeft = currentElement.css('left').replace('px','');
							fixedElementTop = currentElement.css('top').replace('px','');
							//console.log("fixed element left: "+fixedElementLeft);
							//console.log("fixed element top: "+fixedElementTop);
							
							
							spotlightLeft	= parseInt(parseInt(fixedElementLeft) - (currentElement.width()/4));
							spotlightTop 	= parseInt(parseInt(fixedElementTop) + currentElement.height() - (spotlight.height()/2) - (spotlight.height()/4));
	
							//console.log("fixed spotlightTop: "+spotlightTop);
							//console.log("fixed spotlightLeft: "+spotlightLeft);
							//console.log("fixed spotlightWidth: "+spotlightWidth);
							
							spotlight.css('top',spotlightTop+'px');			// Positions spotlight at the base of the element 
							spotlight.css('left',spotlightLeft+'px'); 		// Positions spotlight 5% to the left of the current element 
							spotlight.css('width',spotlightWidth+'px'); 	// Makes spotlight width 10% larger than the current element 
							spotlight.css('position','fixed');				// Makes the spotlight fixed
							spotlight.fadeIn('slow');
							
							textbox.children('.sitetour-text-main').children('h1').html(tourItemArray['title']);
							textbox.children('.sitetour-text-main').children('p').html(tourItemArray['text']);
							
							textBoxTop 	= parseInt(parseInt(fixedElementTop) - (textbox.height()) - settings.textBoxTopOffset);
							if(textBoxTop <= 10){ textBoxTop = 10; }		// Buffer the top of the window by 10px
							textBoxLeft = parseInt(parseInt(fixedElementLeft) + 20);
							
							textbox.css("top",textBoxTop+'px');
							textbox.css("left",textBoxLeft+'px');
							textbox.css('position','fixed');				// Makes the textbox fixed
							
							textbox.fadeIn('1000'); // This comes later
							
						} else { 
							currentElement.css('position','relative'); 
						}
						
						currentElement.css('z-index','10000004');
						
						// unblur the element
						currentElement.removeClass('blurry-text');
						currentElement.find('*').removeClass('blurry-text');
						
						currentTPadding = currentElement.css('padding-top');
						currentLPadding = currentElement.css('padding-left');
						currentBPadding = currentElement.css('padding-bottom');
						currentRPadding = currentElement.css('padding-right');
						
						currentWidth = currentElement.css('width').replace('px','');
						newWidth = parseInt(currentWidth - 20)
						console.log('NEW WIDTH: '+newWidth);
						currentElement.css('width', ''+newWidth+'px');
						
						//currentElement.css('padding','10px');
						
						if(settings.theme = 'light'){
							currentElement.addClass('sitetour-force-bg').addClass('light');				// Force bg
							currentElement.addClass('non-blurry-text').addClass('light');				// make non blurry
							currentElement.find('*').addClass('non-blurry-text').addClass('light');		// make non blurry
						} else {
							currentElement.addClass('sitetour-force-bg').addClass('dark');
							currentElement.addClass('non-blurry-text').addClass('dark');
							currentElement.find('*').addClass('non-blurry-text').addClass('dark');
						}
						
						//currentElement.show("slide", { direction: "down" }, 'fast');
						//currentElement.show("slide", { direction: "down" }, 'fast');
						//currentElement.show('fast');
						/**
						 * call any callback function on this step
						 */
						if($.isFunction(tourItemArray['afterShow'])) {
							// call user provided method
							tourItemArray['afterShow'].call();
						}
					}, settings.elementDelay);
					
					
					// Shows the shadow element shadow 500ms later
					setTimeout(function() {
						// Drop Shadow
						//dropShadowTop 		= parseInt(currentElementOffset.top + currentElement.height() - (dropShadow.height()));
						//dropShadowLeft 		= parseInt(currentElementOffset.left);
						//dropShadowTop 			= parseInt(currentElementOffset.top + dropShadow.height());
						//dropShadowLeft 			= parseInt(currentElementOffset.left);
						//dropShadowTop 		= parseInt((dropShadow.parent('div').height()/2) - (currentElement.height()/2) + 2);
						dropShadowHeight 		= parseInt(currentElement.height() / 2);
						if(dropShadowHeight > parseInt(spotlight.height()/3)){ dropShadowHeight = parseInt(spotlight.height()/3); }
						dropShadowWidth 		= parseInt(currentElement.width() + 20);
						dropShadowBotom			= parseInt((spotlight.height()/2) - 24);
						dropShadowLeft			= parseInt(dropShadow.parent('div').width() - (currentElement.width() + (currentElement.width()/4)));
						dropShadowLeft 			= parseInt((dropShadow.parent('div').width()/2) - (dropShadowWidth/2) + 10);
						console.log("dropShadowBotom: "+dropShadowBotom); 		// Positions dropshadow at the base ob element 
						console.log("dropShadowLeft: "+dropShadowLeft);
						console.log("dropShadowHeight: "+dropShadowHeight);
						console.log("dropShadowWidth: "+dropShadowWidth);
						dropShadow.css('width',dropShadowWidth+'px');
						dropShadow.css('height',dropShadowHeight+'px');
						dropShadow.css('bottom',dropShadowBotom+'px');
						dropShadow.css('left',dropShadowLeft+'px');
						dropShadow.css('border-radius',currentElement.css('border-radius'));
						dropShadow.css('-moz-border-radius',currentElement.css('-moz-border-radius'));
						dropShadow.css('-webkit-border-radius',currentElement.css('-moz-webkit-radius'));
						dropShadow.css('-ms-border-radius',currentElement.css('-moz-border-radius'));
						//dropShadow.show("slide", { direction: "down" }, 'fast');
						dropShadow.show('fast');
						
						// Navigation
						// Hide/Show Prev
						if(currentItem == 0){
							prevbutton.hide();
						} else {
							prevbutton.show();
						}
						
						// Hide/Show Next
						if(currentItem == lastItem){
							nextbutton.hide();
							getstarted.show();
						} else {
							nextbutton.show();
							getstarted.hide();
						}
					}, settings.elementDelay);
				}, settings.itemDelay);
			}
        },
        prevItem : function (){
        	console.log('clicked prev');
        	--currentItem;
        	$.siteTour("hideItem");
        	$.siteTour("showItem");
        },
        nextItem : function () {
        	console.log('clicked next');
        	++currentItem;
        	$.siteTour("hideItem");
        	$.siteTour("showItem");
        },
        minimize : function (){
        		if(overlay.is(":visible")){
        			console.log('CLOSING TOUR');
        			$.siteTour("hideItem");
        			overlay.fadeOut('slow');
        			wrapper.fadeOut('slow');
        			// blur text
            		$('body *').removeClass('blurry-text');
            		$('body *').removeClass('non-blurry-text');
            		
        			closebutton.html(settings.openButtonText)
        		} else {
        			console.log('OPENING TOUR');
        			$.siteTour("hideItem");
        			$.siteTour("start");
        			closebutton.html(settings.closeButtonText);
        		}
        	
        },
        destroy : function () {
        	console.log('tour destroy');
        
        }
    };
	
	/**
	 * Extend the plugin function so it can be called without an element
	 */
	$.extend({
		siteTour: function (options) {
			/**
			 * If a method
			 */
			if ( methods[options] ) {
	            return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	        }
			/**
			 * Initiate
			 */
			else if ( typeof options === 'object' || ! options ) {
	            // Default to "init"
	            return methods.init.apply( this, arguments );
	        } else {
	            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	        } 
        }
    });
})(jQuery);