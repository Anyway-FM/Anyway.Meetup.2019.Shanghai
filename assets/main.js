
var stage = 1
var stage1Height = 700
var stage2Height = 700
var stage3Height = 600

var envelopeUpDistance = 50
var envelopeMiddleDistance = 10
var envelopeDownDistance = 30
var envelopeTilt =  55

window.onscroll = function(){
  // Stage 1
  if (window.scrollY <= stage1Height) {
    if (stage != 1) {
      anime({
        targets: '.envelope-top',
        rotateX: 0,
        duration: 30
      });
    }
    intoStage(1)
    var stage1Progress = window.scrollY / stage1Height

    //Package
    var packageTopRotate = Math.min( stage1Progress * 2 * 180, 180)
    var brightness = Math.max( 1 - stage1Progress * 2 * 0.8,0.2)
    // if (packageTopRotate > 90) {
    //   document.getElementById('package-top').style.zIndex = "0"
    // }
    // anime({
    //   targets: '.package-top',
    //   rotateX: packageTopRotate,
    //   filter: "brightness(" + brightness + ")",
    //   duration: 30
    // });

    //Envelope
    var envelopeMove = - stage1Progress * envelopeUpDistance
    var envelopeRotate = (1 - stage1Progress / 2) * envelopeTilt
    anime({
      targets: '.envelope',
      translateY: envelopeMove+"vh",
      rotate: envelopeRotate,
      duration: 30
    });
  }

  // Stage 2
  else if (window.scrollY  <= stage1Height + stage2Height) {
    intoStage(2)
    var stage2Progress = ( window.scrollY - stage1Height ) / stage2Height
    console.log(stage2Progress)
    // Envelope
    var envelopeMove = - envelopeUpDistance + stage2Progress * ( envelopeUpDistance + envelopeDownDistance)
    var envelopeRotate = (- stage2Progress / 2 + 0.5) * envelopeTilt
    var envelopeTopRotate = Math.pow( (stage2Progress - 0.2 ),0.4) * 180
    anime({
      targets: '.envelope',
      translateY: envelopeMove+"vh",
      rotate: envelopeRotate,
      duration: 30
    });
    anime({
      targets: '.envelope-top',
      rotateX: envelopeTopRotate,
      duration: 30
    });
    if (envelopeTopRotate > 90) {
      document.getElementById('envelope-top').style.zIndex = "2"
    }
    else {
      document.getElementById('envelope-top').style.zIndex = "7"
    }
    if (stage2Progress > 0.8) {
      document.getElementById('letter').style.zIndex = "5"
      document.getElementById('envelope-cover').style.zIndex = "6"
      document.getElementById('envelope-bg').style.zIndex = "4"
      anime({
        targets: '.letter',
        rotate: 75,
        translateX:  "-8vh",
        duration: 900
      });
      document.getElementById('letter').dataset.open = 1
    }
    else {
      document.getElementById('letter').style.zIndex = "5"
      document.getElementById('envelope-cover').style.zIndex = "6"
      document.getElementById('envelope-bg').style.zIndex = "4"
      document.getElementById('letter').dataset.open = 0
      anime({
        targets: '.letter',
        rotate: 90,
        translateX:  "0",
        duration: 30
      });
    }

  }

  // Stage 3
  else if (window.scrollY  <= ( stage1Height + stage2Height + stage3Height) ) {
    anime({
      targets: '.envelope',
      translateY: envelopeDownDistance +"vh",
      rotate: 0,
      duration: 30
    });
    intoStage(3)

  }

  // Stage 4
  // else {
  //   intoStage(4)
  // }
}

function intoStage(n){
  // console.log("在第 "+n+" 阶段")
  document.getElementById('main').dataset.stage = n
  stage = n
}

function openLetter(){
  anime({
    targets: '.envelope',
    translateY: "50vh",
    rotate: 0,
    duration: 600,
    easing: 'easeOutQuart'
  });
  if (stage != 4) {
    intoStage(4)
  }

}
