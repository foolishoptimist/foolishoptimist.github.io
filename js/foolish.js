
function myRand(minRand,maxRand)
{
	return Math.round(Math.random() * (maxRand-minRand) + minRand);
}
var NUM_GROUPS = 10;
var TRANSITION_DUR = 500
var particles = {};
	
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
		$('#title2').animate({'left': '-=10%','opacity':1}, 2000);
	},1500);

	//GENERATE STAR FIELD
	var num_stars = Math.min(Math.round(screen.availWidth/5),200);
	num_stars = 150;
	
	
	//No Stars for Mobile platforms
	if (screen.availWidth <= 400) 
	{
		NUM_GROUPS = 5;
		num_stars = 0;
		twinkle = function(){ };
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
		var h = myRand(0,80);
		var w = myRand(0,100);
		var alpha = Math.random() + 0.3//--minAlpha
		$(this).css({'opacity':alpha,'left':'+'+w+'%','top':h+'%'});
	})
	
	//Opening Page Transition - twinkle stars - fade in options
	//setTimeout(function(){ twinkle();/*$('#screen').fadeIn(2000);*/ },4000);
	setTimeout(function(){ twinkle();/*$('#screen').fadeIn(2000);*/ },400);
	
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
} )


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




//Star Animation Functions
function twinkle()
{
	for (var i=1;i<=NUM_GROUPS;i++)
	{
		twinkleUp(i,1);	
	}
}

function twinkleUp(i,optAlpha)
{
	if(!optAlpha){optAlpha = 0;}
	alpha = 0.6+optAlpha;
	$('.star'+i).animate({'opacity':'+='+alpha},1000);
	setTimeout(function(){ twinkleDown(i) },myRand(1000,3000));
}

function twinkleDown(i)
{
	$('.star'+i).animate({'opacity':'-=0.6'},1000);
	setTimeout(function(){ twinkleUp(i) },myRand(1000,3000));
}