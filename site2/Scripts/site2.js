﻿
var screenHeight = $(window).height();
var multiplier = Math.floor(screenHeight / 20);
var numberofPhotots = 84;
var numberPhotoTransition = 10;
var videoTransitionOffset = 10;
var opacityAllSetFlag = false;
var picLayerCount = 5;

// for scroll
var lastEnvelopeFrame;
var videoTransitionFrame;
var videoTransitionEndFrame;

var textClearZoneTop;
var textClearZoneBottom;
var textClearRange;

var textFloatingEnd;
var textDivTravelDistance;

var textDivOriginalTop;

$(document).ready(function () {
    $("#MdlSpinner1").show();
    preloadImage();
    $(".header-pic-container").height(screenHeight * 6);
    var backgroundval = "url('./media/envelopes7/envelope-1.jpg') center / cover";
    $(".layout-header-pic").css("background", backgroundval);


});

$(window).load(function () {
    $(window).scrollTop(0);
    $("#MainContent").fadeIn(1000);
    $("#MdlSpinner1").hide();
    setParameters();
});

$(window).resize(function () {
    $(window).scrollTop(0);
    screenHeight = $(window).height();
    multiplier = Math.floor(screenHeight / 20);
    numberofPhotots = 84;
    numberPhotoTransition = 10;
    videoTransitionOffset = 10;
    opacityAllSetFlag = false;
    picLayerCount = 5;

    setParameters();
});

function setParameters() {
    // for scroll
    lastEnvelopeFrame = (numberofPhotots) * multiplier - 1;
    videoTransitionFrame = ((numberofPhotots - numberPhotoTransition - videoTransitionOffset) * multiplier - 1);
    videoTransitionEndFrame = ((numberofPhotots - videoTransitionOffset) * multiplier - 1);

    textClearZoneTop = screenHeight * 0.6;
    textClearZoneBottom = screenHeight * 0.7;
    textFloatingEnd = videoTransitionFrame - 10 * multiplier;
    textClearRange = multiplier * 2.5;
    textDivTravelDistance = $(".cover-text-container").height() / 1;
    textDivOriginalTop = $(".cover-text-container").offset().top;
    console.log(textDivTravelDistance);
}



$(window).scroll(function () {
    var offset = $(window).scrollTop();
    var num = Math.floor(offset / multiplier) + 1;

    var textDivMoveVal = (offset / textFloatingEnd) * textDivTravelDistance;
    if (textDivMoveVal >= 0) {
        $(".cover-text-container").offset({ top: (textDivOriginalTop + offset - textDivMoveVal) });
    }


    if (offset <= lastEnvelopeFrame) {

        if (offset <= textFloatingEnd) {
            $(".cover-text-word").each(function () {
                var textTop = ($(this).offset().top - offset);
                console.log(textTop + " " + textClearZoneTop + " " + textClearZoneBottom);
                if (textTop < textClearZoneTop) {
                    $(this).css('opacity', (textTop - (textClearZoneTop - textClearRange)) / (textClearRange));
                } else if (textTop > textClearZoneBottom) {
                    $(this).css('opacity', ((textClearZoneBottom + textClearRange) - textTop) / (textClearRange));
                } else {
                    $(this).css('opacity', 1);
                }
            });
        }

        if (offset <= videoTransitionFrame) {
            $("#VideoDiv").css("opacity", 0);
        } else if (offset > videoTransitionEndFrame) {
            $("#VideoDiv").css("opacity", 1);
        } else {
            var photoRemain = numberofPhotots - videoTransitionOffset - num;
            $("#VideoDiv").css("opacity", 1 - photoRemain / 10);
        }

        for (var i = 1; i <= picLayerCount ; i++) {
            var actualpos = (num - (picLayerCount - i)) < 1 ? 1 : (num - (picLayerCount - i));
            var backgroundval = "url('./media/envelopes7/envelope-" + actualpos + ".jpg') center / cover";
            $("#pic-" + i).css("background", backgroundval);
        }

    }

});

function preloadImage(url) {
    for (var i = 1; i <= numberofPhotots; i++) {

        var url = "./media/envelopes7/envelope-" + i + ".jpg";

        var img = new Image();
        img.src = url;

    }
}