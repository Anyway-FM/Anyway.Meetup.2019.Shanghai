
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
        targets: '#envelope-top-1',
        rotateX: 0,
        duration: 30
      });
      anime({
        targets: '#envelope-top-2',
        rotateX: 0,
        duration: 30
      });
    }
    intoStage(1)
    var stage1Progress = window.scrollY / stage1Height

    //Package
    var packageTopRotate = Math.min( stage1Progress * 2 * 180, 180)
    var brightness = Math.max( 1 - stage1Progress * 2 * 0.8,0.2)

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
    var envelopeTopRotate = stage2Progress < 0.2 ? 0 : Math.pow( (stage2Progress - 0.2 ),0.4) * 180

    console.log(envelopeTopRotate)

    anime({
      targets: '.envelope',
      translateY: envelopeMove+"vh",
      rotate: envelopeRotate,
      duration: 30
    });

    if (envelopeTopRotate < 90) { // Stage 2 初段
      document.getElementById('envelope').dataset.sub = "1"
      var substage = 1
    }
    else if (stage2Progress > 0.8) { // Stage 2 末段
      document.getElementById('envelope').dataset.sub = "3"
      var substage = 3
    }
    else { // Stage 2 中段
      document.getElementById('envelope').dataset.sub = "2"
      var substage = 2
    }
    if (substage < 3 ) {
      anime({
        targets: '#envelope-top-1',
        rotateX: envelopeTopRotate,
        duration: 30
      });
      anime({
        targets: '#envelope-top-2',
        rotateX: envelopeTopRotate,
        duration: 30
      });
    }
    else {
      document.getElementById('envelope-top-2').style.transform = "rotateX(180deg)"
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
