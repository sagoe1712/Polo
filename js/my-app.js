// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: true
});


// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});


						


				
$$(document).on('pageInit', function(e){
	$(".swipebox").swipebox();
	
	
	var polotoken = localStorage.polotoken;
	
		$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listprofile",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
													//	alert(msg.data.memberid);
														var firstname1 = msg.data.firstname;
														var lastname1 = msg.data.lastname;
														$('.person-name').html(msg.data.firstname+" "+msg.data.lastname);
														
														$('.first-letter').html(firstname1.charAt(0).toUpperCase()+lastname1.charAt(0).toUpperCase());
														$('.index-mem-no').html(msg.data.memberid);
														$('.index-curr-bal').html(msg.data.currentbalance);
														 $('.index-block-points').html(msg.data.blockedpoints);
														$('.index-auction-bid').html();
														$('.index-total-pur').html(msg.data.totalredeem);
														$('.index-points-received').html(msg.data.totalredeem);
														$('.index-points-expired').html(msg.data.totalredeem);

													} else if (msg.status ==2003){
														alert("You are currently not logged in or session has expired");
														window.location.replace('index.html');
														window.location="index.html";
													}
					else{
						alert(msg);
					}
												
				}
		});
	
			$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});
		

		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});
        

	$("a.switcher").bind("click", function(e){
		e.preventDefault();
		
		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');
		
		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}
			
			else if(theid == "view12") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			} 
			else if(theid == "view11") {
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			} 
			
		}

	});	
	
	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);
	
	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);
	
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,
	
		elem = elem || elem.querySelector(elem);
	
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
	
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
		
})

$('#drpcountry').change( function(){
	
	var countryid = $('#drpcountry').val();
	var polotoken = localStorage.polotoken;
	
	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getstate",
			data:{token:polotoken, countryid:countryid},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														$("#drpstate").html("<option>Select A State</option>");
															 $.each(msg.data, function(key,value)
                            {
														$("#drpstate").append("<option value='"+stateid+"'>"+name+"</option>");
														});
												
													} else{
													alert(msg);
													}
												
				}
		});
	
});



$$(document).on('pageInit', '.page[data-page="index"]', function (e) {
var polotoken = localStorage.polotoken;
	//var polotoken ="5cfb0ca560123953c3112370bd80463f";
	alert("Index page opened");
		$.ajax({
			//alert("respond1");
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listprofile",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														var firstname1 = msg.data.firstname;
														var lastname1 = msg.data.lastname;
														$('.person-name').html(msg.data.firstname+" "+msg.data.lastname);
														
														$('.first-letter').html(firstname1.charAt(0).toUpperCase()+lastname1.charAt(0).toUpperCase());
														$('.index-mem-no').html(msg.data.memberid);
														$('.index-curr-bal').html(msg.data.currentbalance);
														 $('.index-block-points').html(msg.data.blockedpoints);
														$('.index-auction-bid').html();
														$('.index-total-pur').html(msg.data.totalredeem);
														$('.index-points-received').html(msg.data.totalredeem);
														$('.index-points-expired').html(msg.data.totalredeem);

													} else if (msg.status ==2003){
														window.location.replace('index.html');
														window.location="index.html";
													}
												
				}
		});
	
});

$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {
var polotoken = localStorage.polotoken;
	var countryid = 1;
	
	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getstate",
			data:{token:polotoken, countryid:countryid},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														$("#drpstate").html("<option>Select A State</option>");
															 $.each(msg.data, function(key,value)
                            {
																
															
														$("#drpstate").append("<option value='"+value.stateid+"'>"+value.name+"</option>");
														});
												
													} else{
													alert(msg);
													}
												
				}
		});
		$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listprofile",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
													//	alert(msg.data.memberid);
														
														$('#txtfirstname').val(msg.data.firstname);
														$('#txtlastname').val(msg.data.lastname);
														$('#drpgender').val();
														$('#txtdob').val();
														$('#txtphone').val(msg.data.phoneno);
														$('#txtemail').val(msg.data.email);
														$('#drpcountry').val(msg.data.countryid);
														$('#drpstate').val(msg.data.stateid);
															$('#drpstate').select(msg.data.stateid);
														$('#txtaddress').val(msg.data.currentaddress);
														var stateid = msg.data.stateid;
														var city = msg.data.cityid;
															$('#cbxreceivecomm').val(msg.data.commsflag);
														$('#drpcommeth').val();
														
	
	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getcity",
			data:{token:polotoken, stateid:stateid},
    			dataType:"json",
    			success: function(msg){
    				
														$("#drpcity").html("<option>Select A City</option>");
															 $.each(msg.data, function(key,value)
                            {
														$("#drpcity").append("<option value='"+value.cityid+"'>"+value.name+"</option>");
																 	$('#drpcity').val(city);
														$('#drpcity').select(city);
														});
				}
			});
																		
													} else if (msg.status ==2003){
														alert("You are currently not logged in or session has expired");
														window.location.replace('index.html');
														window.location="index.html";
													}
												
				}
		});
	
	
$('#drpstate').change(function(){
	//alert("change");
	var stateid = $('#drpstate').val();
	var polotoken = localStorage.polotoken;
	
	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getcity",
			data:{token:polotoken, stateid:stateid},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														$("#drpcity").html("<option>Select A City</option>");
															 $.each(msg.data, function(key,value)
                            {
														$("#drpcity").append("<option value='"+value.stateid+"'>"+value.name+"</option>");
														});
												
													} else{
													alert(msg);
													}
												
				}
		});
	
});

});

$$(document).on('pageInit', '.page[data-page="transferpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
	var polotoken = localStorage.polotoken;
	$('#btn-transfer').hide();
		$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listprofile",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
													//	alert(msg.data.memberid);
														
														$('#payer-name').html(msg.data.firstname +" "+msg.data.lastname);
														$('#payer-mem-no').html(msg.data.memberid);
														$('payer-bal').html(msg.data.currentbalance)
													} else if (msg.status ==2003){
														alert("You are currently not logged in or session has expired");
														window.location.replace('index.html');
														window.location="index.html";
													}
												
				}
		});
	
	$('#payee-mem-no').blur(function(){
		var payee = $('#payee-mem-no').val();
		
		if (payee.length != 10){
			alert("Membership number is 10 digit");
			}
		
	});
	
	
	$('#payee-mem-no').keyup(function(){
		var payee = $('#payee-mem-no').val();
		
		if (payee.length == 10){
				$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getmember",
			data:{token:polotoken, transfer_to:payee},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
													$('#btn-transfer').show();
														$('#receiptant-name').html(msg.data.firstname+" "+msg.data.lastname);
														$('#receiptant-no').html(msg.data.memberid);
													}else{
													alert(msg.message);
													}
												
				}
		});
		}
	});
	
});

$$(document).on('pageInit', '.page[data-page="scanpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  myApp.alert('This is Scan page');
  
  $('#scan').click(function() {
					alert("Scan button was hit");
						 var scanner = cordova.plugins.barcodeScanner;

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        });
		return false;
					
				
});
});

$$(document).on('pageInit', '.page[data-page="statementpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  //myApp.alert('This is the statement page');
	
	var polotoken = localStorage.polotoken;
	
	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=statement",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														$("#statement-table").html("<tr><td>Date</td><td>Transaction Type</td><td>Description</td><td>Amount</td></tr>");
															 $.each(msg.data, function(key,value)
                            {
																 var amounta = value.gained_points;
																  var amountb = value.used_points;
																 var amount = parseFloat(amounta) + parseFloat(amountb);
																
														$("#statement-table").append("<tr><td>"+value.tran_date+"</td><td>"+value.tran_type+"</td><td>"+value.description+"</td><td>"+amount+"</td></td>");
																
														});
												
													} else{
													alert(msg);
													}
												
				}
		});
});


$$(document).on('pageInit', '.page[data-page="auctiondescpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  myApp.alert('This is the auction description page');
});

$$(document).on('pageInit', '.page[data-page="notificationpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
	var polotoken = localStorage.polotoken;

	
			$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listnotification",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
															 $.each(msg.data, function(key,value)
                            {
																 var date = value.create_date;
																 var dateObj = new Date(date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
																 var month = dateObj.getMonth(); //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
																
																 $('.posts').append('<li><div class="post_entry"><div class="post_date"><span class="day">'+day+'</span> <span class="month">'+month+'</span><span class="year">'+year+'</span></div><div class="post_title"><h2><a class="notifyopen" href="#" data-notify="'+value.notify_id+'" data-subject="'+value.tran_type+'" >'+value.tran_type+'.</a></h2></div><div class="view_more"><a href="#"><img src="images/icons/notify/delete.png" class="icon16"/></a></div></div></li>');
																
														});
												
													} else{
													alert(msg);
													}
												
				}
		});
	
	$('.notifyopen').click(function(){
		var notify_id = $(this).attr('data-notify');
		 window.localStorage.setItem('notify_id',notify_id);
			var subject = $(this).attr('data-subject');
		 window.localStorage.setItem('notify_subject',subject);
	window.location.replace('main.html#!/notification-open.html');
	window.location="main.html#!/notification-open.html";
		
	});
 
});

$$(document).on('pageInit', '.page[data-page="notification-open"]', function (e) {
	
	var polotoken = localStorage.polotoken;
	var notify_id = localStorage.notify_id;
		var subject = localStorage.notify_subject;
		$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=getnotification",
			data:{token:polotoken, notify_id:notify_id},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														$("#notify_subject").html(subject);
														$(".div-not-body").html(value.content);
														
													} else{
													alert(msg);
													}
												
				}
		});
	window.localStorage.removeItem("notify_id");
		window.localStorage.removeItem("notify_subject");
});

$$(document).on('pageInit', '.page[data-page="auctionpage"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
 // myApp.alert('This is the auction description page');
	
	
	var polotoken = localStorage.polotoken;
		

	
		$.ajax({
    			type:"POST",
			url:"https://demo.perxclm.com/mobile/api/v1/?api=listauction",
			data:{token:polotoken},
    			dataType:"json",
    			success: function(msg){
    				
													//alert(msg.status);
    												if (msg.status ==1001){
														
														 $.each(msg.data, function(key,value)
                            {
																
															 $(".page-auction").append('<div class="auction-itm"><div class="div-auction-img"><h3 class="auction-time">'+value.end_date+" "+value.end_time+'</h3><img src="'+value.image+'" class="max-img"/></div><div class="div-auction-itm-info"><br/><p class="auction-itm-name">'+value.item_name+'</p><div class="desc-box"><p>'+value.description+'</p><h3 class="auction-cost">Current Bid: <strong>'+value.current_bid+'</strong></h3><h3 class="auction-cost">Minimum Points to Bid: <strong>'+value.current_bid+'</strong></h3></div><table><tr><td width="50%"><input type="text" placeholder="Bid Amount" class="constant-ele-looks text-left"/></td><td width="50%"><button data-auctionid="'+value.auctionid+'" class="btn-add-to-cart"><img src="images/icons/auction/auction.png" class="btn-icon"/>BID</button></td></tr></table></div></div>');
																
														});
														
											
														
													} else{
													alert(msg);
													}
												
				}
		});
		
//$('.page-auction.auction-itm').on('.auction-desc','click',function(){
	$('.auction-desc').click(function(){
		alert("alert auction description link clicked");
		var auctionid = $(this).attr('data-auctionid');
		 window.localStorage.setItem('auctionid',auctionid);
			window.location.replace('main.html#!/auction-description.html');
	window.location="main.html#!/auction-description.html";
		
	});
	
});


