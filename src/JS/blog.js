// INITIALIZATION ********************************

// pre-nav dimensions *********
function nNavigate() {
  var nA = $(window).height() / 2;
  nB = $(window).width() / 2;
  nRadius = Math.sqrt(nA * nA + nB * nB);
  nDiameter = 2 * nRadius;

  $("#Navigate").css({
    width: nDiameter,
    height: nDiameter,
    "margin-top": -nRadius,
    "margin-left": -nRadius,
  });
}
nNavigate();

// pre-nav onload *********
$(window).on("load", function () {
  // preload
  $("#Preloader").delay(500).fadeOut(2000);

  // loadfade
  setTimeout(function () {
    $(".loadfade").css({ opacity: "1" });
  }, 1000);

  // navigate
  $(".navigate").click(function (e) {
    e.preventDefault();
    var href = $(this).attr("href");

    $("#Navigate").css({ transform: "scale(1)", opacity: "1" });
    $("#NavigateOverlay")
      .add("#LoaderContainer")
      .css({ display: "block" })
      .animate({ opacity: 1 }, 500);

    setTimeout(function () {
      window.location = href;
    }, 800);
  });

  // resize
  $(window).on("resize", function () {
    nNavigate();
  });
});

// PARTICLE ANIMATION *******************************
$(document).ready(function () {
  // initialization *********
  var canvas = document.getElementById("WelcomeParticles"),
    ctx = canvas.getContext("2d"),
    balls = [],
    lastTime = Date.now();

  // responsive canvas *********
  $(window)
    .on("resize", function () {
      canvas.width = $("#WelcomeParticles").width();
      canvas.height = $("#WelcomeParticles").height();
    })
    .resize();

  // loop *********
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
  }

  // ball *********
  function Ball(startX, startY, startVelX, startVelY) {
    // position
    this.x = startX || Math.random() * canvas.width;
    this.y = startY || Math.random() * canvas.height;

    // velocity
    this.vel = {
      x: startVelX || Math.random() - 0.5,
      y: startVelY || Math.random() - 0.5,
    };

    // radius
    this.radius = (Math.random() + 1.1) * 2.5;

    // update
    this.update = function (canvas) {
      // reverse direction
      if (this.x > canvas.width + 50 || this.x < -50) {
        this.vel.x = -this.vel.x;
      }
      if (this.y > canvas.height + 50 || this.y < -50) {
        this.vel.y = -this.vel.y;
      }
      // update pos via vel
      this.x += this.vel.x;
      this.y += this.vel.y;
    };

    // draw
    this.draw = function (ctx) {
      ctx.beginPath();
      // alpha - transparency
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";
      ctx.globalCompositeOperation = "destination-over";
      // ( x-coord, y-coord, radius, iAngle, fAngle, counterclockwise )
      ctx.arc(0.5 + this.x, 0.5 + this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    };
  }

  // ball array *********
  for (var i = 0; i < canvas.width * (canvas.height / (180 * 180)); i++) {
    // quantity based upon canvas dimensions
    balls.push(
      new Ball(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }

  // update *********
  function update() {
    var diff = Date.now() - lastTime;
    for (var frame = 0; frame * 16.6667 < diff; frame++) {
      for (var index = 0; index < balls.length; index++) {
        balls[index].update(canvas);
      }
    }
    lastTime = Date.now();
  }

  // draw *********
  function draw() {
    ctx.fillStyle = "transparent";
    // ( startX, startY, width, height )
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // initial circle selection
    for (var indexOne = 0; indexOne < balls.length; indexOne++) {
      var ballOne = balls[indexOne];
      ballOne.draw(ctx);
      ctx.beginPath();
      // subsequent circle selection and segment manipulation
      for (var indexTwo = balls.length - 1; indexTwo > indexOne; indexTwo--) {
        var ballTwo = balls[indexTwo],
          // square root with respect to sum of squared args thus distance
          dist = Math.hypot(ballOne.x - ballTwo.x, ballOne.y - ballTwo.y);
        if (dist < 150) {
          ctx.strokeStyle = "white";
          // decrease alpha as distance increases
          ctx.globalAlpha = 1 - dist / 150;
          // segment initial pos
          ctx.moveTo(0.5 + ballOne.x, 0.5 + ballOne.y);
          // segment final pos
          ctx.lineTo(0.5 + ballTwo.x, 0.5 + ballTwo.y);
        }
      }
      // visualize defined path
      ctx.stroke();
    }
  }

  // commence *********
  loop();
});

// ANIMATION ELEMENT ********************************
$(document).ready(function () {
  // resize listener *********
  $(window)
    .on("resize", function () {
      // width & height
      $(".parallax-element.width, .parallax-element.height").each(function () {
        $(this).removeAttr("style");

        if ($(this).hasClass("width")) {
          $(this).attr("data-distance", $(this).width());
        } else {
          $(this).attr("data-distance", $(this).height());
        }
      });
    })
    .resize();

  // scroll listener *********
  $(window)
    .on("scroll", function () {
      $(".animation-element, .parallax-element").each(function () {
        var elem = $(this),
          windowTop = $(window).scrollTop(),
          windowBottom = windowTop + $(window).height(),
          elementTop = elem.offset().top,
          elementBottom = elementTop + elem.height();

        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          // general
          if (elem.hasClass("animation-element")) {
            $(".animation" + elem.attr("data-num")).addClass("in-view");
          }

          // parallax
          if (elem.hasClass("parallax-element")) {
            var scrollDistance = windowBottom - elementTop,
              percent = scrollDistance / ($(window).height() + elem.height());

            if (elem.hasClass("welcome-parallax")) {
              scrollDistance = windowTop;
              percent = scrollDistance / elem.height();
            }

            var distance = percent * elem.attr("data-distance"),
              opacityShow = percent * 2.5,
              opacityHide = 1 - percent / elem.attr("data-opacityRate"),
              rotate = 360 * percent;

            if (elem.hasClass("down")) {
              elem.css({ transform: "translate(0px," + distance + "px)" });
            }
            if (elem.hasClass("up")) {
              elem.css({ transform: "translate(0px," + -distance + "px)" });
            }
            if (elem.hasClass("right")) {
              elem.css({ transform: "translate(" + distance + "px, 0px" });
            }
            if (elem.hasClass("left")) {
              elem.css({ transform: "translate(" + -distance + "px, 0px" });
            }
            if (elem.hasClass("opacityShow")) {
              elem.css({ opacity: opacityShow });
            }
            if (elem.hasClass("opacityHide")) {
              elem.css({ opacity: opacityHide });
            }
            if (elem.hasClass("rotate")) {
              elem.css({ transform: "rotate(" + rotate + "deg)" });
            }
            if (elem.hasClass("width")) {
              elem.css({ width: distance });
            }
            if (elem.hasClass("height")) {
              elem.css({ height: distance });
            }
          }
        }
      });
    })
    .scroll();
});
