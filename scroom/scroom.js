/**
 * scroom jQuery plugin
 * version 1.0
 *
 * Copyright (c) 2016 - Gaurav Kumar <aavrug@gmail.com>
 *
 * Dual licensed under the MIT (LICENSE)
 * and GPL (LICENSE) licenses.
 *
 * @URL      https://github.com/aavrug/scroom
 * @Example  https://github.com/aavrug/scroom/tree/master/demo/example.html
 *
 **/

(function($) {
	$.fn.scrollZoom = function(n) {
		var id 		  = this.attr('id');
		var blockPos  = $('#'+id).offset();
		var blockLeft = blockPos.left;
		var blockTop  = blockPos.top;
		var imgClass  = '#'+id+' .scroom-map .scroom-img';
    	var clicked   = false, selectArea = false, selectAreaClicked = false, drag = false, first = false, overLay = false, realChangeX, realChangeY, clickY, clickX, width, height, actX, actY, boxes = '';
    	var divWidth  = $('#'+id).width();
    	var divHeight = $('#'+id).height();

    	window.onload = function(e) {
        	scrollImage(e);
    	}

    	var imageSrc = $(imgClass).css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    	var image 	 = new Image();
    	image.src 	 = imageSrc;

	    image.onload = function() {
	        width  = this.width;
	        height = this.height;
	    }

	    $(imgClass).on({
	        'mousemove': function(e) {
	            if (!selectArea) {
	                clicked && scrollImage(e);
	            } else {
	                if (drag) {
	                    $.fn.scrollZoom.draw(clickX, clickY, e.pageX, e.pageY, imgClass, first, blockLeft, blockTop, actX, actY);
	                    first = false;
	                }
	            }
	            $.fn.scrollZoom.pointer(selectArea, 'area', imgClass);
	        },
	        'mousedown': function(e) {
	            clickX = e.pageX;
	            clickY = e.pageY;
	            var currentPos = $(imgClass).css('background-position').split(' ');
	            actX = currentPos[0].slice(0, -2);
	        	actY = currentPos[1].slice(0, -2);
	            if (e.target.className == 'scroom-square' && selectArea) {
				    var squareId = e.target.id;
				    $.fn.scrollZoom.remove(squareId);
	            } else {
		            if (!selectArea) {
		                clicked = true;
		                drag = false;
		            } else {
		          		drag = true;
		                first = true;
		            }
		            $.fn.scrollZoom.pointer(selectArea, 'area', imgClass);
	            }

	        },
	        'mouseup': function(e) {
	            drag = false;
	            if (!selectArea) {
	                clicked = false;
	                $('html').css('cursor', 'auto');
			        if ($('.scroom-square').length > 0) {
		                $('.scroom-square').each(function(index, element) {
							if (e.pageX == clickX && e.pageY == clickY) {
								return false;
							}
				        	var squareId = element.id;
				        	var offsetX = element.style.left.slice(0, -2);
				        	var offsetY = element.style.top.slice(0, -2);

				        	var nrealChangeX = parseInt(realChangeX) + parseInt(offsetX);
				        	var nrealChangeY = parseInt(realChangeY) + parseInt(offsetY);
			        		$('#'+squareId).css({left: nrealChangeX+'px', top: nrealChangeY+'px'});
				        });
	            	}
	            } else {
	            	if (e.pageX == clickX && e.pageY == clickY) {
						return false;
					}
					$('#scroom-modal').modal();
	            }
	        },
	    });

	    var scrollImage = function(e) {
	    	disablePageScroll(id);
	        var changeX   = (clickX - e.pageX);
	        var changeY   = (clickY - e.pageY);
	        var positions = $(imgClass).css('background-position').split(' ');
	        var positionX = positions[0].slice(0, -2);
	        var positionY = positions[1].slice(0, -2);
	        
	        if (positions[0] == '50%') {
	            positionX =  -width/2;
	            positionY =  -height/2;
	            $(imgClass).css('background-position', positionX+'px '+positionY+'px');
	        }
	        
	        var currentX = parseInt(positionX) + parseInt(changeX);
	        var currentY = parseInt(positionY) + parseInt(changeY);
	        
	        if (currentX > 0) {
	            currentX = 0;
	        }
	        if (currentY > 0) {
	            currentY = 0;
	        }

	        var maxScrollX = parseInt(width) - parseInt(divWidth);
	        var maxScrollY = parseInt(height) - parseInt(divHeight);
	        if (currentX < -maxScrollX) {
	            currentX = -maxScrollX;
	        }
	        if (currentY < -maxScrollY) {
	            currentY = -maxScrollY;
	        }

	        $(imgClass).css('background-position', currentX+'px '+currentY+'px');

		    realChangeX = parseInt(currentX) - parseInt(actX);
		    realChangeY = parseInt(currentY) - parseInt(actY);
	    }

	    if(typeof n != 'undefined'){
	    	boxes = n.boxes;
		}
	    $(boxes).each(function(){
			appendBox(this, imgClass);
		});


	    $(imgClass).bind('mousewheel', function(e){
	        var transform = $(this).css('transform').split('(');
	        transform = transform[1].split(', ');
	        var transformX = parseFloat(transform[0]);
	        var transformY = parseFloat(transform[3]);
	        if(e.originalEvent.wheelDelta /120 > 0) {
	            transformX = transformX + 0.2;
	            transformY = transformY + 0.2;
	            $(this).css('transform', 'scale('+transformX+','+transformY+')');
	        } else{
	            transformX = transformX - 0.2;
	            transformY = transformY - 0.2;
	            if (transformX < 1) {
	                transformX = 1;
	            }
	            if (transformY < 1) {
	                transformY = 1;
	            }
	            $(this).css('transform', 'scale('+transformX+','+transformY+')');
	        }
	    });

    	$('#'+id+' #scroom-modal button.close').click(function(e){
    		$(imgClass+' .scroom-square').last().remove();
    	});

    	$('#'+id+' #scroom-form').submit(function () {
    		$.ajax({
    			type: "POST",
     			url: '',
     			data: $('#'+id+' #scroom-form').serialize(),
     			success: function() {

     			}
			});
			$('#'+id+' #scroom-modal').modal('hide');
			return false;
		});

	    $('#'+id+' .scroom-options .scroom-area').click(function(){
	        var selection = $(this).attr('selection');
	        if (selection == 'disabled') {
	            $(this).attr('selection', 'enabled');
	            selectArea = true;
	            selectAreaClicked = true;
	        } else {
	            $(this).attr('selection', 'disabled');
	            selectArea = false;
	        }
	    });

	}

	$.fn.scrollZoom.pointer = function(select, type, imgClass) {
	    if (select && type == 'area') {
	        $(imgClass).css('cursor', 'crosshair');
	    } else {
	        $(imgClass).css('cursor', 'move');
	    }

	};

	$.fn.scrollZoom.draw = function(initX, initY, finalX, finalY, imgClass, first, blockLeft, blockTop, actX, actY) {
		var squareWidth = finalX - initX;
		var squareHeight = finalY - initY;
		initX = initX - blockLeft;
		initY = initY - blockTop;

		if (first) {
			$(imgClass).append('<div class="scroom-square" id="square-'+initX+'-'+initY+'" positionx="'+actX+'" positiony="'+actY+'" style="left:'+initX+'px; top:'+initY+'px; width:'+squareWidth+'px; height:'+squareHeight+'px;"></div>');
		}

		$(imgClass+' .scroom-square#square-'+initX+'-'+initY).css({width: squareWidth+'px', height: squareHeight+'px'});

	};

	$.fn.scrollZoom.remove = function(id) {
		if ($('#'+id).length > 0) {
			var response = confirm("Would you like to delete this selected area!");
			if (response == true) {
			    $('#'+id).remove();
			}
		}
	};

	function appendBox(boxData, imgClass) {
		$(imgClass).append('<div class="scroom-square" id="'+boxData.id+'" positionx="'+boxData.left+'" positiony="'+boxData.top+'" style="left:'+boxData.left+'px; top:'+boxData.top+'px; width:'+boxData.width+'px; height:'+boxData.height+'px;"></div>');
	}

	function saveBox() {

	}

	function disablePageScroll(id) {
		$('#'+id).on('scroll touchmove mousewheel', function(e){
  			e.preventDefault();
  			e.stopPropagation();
  			return false;
		});
	}

})(jQuery);