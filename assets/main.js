
var stage = 1
var stage1Height = 700
var stage2Height = 700
var stage3Height = 600

var envelopeUpDistance = 60
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
    var packageTopRotate = - stage1Progress * 180
    var brightness = 0.3 + stage1Progress * 0.7
    anime({
      targets: '.package-top',
      rotateX: packageTopRotate,
      filter: "brightness(" + brightness + ")",
      duration: 30
    });

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
    if (stage2Progress > 0.8) {
      document.getElementById('envelope-top').style.zIndex = "6"
      anime({
        targets: '.letter',
        rotate: 90,
        translateX:  "-8vh",
        duration: 130
      });

    }
    else {
      document.getElementById('envelope-top').style.zIndex = "13"
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
  console.log("在第 "+n+" 阶段")
  document.getElementById('main').dataset.stage = n
  stage = n
}

function openLetter(){
  console.log("★")
  anime({
    targets: '.envelope',
    translateY: envelopeDownDistance +"vh",
    rotate: 0,
    duration: 30
  });
  if (stage != 4) {
    intoStage(4)
  }

}
