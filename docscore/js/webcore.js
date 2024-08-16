
$(document).ready(function () {

	$('.testimonial-slider').slick({
		slidesToShow: 1,
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000
	});

	//  Count Up
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

});


function renderpart(uri, el) {

    
    loadjsnm(uri, NavPage, this, 'inpage',el)


}