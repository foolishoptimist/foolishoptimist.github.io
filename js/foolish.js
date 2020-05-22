
function myRand(minRand,maxRand)
{
	return Math.round(Math.random() * (maxRand-minRand) + minRand);
}
var NUM_GROUPS = 30;
var TRANSITION_DUR = 500
var particles = [];
	
$(document).ready(function() {
	//INIT ELEMENTS
	$('#screen').fadeOut(0);
	//$('.title').animate({'left': '+=40%','opacity':0},0);
	$('.title').animate({'opacity':0},0);
	$('#title2').animate({'left': '+=10%'},0);
	var selected = null;
	
	
	// ANIMATE TITLE
	$('#title1').animate({'opacity':1}, 2000);
	//Delay Title2 Animation
	setTimeout(function(){
		$('#title2').animate({'left': '-=10%','opacity':1}, 2000,'swing',fade_footer);
	},1500);

	initStars();
	
	moonRise();
	
	/*
	//Setup AJAX option click event
	$('.option').click(function(){
		if ($(this).attr('id') != selected)
		{
			selected = $(this).attr('id');
			transitionContent(selected);
		}
		return false;
	})
	
	//display selected option
	if(window.location.hash != '')
	{
		//$('#'+window.location.hash.substring(1)).click();
	}else
	{
		//$('#about').click();
	}
	*/
} );


function transitionContent(hash)
{
	$('#content').fadeOut(250,function(){ loadContent(hash,function(){ $('#content').fadeIn(TRANSITION_DUR)}); });
}

function transitionLite(hash)
{
	loadContent(hash)
}

function loadContent(hash,callback)
{
	$('#option-content').load('content.php?content=' + hash,function(){ setTimeout(callback,100);});
	$('.option').removeClass('selected');
	$('#' + hash ).addClass('selected');
}

//Idle fadeout title
function fade_footer(){
	var last_move = new Date().getTime();
	$('html').mousemove(function(){
		last_move = new Date().getTime();
		$('#footer').stop().fadeIn(500);
	});
	setInterval(function(){
		var now = new Date().getTime();
		if(now > (last_move + 10000)){
			$('#footer').fadeOut(3000);
		}
	},1000);
}




function initStars(){	
	//GENERATE STAR FIELD
	var num_stars = Math.round((screen.availWidth+screen.availHeight)/16);
	
	//No Stars for Mobile platforms
	if (screen.availWidth <= 340)
	{
		transitionContent = transitionLite
	}
	
	var group_count = 0;
	for (var i=0;i<num_stars;i++)
	{
		group_count++;
		if (group_count > NUM_GROUPS)
		{
			group_count = 1;
		}
		$('#background').append('<img src="images/pixel.png" class="star star'+group_count+'" />');
	}
	//Position Stars
	$('.star').each(function(){
		var h = myRand(0,90);//Stars fill top 90% of screen only
		var w = myRand(0,100);
		$(this).css({'left':'+'+w+'%','top':h+'%'});
	})
  
  twinkle();

}

//Star Animation Functions
function twinkle(){
  var interval;
  var min_opacity;
  var max_opacity;
  var style = "";
  for (var i=1;i<=NUM_GROUPS;i++){
    interval = myRand(5,9);
    min_opacity = myRand(2,5)/10;
    max_opacity = min_opacity + 1.6;
    style+="@keyframes pulse"+i+" {" +
          "50% { opacity: "+max_opacity+"; }"+
      "}"+

      ".star"+i+" {"+
          "opacity: "+min_opacity+";"+
          "-webkit-animation: pulse"+i+" "+interval+"s infinite ease-in-out;"+
          "-o-animation: pulse"+i+" "+interval+"s infinite ease-in-out;"+
          "-ms-animation: pulse"+i+" "+interval+"s infinite ease-in-out; "+
          "-moz-animation: pulse"+i+" "+interval+"s infinite ease-in-out; "+
          "animation: pulse"+i+" "+interval+"s infinite ease-in-out;"+
          "animation-delay: "+interval+"s;"+
      "}";
  }
  $('head').append("<style id='starAnim'>"+style+"</style>");
}


function moonRise(){
	var moon_anim_dur = 50;
	var	x = 80;
  
  var style=""+
  "@keyframes rise {" +
          "100% { top: -50%; transform: scale(0.3); }"+
      "}"+
  ".moon {"+
    "top: 250%;"+
    "left: "+x+"%;"+ 
    "scale: 2;"+
    ""+ 
    
    "-webkit-animation: rise "+moon_anim_dur+"s infinite linear;"+
    "-o-animation: rise "+moon_anim_dur+"s infinite linear;"+
    "-ms-animation: rise "+moon_anim_dur+"s infinite linear; "+
    "-moz-animation: rise "+moon_anim_dur+"s infinite linear; "+
    "animation: rise "+moon_anim_dur+"s infinite linear;"+ 
  "}"+ 
  ".moon .glow {"+
    "opacity: 0.8;"+
  "}";
  
  $('head').append("<style id='moonAnim'>"+style+"</style>");
  
  
  return;

}