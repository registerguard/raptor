$(document).ready(function() {
	
	$('.cdbx').each(function(){
		
		var blacklist = [
			'cdbx',
			'color',
			'd-in-block'
		],
		$this = $(this),
		cls = '.' + $this.attr('class');
		
		$.each(blacklist, function(k, v){
			
			cls = cls.replace(blacklist[k], '');
			
		});
		
		console.log(1, cls);
		
		cls = cls.replace(/\s+/, '.');
		
		console.log(2, cls);
		
		$this.prepend('<input class="code" type="text" value="' + cls + '" size="' + cls.length + '" onclick="this.select();">')
		
	});
	
});