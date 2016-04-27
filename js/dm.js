$(document).ready(function(){
	// alert("message");
	var get_messages_url="http://54.249.95.206/iems5722/danmu?chatroom_id=2&timestamp=";
	var message_q=[];
	var last_timestamp;
	var d= new Date();
	var current_time=d.getTime();
	last_timestamp=parseInt(current_time/1000)-145;
	// var current_time=8888;
	// console.log(current_time);

	

	function get_messages () {
		
		
		
		// console.log(current_time);
		// get_messages_url+=last_timestamp;
		$.get(get_messages_url+last_timestamp,function (data,status) {
			console.log(get_messages_url+last_timestamp);
			console.log(data.data);
			// message_q.shift(data);
			// if(status=="OK"){
				// console.log(data.data);
				var len=data.data.length;
				if(len==0)	
				{
					console.log("no data received");
					return;
				}
				for(var i=0;i<len;i++){
					message_q.push(data.data[i]);
					console.log(data.data[i]);
					if(i==len-1){
						last_timestamp=data.time;
						console.log(data.time);
					}
				}
			
		}).fail(function () {
			console.log("get messages failed");
		});
	}

	function create_dm_item () {

		if(message_q.length>0){
			var message=message_q.shift();
		console.log("current message is :"+message);

		var random_p=150*Math.random();
		var div_item=$('<div></div>');
		var position_start_y=random_p+"px";
		div_item.addClass('dm_item');
		div_item.html(message);
		div_item.css('top',position_start_y)
		$('.dm_show_area').append(div_item);
		div_item.addClass('dm_item_move');
		div_item.on('oanimationend animationend webkitAnimationEnd',div_item, function(event) { 
			event.data.remove();
		}); 
	}
		else {
			console.log("no data in the message list");
		}
		
		
	}

	get_messages();
	setInterval(get_messages, 5000);

	setInterval(create_dm_item, 800);

	// div_item.animate({
	// 	left:'250px',
 //    	opacity:'0.5',
 //    	height:'150px',
 //    	width:'150px'
	// },10000,function () {
	// 	 /* body... */ 
	// });
});