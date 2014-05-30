// FORM Javascripts

$(document).ready(function(){
	
	$("#mc-embedded-subscribe-form").validate({
		
		debug: true,
		
		
		errorContainer: "#errorbox",
		errorLabelContainer: "#errorbox ul",
		wrapper: "li",
		
		errorClass: "f22_f-error",
		validClass: "f22_f-valid",
		
		rules :{
			FNAME : {
				minlength: 2,
				number: false
			},
			LNAME : { minlength: 2 }
		},
		messages: {
			FNAME: '<span class="f22_icon">r</span> Please enter your first name below',
			LNAME: '<span class="f22_icon">r</span> Please enter your last name below',
			EMAIL: {
				required: '<span class="f22_icon">r</span> Please enter your email address below',
				email: '<span class="f22_icon">r</span> Your email address must be in the format of name@domain.com'
			},
			'group[6781][4]': '<span class="f22_icon">r</span> Please agree to our terms and conditions'
		}
		
	});
	
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		radioClass: 'iradio_flat-blue'
	});
	
	$('input').on('ifChanged', function(ev){
		
		var i = $(this);
		
		console.log(i.valid());
		
	});
	
	$('input').bind('blur keyup', function(){
		
		var i = $(this);
		
		if (i.hasClass('f22_f-valid')){
			
			i.next().html('c');
			
		} else if (i.hasClass('f22_f-error')){
			
			i.next().html('r');
			
		}
		
	})
	
});