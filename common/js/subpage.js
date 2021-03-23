const pageHeader = new Header();
const pageFooter = new Footer();

const subPage = (function () {
    const saDefaultMargin = 300;
    let saTriggerMargin = 0;
    let saTriggerHeight = 0;
    var saElementList;

    //  t: current time
    //  b: beginning value
    //  c: change in value
    function easeOutQuart(t, b, c) {
        return c * (1 - (--t)*t*t*t) + b;
    }

    const tl = function(element, duration, vars) {
        var from = Number((element.style.objectPosition.split(' ')[1]).split('%')[0]);
        var to = Number((vars.split(' ')[1]).split('%')[0]);
        var start = null;

        var step = function(timestamp) {
            if (!start) start = timestamp;

            var progress = timestamp - start;
            var p = easeOutQuart(progress/duration, from, to-from);
            element.style.objectPosition = '50% ' + p + '%';
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    // Scroll Animation (sa, 스크롤 애니메이션)
    const saFunc = function () {
        for (const element of saElementList) {
            if (!element.classList.contains('show')) {
                if (element.dataset.saMargin) {
                    saTriggerMargin = parseInt(element.dataset.saMargin);
                } else {
                    saTriggerMargin = saDefaultMargin;
                }

                if (element.dataset.saTrigger) {
                    saTriggerHeight = document.querySelector(element.dataset.saTrigger).getBoundingClientRect().top + saTriggerMargin;
                } else {
                    saTriggerHeight = element.getBoundingClientRect().top + saTriggerMargin;
                }

                if (window.innerHeight > saTriggerHeight) {
                    let delay = (element.dataset.saDelay) ? element.dataset.saDelay : 0;
                    setTimeout(function () {
                        element.classList.add('show');
                    }, delay);
                }
            }
        }
    }

    return {
        scrollEvt: function () {
            saElementList = document.querySelectorAll('.sa');
            window.addEventListener('scroll', saFunc);

            var heroImg = document.getElementById('hero-img');

            window.addEventListener('scroll', function() {
                var scrT = document.documentElement.scrollTop;
                var duration = 2000; // 10ms

                if (scrT == 0) {
                    tl(heroImg, duration, "50% 0%");
                }
                else if (scrT < 200) {
                    tl(heroImg, duration, "50% 20%");
                }
                else if (scrT < 400) {
                    tl(heroImg, duration, "50% 40%");
                }
                else if (scrT < 600) {
                    tl(heroImg, duration, "50% 60%");
                }
                else if (scrT < 800) {
                    tl(heroImg, duration, "50% 80%");
                }
                else if (scrT < 1000) {
                    tl(heroImg, duration, "50% 100%");
                }
                else {
                    // 
                }
            });
        }
    }
})();

window.addEventListener('load', function () {
    subPage.scrollEvt();

    pageHeader.mouseEvt();
    pageFooter.clickEvt();
})

// // Main JAVA Script

if (matchMedia("screen and (min-width: 982px)").matches) {

    // subpage menu click event
    var openSubMenu = false;
    function csrOpen() {
        if (openSubMenu) {
            document.getElementsByClassName('subpg_menu')[0].style = "height: 16px; overflow: hidden; transition: all 0.5s;";
            document.getElementsByClassName('subpg_csr_img')[0].style = "transform:rotate(0deg);";
            openSubMenu = false;
        }
        else {
            document.getElementsByClassName('subpg_menu')[0].style = "height: 300px; overflow:none; transition: all 0.5s;";
            document.getElementsByClassName('subpg_csr_img')[0].style = "transform:rotate(180deg);";
            openSubMenu = true;
        }
    }
}


// SNS link click event(완성)
var openSnsLink = false;
function snsOpen() {
    if (openSnsLink) {
        document.getElementsByClassName('subpg_shr')[0].style = "height: 22px; overflow: hidden; transition: all 0.5s;";
        openSnsLink = false;
    }
    else {
        document.getElementsByClassName('subpg_shr')[0].style = "height: 350px; overflow:none; transition: all 0.5s;";
        openSnsLink = true;
    }
}