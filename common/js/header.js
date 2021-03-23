// Header JAVA Script

function Header() {
    // var openState = false;
    var _windwoW;
    var _windowH;
    var _languageState = false;

    var getIndex = function (element) {
        for (var i = 0; i < element.parentNode.children.length; i++) {
            if (element.parentNode.children[i] === element) {
                return i;
            }
        }
    }
    // max-width: 982px까지의 GNB Event

    // Header 고정(resize event 추가 필요)
    function scrollEvent() {
        if (window.pageYOffset > 20) {
            document.getElementsByClassName('wrap')[0].style = "height: 91px; position:fixed;";
        }
        else {
            document.getElementsByClassName('wrap')[0].style = "height: 0px; position:fixed;";
        }
    }

    // max-width: 981px부터의 GNB Event

    // Mobile에서 Header 고정(아래로 스크롤하면 사라지고 위로 스크롤하면 다시 보이게 조정/ 라이브러리 사용) (완성)
    var onresize = function () {
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        if (width <= 981) {

            var lastScrollTop = 0;
            var delta = 5;
            var fixBox = document.querySelector('.m_menu_scroll');
            var fixBoxHeight = fixBox.offsetHeight;
            var didScroll;
            //스크롤 이벤트 
            window.onscroll = function (e) {
                didScroll = true;
            };

            //0.25초마다 스크롤 여부 체크하여 스크롤 중이면 hasScrolled() 호출
            setInterval(function () {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 150);

            function hasScrolled() {
                var nowScrollTop = window.scrollY;

                if (Math.abs(lastScrollTop - nowScrollTop) <= delta) {
                    return;
                }
                if (nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight) {
                    //Scroll down
                    fixBox.classList.remove('show');
                } else {
                    if (nowScrollTop + window.innerHeight < document.body.offsetHeight) {
                        //Scroll up
                        fixBox.classList.add('show');
                    }
                }

                // 가장 위로 올라가면 안보이게 조정(수정필요)
                if (window.pageYOffset < 1) {
                    document.getElementsByClassName('m_menu_scroll')[0].style = "opacity:0";
                }
                else {
                    document.getElementsByClassName('m_menu_scroll')[0].style = "opacity:1";
                }

                lastScrollTop = nowScrollTop;
            }
        }
        else {

        }
    };

    
    // Mobile에서의 nav의 hidden menu open Event

    var openState = [false, false, false, false];

    function contentsOpen(elList, target) {
        
        // 자기 자신 이외의 이벤트는 초기화 
        for (i = 0; i < 4; i++) {
            if (i != target) {
                // elList[i].style = "max-height: 63px;";
                TweenMax.to(elList[i], 0.5, {maxHeight: '63px', ease: Power3.easeOut});
                document.getElementsByClassName('m_menu_arrow')[i].style = "transform:rotate(0deg);"
                openState[i] = false
            }
        }

        // 클릭했을 때 이벤트 발생
        if (openState[target]) {
            // elList[target].style = "max-height:63px;";
            TweenMax.to(elList[target], 0.5, {maxHeight: '63px', ease: Power3.easeOut});
            document.getElementsByClassName('m_menu_arrow')[target].style = "transform:rotate(0deg);"
            openState[target] = false
        }
        else {
            // elList[target].style = "max-height:300px;";
            TweenMax.to(elList[target], 0.5, {maxHeight: '300px', ease: Power3.easeOut});
            document.getElementsByClassName('m_menu_arrow')[target].style = "transform:rotate(180deg);"
            openState[target] = true
        }
    }

    return {
        resizeEvt : function() {
            _windwoW = window.innerWidth;


        },

        mouseEvt: function() {
            var header = document.getElementsByTagName('header')[0];
            var wrap = document.getElementsByClassName('wrap')[0];

            var gnbMenu = document.getElementsByClassName('gnb_menu');
            var greenBottom = document.getElementsByClassName('greenbottom');

            var language = document.getElementsByClassName('language')[0];
            var langImg = document.getElementsByClassName('lang_img')[0];

            // max-width: 982px까지의 GNB Event

            // Header Mouseover(완성)
            header.addEventListener('mouseover', () => {
                wrap.style = "height: 360px; transition: all 0.5s";
            })
            header.addEventListener('mouseout', () => {
                wrap.style = "height: 0px; transition: all 0.5s;";
            })

            // nav에 mouse over했을 때 border-bottom 생성(완성)
            for (i=0; i<gnbMenu.length; i++) {
                gnbMenu[i].addEventListener('mouseover', function() {
                    var index = getIndex(this);
                    greenBottom[index].style = "border-bottom: 3px solid rgb(191, 215, 21);";
                })
                gnbMenu[i].addEventListener('mouseout', function() {
                    var index = getIndex(this);
                    greenBottom[index].style = "border-bottom: 3px solid rgb(255, 255, 255);";
                })
            }

            // 페이지 영문으로 바꿀때 click event(완성)
            language.addEventListener('click', () => {
                if (_languageState) {
                    language.style = "height: 36px; border-radius: 32px;";
                    langImg.style = "transform:rotate(0deg);";
                    _languageState = false;
                }
                else {
                    language.style = "height: 60px; border-radius: 17px;";
                    langImg.style = "transform:rotate(180deg);";
                    _languageState = true;
                }
            })

            // max-width: 981px부터의 GNB Event
            var body = document.getElementsByTagName('body')[0];
            var mHeader = document.getElementById('m_header');
            var mGnbMenu = document.getElementsByClassName('m_gnb_menu')[0];
            var mGnbMenuBtn = document.getElementsByClassName('m_gnb_menu_btn')[0];
            var mMenuClose = document.getElementsByClassName('m_menu_close')[0];
            var gnbMenuList = document.getElementsByClassName('gnb_menu_m');
            var gnbMenuM = document.getElementsByClassName('gnb_menu_m');

            // Mobile에서의 GNB Open event(완성)
            mGnbMenuBtn.addEventListener('click', () => {
                body.style.overflow = 'hidden';
                // mGnbMenu.style = "right:0%; height:100vh; animation: r_to_l 0.5s forwards;";
                TweenMax.to(mGnbMenu, 0.5, {right: 0, ease: Power3.easeOut});
                mHeader.style = "height:100vh; z-index: 10000;";
                TweenMax.to(mHeader, 0.5, {backgroundColor: 'rgba(0, 0, 0, 0.4)', ease: Power3.easeOut});
            })

            // Mobile에서의 GNB Close event(완성)
            mMenuClose.addEventListener('click', () => {
                // mGnbMenu.style = "right:-100%; height:0vh; animation: l_to_r 0.5s forwards;";
                TweenMax.to(mGnbMenu, 0.5, {right: '-100%', ease: Power3.easeOut});
                mHeader.style = "";
                // mHeader.style = "height:45px; overflow:hidden;";
                TweenMax.to(mHeader, 0.5, {backgroundColor: 'rgba(0, 0, 0, 0)', ease: Power3.easeOut});
                body.style.overflow = 'visible';
            })

            // Mobile에서의 nav의 hidden menu open Event
            for (i = 0; i < gnbMenuList.length; i++) {
                gnbMenuList[i].addEventListener('click', function() {
                    var target = getIndex(this);

                    contentsOpen(gnbMenuM, target);
                })
            }
        }
    }
}