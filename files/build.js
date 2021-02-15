var init_anounces, init_bg, init_footer, init_slider;

window.after = function(ms, callback) {
  return setTimeout(callback, ms);
};

init_bg = function() {
  return $('.slider-block, .news-image').each(function() {
    var img;
    img = $(this).find('img').attr('src');
    $(this).find('img').remove();
    return $(this).css('background-image', 'url(' + img + ')');
  });
};

init_anounces = function() {
  return $('.news').each(function() {
    var $items, i, j, min_h, ref, results;
    $items = $(this).children();
    results = [];
    for (i = j = 0, ref = Math.ceil($items.children().length / 3); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      min_h = Math.max(Math.max($items.eq(i * 3).height(), $items.eq(i * 3 + 1).height()), $items.eq(i * 3 + 2).height());
      $items.eq(i * 3).height(min_h);
      $items.eq(i * 3 + 1).height(min_h);
      results.push($items.eq(i * 3 + 2).height(min_h));
    }
    return results;
  });
};

init_footer = function() {
  $('.footer-submenu dd').each(function() {
    return $(this).find('a[target="_blank"]').addClass('is-external');
  });
  return $('.footer-submenu dl').each(function() {
    var $list, $more;
    $list = $(this);
    if ($list.children('.is-hidden').length > 1) {
      $list.append('<dd><span class="footer-more"></span>');
      $more = $list.find('.footer-more');
      return $more.on('click', function() {
        $more.remove();
        return $list.children('.is-hidden').removeClass('is-hidden');
      });
    } else if ($list.children('.is-hidden').length > 0) {
      return $list.children('.is-hidden').removeClass('is-hidden');
    }
  });
};

init_bx = function(automotive) {
  $('.bxslider').bxSlider({ 
    captions: true, 
    controls: true,
    minSlides: 3,
    maxSlides: 5,
    slideWidth: 262,
    slideMargin: 50
  });
};

init_slider = function(automotive) {
  return $('.slider').each(function() {
    var $block, $frames, $left, $pages, $paging, $right, $slider, i, j, ref;
    $block = $(this).children('.constrain');
    $slider = $block.find('.slider-frames');
    if ($slider.children().length !== 0) {
      $left = $('<span class="slider-arrow slider-arrow--left"></span>');
      $right = $('<span class="slider-arrow slider-arrow--right"></span>');
      $block.append($left);
      $block.append($right);
      $frames = $slider.children();
      $frames.addClass('is-right').first().addClass('is-active').removeClass('is-right');
      $paging = $('<div class="slider-paging">');
      $paging.appendTo($block);
      for (i = j = 0, ref = $frames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        $paging.append('<span class="slider-page"></span>');
      }
      $pages = $paging.children();
      $pages.first().addClass('is-active');
      $left.on('click', function(e) {
        var $cur, ind;
        ind = 0;
        $cur = $pages.parent().children('.is-active');
        if ($cur.nextAll().length > 0) {
          ind = $cur.prevAll().length + 1;
        }
        $pages.eq(ind).click();
        return false;
      });
      $right.on('click', function(e) {
        var $cur, ind;
        ind = $pages.length - 1;
        $cur = $pages.parent().children('.is-active');
        if ($cur.prevAll().length > 0) {
          ind = $cur.prevAll().length - 1;
        }
        $pages.eq(ind).click();
        return false;
      });
      $pages.on('click', function(e) {
        var $new, ind;
        $new = $(this);
        if (!$new.hasClass('is-active')) {
          $slider.prop('timing', 50);
          ind = $new.prevAll().length;
          $pages.removeClass('is-active');
          $new.addClass('is-active');
          $frames.removeClass('is-right is-left is-active');
          $frames.eq(ind).prevAll().addClass('is-left');
          $frames.eq(ind).nextAll().addClass('is-right');
          $frames.eq(ind).addClass('is-active');
        }
        return false;
      });
    }
    $slider.on('automotive', function(e) {
      var $cur, ind, tmr;
      tmr = parseInt($slider.prop('timing'));
      tmr--;
      if (tmr === 0) {
        ind = 0;
        $cur = $pages.parent().children('.is-active');
        if ($cur.nextAll().length > 0) {
          ind = $cur.prevAll().length + 1;
        }
        $pages.eq(ind).click();
        tmr = 50;
      }
      $slider.prop('timing', tmr);
      return after(100, function() {
        return $slider.trigger('automotive');
      });
    });
    $slider.on('mousemove', function(e) {
      return $slider.prop('timing', 50);
    });
    if (automotive) {
      $slider.prop('timing', 50);
      return $slider.trigger('automotive');
    }
  });
};

$(document).on('ready', function() {
//  init_slider(true);
  init_bx();
  init_bg();
  after(10, function() {
    return init_anounces();
  });
  return init_footer();
});
