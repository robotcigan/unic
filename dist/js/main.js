'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageLoad = function () {
  function ImageLoad($wrapper) {
    _classCallCheck(this, ImageLoad);

    // console.log($wrapper)

    this.wrapper = $wrapper;
    this.width = $wrapper.width();
    this.height = $wrapper.height();
    this.src = $wrapper.data('src');
    this.displacementFilterScale = 50 + Math.random() * 1000;

    console.log('width', this.width, 'height', this.height);

    this.app = new PIXI.Application(this.width, this.height, { transparent: true });
    // document.body.appendChild(app.view);
    this.wrapper.append(this.app.view);
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.load(this.startAnimation.bind(this));
  }

  _createClass(ImageLoad, [{
    key: 'load',
    value: function load(afterLoad) {
      var tmpImg = new Image();
      tmpImg.src = this.src;
      tmpImg.onload = function () {
        afterLoad();
      };
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      var that = this;
      this.bg = PIXI.Sprite.fromImage(that.src);
      this.bg.width = this.width;
      this.bg.height = this.height;
      this.bg.position.x = 0;
      this.bg.position.y = 0;
      this.container.addChild(this.bg);

      this.displacementSprite = PIXI.Sprite.fromImage('img/displacement.jpg');
      this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

      this.displacementFilter.scale.set(this.displacementFilterScale);
      this.displacementSprite.scale.set(0.4 + 0.6 * Math.random());
      this.app.stage.addChild(this.displacementSprite);
      this.container.filters = [this.displacementFilter];
      this.hover();
    }
  }, {
    key: 'hover',
    value: function hover() {
      // let that = this;
      // this.wrapper.on('mouseenter', function() {
      //   let tl = new TimelineMax();
      //   tl.to(that.displacementFilter.scale, 1, {x:1, y: 1});
      // })
      var that = this;
      $('.weird-hover__title').on('mouseenter', function () {
        var tl = new TimelineMax();
        tl.to(that.displacementFilter.scale, .3, { x: 1, y: 1 });
      });
      $('.weird-hover__title').on('mouseleave', function () {
        var tl = new TimelineMax();
        tl.to(that.displacementFilter.scale, .3, { x: that.displacementFilterScale, y: that.displacementFilterScale });
      });
    }
  }]);

  return ImageLoad;
}();

$('.js-loadme').each(function (index, el) {
  var img = new ImageLoad($(el));
});

// let cursor = $('.cursor');
$(window).on('mousemove', function (e) {
  $('.weird-hover__img').css({
    left: e.clientX - 4,
    top: e.clientY - 4
  });
});

var cursor = $('.cursor');
$(window).on('mousemove', function (e) {
  cursor.css({
    left: e.clientX - 4,
    top: e.clientY - 4
  });
});
$('.btn, a').on('mouseenter', function () {
  cursor.addClass('cursor__active');
});
$('.btn, a').on('mouseleave', function () {
  cursor.removeClass('cursor__active');
});

// let app = new PIXI.Application(300, 300, {backgroundColor: 0x000000});
// document.body.appendChild(app.view);

// let container = new PIXI.Container();
// app.stage.addChild(container);

// let bg = PIXI.Sprite.fromImage('img/1.png');
// bg.width = 300;
// bg.height = 300;
// bg.position.x = 0;
// bg.position.y = 0;
// container.addChild(bg);

// let displacementSprite = PIXI.Sprite.fromImage('img/displacement.jpg');
// let displacementFilter = new PIXI.filters.DisplacementFilter(
//   displacementSprite
// );

// displacementFilter.scale.set(10000);
// app.stage.addChild(displacementSprite);
// container.filters = [displacementFilter];

// $('body').on('click', () => {
//   let tl = new TimelineMax();
//   tl.to(displacementFilter.scale, 1, {x: 0, y: 0});
// });