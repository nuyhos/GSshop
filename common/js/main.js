// main page IR

// IR Record(회사실적) Mouse over Event <-resize event 추가 필요
if (matchMedia("screen and (min-width: 768px)").matches) {
    function scaleExpansion() {
        document.getElementsByClassName('ir_record_img')[0].style = "transform: scale(1.2); transition: all 0.5s;"
    }

    function downScale() {
        document.getElementsByClassName('ir_record_img')[0].style = "transform: scale(1); transition: all 0.5s;"
    }
}

// IR Report(IR 보고서) Mouse over Event <-resize event 추가 필요
if (matchMedia("screen and (min-width: 1220px)").matches) {
    function reportHover() {
        document.getElementsByClassName('ir_report_img')[0].style = "bottom: -3px; transition: all 0.5s;";
        document.getElementsByClassName('ir_report')[0].style = "background-color: rgb(180, 212, 27); border: 2px solid rgb(180, 212, 27);";
    }

    function reportOut() {
        document.getElementsByClassName('ir_report_img')[0].style = "bottom: -160px; transition: all 0.5s;";
        document.getElementsByClassName('ir_report')[0].style = "background-color: none; border: 2px solid rgb(255, 255, 255);";
    }
}

const pageHeader = new Header();
const pageFooter = new Footer();

const mainPage = (function () {
    var _windowW, _windowH, _sectionSize, _pageIndex, _scrollTop, 
        _newWindow, _noVideo, _wheelDirection, _isScroll,
        _videoTime, _txtInterval, _txtTime,
        _slidePositionX, _pagePositionY;


    var getIndex = function (element) {
        for (var i = 0; i < element.parentNode.children.length; i++) {
            if (element.parentNode.children[i] === element) {
                return i;
            }
        }
    }

    var setTransform = function (element, transformNode) {
        var string = 'translate3d(' + transformNode.tl[0] + 'px, ' + transformNode.tl[1] + 'px, ' + transformNode.tl[2] + 'px) scaleX(' + transformNode.scx + ') scaleY(' + transformNode.scy + ')';

        element.style.transform = string;
    }

    var heroAnimation = function () {
        var _currentNum = 0;

        _videoTime = setTimeout(function () {
            startAnimation();
        }, 2000);

        var startAnimation = function () {
            _txtInterval = setInterval(function () {
                var heroTxtBox = document.getElementsByClassName('hero-txt-box')[0];
                var heroTxts = heroTxtBox.lastElementChild;

                var otherIndex = [((_currentNum + 1) > 2) ? 0 : _currentNum + 1, ((_currentNum - 1) < 0) ? 2 : _currentNum - 1];

                heroTxtBox.children[_currentNum].classList.remove('effect');
                for (j = 0; j < otherIndex.length; j++) {
                    heroTxtBox.children[otherIndex[j]].classList.add('effect');
                    TweenMax.to(heroTxts.children[otherIndex[j]], 0, { top: 50, opacity: 0, ease: Power3.easeOut });
                    heroTxts.children[otherIndex[j]].style.display = "none";
                }
                heroTxts.children[_currentNum].style.display = "block";
                TweenMax.to(heroTxts.children[_currentNum], 0.5, { top: 0, opacity: 1, ease: Power3.easeOut });

                _currentNum++;
                if (_currentNum > heroTxtBox.children.length - 2) {
                    clearInterval(_txtInterval);
                    _txtTime = setTimeout(function () {
                        if (_noVideo)
                            return;

                        for (i = 0; i < heroTxtBox.children.length - 1; i++)
                            heroTxtBox.children[i].classList.remove('effect');

                        for (i = 0; i < heroTxts.children.length; i++) {
                            // heroTxts.children[i].style.top = 50 + 'px';
                            // heroTxts.children[i].style.opacity = 0;
                            TweenMax.to(heroTxts.children[i], 0, { top: 50, opacity: 0, ease: Power3.easeOut });
                            heroTxts.children[i].style.display = 'none';
                        }

                        heroAnimation();
                    }, 3000);
                }
            }, 2000);
        }


    }

    var Sizing = function (videoEl, bgBox, txtBox) {
        var pastWindowW = _windowW;
        var pastWindowH = _windowH;

        _windowW = window.innerWidth;
        _windowH = window.innerHeight;

        var body = document.getElementsByTagName('body')[0];
        var fullPageWrapper = document.getElementsByClassName('full-page-wrapper')[0];
        var heroTxts = txtBox.lastElementChild;

        if (_newWindow) {
            TweenMax.to(txtBox.children[0], 1, { delay: 0.3, top: 0, opacity: 1, ease: Power2.easeOut });
            TweenMax.to(txtBox.children[1], 1, { delay: 0.4, top: 0, opacity: 1, ease: Power2.easeOut });
            TweenMax.to(txtBox.children[2], 1, { delay: 0.5, top: 0, opacity: 1, ease: Power2.easeOut });
        }

        if (_windowW > 1024) {
            for (i = 0; i < bgBox.children.length; i++)
                // bgBox.children[i].style.opacity = 0;
                TweenMax.to(bgBox.children[i], 0, { opacity: 0, ease: Power3.easeOut });

            for (i = 0; i < txtBox.children.length - 1; i++)
                txtBox.children[i].classList.remove('effect');

            for (i = 0; i < heroTxts.children.length; i++) {
                // heroTxts.children[i].style.top = 50 + 'px';
                // heroTxts.children[i].style.opacity = 0;
                TweenMax.to(heroTxts.children[i], 0, { top: 50, opacity: 0, ease: Power3.easeOut });
                heroTxts.children[i].style.display = 'none';
            }
            videoEl.play();

            // heroAnimation start
            clearTimeout(_videoTime);
            clearInterval(_txtInterval);
            clearTimeout(_txtTime);
            heroAnimation();
        }
        else if (_newWindow || pastWindowW > 1024 && _windowW != pastWindowW) {
            _noVideo = true;

            // clear scheduler
            clearTimeout(_videoTime);
            clearInterval(_txtInterval);
            clearTimeout(_txtTime);

            videoEl.pause();

            TweenMax.to(bgBox.firstElementChild, 0, { opacity: 1, ease: Power3.easeOut });

            txtBox.firstElementChild.classList.remove('effect');
            for (i = 1; i < txtBox.children.length - 1; i++) {
                txtBox.children[i].classList.add('effect');
                heroTxts.children[i].style.display = 'none';
            }

            heroTxts.firstElementChild.style.display = 'block';
            TweenMax.to(heroTxts.firstElementChild, 1, { delay: 0.7, top: 0, opacity: 1, ease: Power3.easeOut });
        }

        if (_windowW > 768) {
            body.style.overflow = 'hidden';

            if (pastWindowW < 769) {
                // _scrollTop -= pastWindowH/2
                for (_pageIndex=0; _pageIndex<_sectionSize.length; _pageIndex++) {
                    if ((_scrollTop += (_sectionSize[_pageIndex])) >= 0) {
                        break;
                    }
                }

                window.scrollTo(0, 0);
                document.addEventListener('wheel', wheelUpDown)
                document.addEventListener('wheel', Paging)
            }

            _sectionSize = [];
            for (i=0; i<fullPageWrapper.children.length; i++)
                _sectionSize.push(fullPageWrapper.children[i].clientHeight);

            _pagePositionY = 0;
            for (i=0; i<_pageIndex; i++) {
                _pagePositionY -= _sectionSize[i];
            }
            setTransform(fullPageWrapper, {tl: [0, _pagePositionY, 0], scx: 1, scy: 1});

            _scrollTop = 0;

            txtBox.style.top = Math.floor(_windowH / 2 - (txtBox.offsetHeight / 2)) + 'px';
        }
        else {
            document.removeEventListener('wheel', wheelUpDown)
            document.removeEventListener('wheel', Paging)
            if (pastWindowW > 768) {
                fullPageWrapper.style = '';
                window.scrollTo(0, -_pagePositionY);
                _pageIndex = 0;
            }
            body.style.overflow = 'visible';

            txtBox.style.top = 120 + 'px';

            _sectionSize = [];
            for (i=0; i<fullPageWrapper.children.length; i++)
                _sectionSize.push(fullPageWrapper.children[i].clientHeight);

            _scrollTop = -(window.scrollY || document.documentElement.scrollTop);
        }
    }

    var wheelUpDown = function(obj) {
        if (obj.deltaY > 0)
            _wheelDirection = true;
        else if (obj.deltaY < 0)
            _wheelDirection = false;
        else
            _wheelDirection = null;

        obj.stopPropagation();
    }
    
    var Paging = function() {
        var fullPageWrapper = document.getElementsByClassName('full-page-wrapper')[0];

        if (_isScroll || (_pageIndex == 0 && !_wheelDirection) || _pageIndex == _sectionSize.length-1 && _wheelDirection)
            return;

        _isScroll = true;

        if (_wheelDirection === null || _newWindow)
            //error
            console('error');
        
        if (_wheelDirection)
            _pagePositionY -= _sectionSize[++_pageIndex];
        else
            _pagePositionY += _sectionSize[_pageIndex--];

        fullPageWrapper.style.transition = 'all 700ms ease 0s';
        setTransform(fullPageWrapper, {tl: [0, _pagePositionY, 0], scx: 1, scy: 1});
        this.addEventListener('transitionend', () => {
            setTimeout(() => {
                _isScroll = false;
            })
        })
    }

    return {
        init: function() {
            _windowW = window.innerWidth;
            _windowH = window.innerHeight;
            _sectionSize = [];
            _pageIndex = 0;
            _newWindow = true;
            _noVideo = false;
            _isScroll = false;
            _pagePositionY = 0;
            _slidePositionX = 0;

            var heroVideo = document.getElementById('hero-video');
            var bgBox = document.getElementsByClassName('bg-box')[0];
            var heroTxtBox = document.getElementsByClassName('hero-txt-box')[0];
            var slideLeftBtn = document.getElementsByClassName('slide-left-btn')[0];
            var slidePgbFill = document.getElementsByClassName('slide-progressbar-fill')[0];

            slideLeftBtn.classList.add('slide-btn--disable');
            setTransform(slidePgbFill, { tl: [0, 0, 0], scx: 0.2, scy: 1 });

            document.addEventListener('wheel', wheelUpDown)
            document.addEventListener('wheel', Paging)
            Sizing(heroVideo, bgBox, heroTxtBox);
            _newWindow = false;
        },

        resizeEvt: function() {
            var heroVideo = document.getElementById('hero-video');
            var bgBox = document.getElementsByClassName('bg-box')[0];
            var heroTxtBox = document.getElementsByClassName('hero-txt-box')[0];

            window.addEventListener('resize', () => {
                Sizing(heroVideo, bgBox, heroTxtBox);
            });
        },

        mouseEvt: function() {
            var heroVideo = document.getElementById('hero-video');
            var heroTxtBoxA = document.getElementsByClassName('hero-txt-box')[0];
            var slideContent = document.getElementsByClassName('slide-content');
            var i;

            for (i = 0; heroTxtBoxA.children[i] != heroTxtBoxA.lastElementChild; i++) {
                var el = heroTxtBoxA.children[i];

                el.addEventListener('mouseenter', function () {
                    var index = getIndex(this);
                    var otherIndex = [((index + 1) > 2) ? 0 : index + 1, ((index - 1) < 0) ? 2 : index - 1];
                    var parent = this.parentNode;
                    var bgBox = document.getElementsByClassName('bg-box')[0];
                    var heroTxts = document.getElementsByClassName('hero-txts')[0];

                    if (window.innerWidth > 1024) {
                        // clear scheduler
                        clearTimeout(_videoTime);
                        clearInterval(_txtInterval);
                        clearTimeout(_txtTime);

                        heroVideo.pause();
                    }

                    parent.children[index].classList.remove('effect');
                    for (j = 0; j < otherIndex.length; j++) {
                        parent.children[otherIndex[j]].classList.add('effect');
                        // heroTxts.children[otherIndex[j]].style.top = 50 + 'px';
                        // heroTxts.children[otherIndex[j]].style.opacity = 0;
                        TweenMax.to(heroTxts.children[otherIndex[j]], 0, { top: 50, opacity: 0, ease: Power3.easeOut });
                        heroTxts.children[otherIndex[j]].style.display = "none";
                        TweenMax.to(bgBox.children[otherIndex[j]], 0.8, { opacity: 0, ease: Power3.easeOut });
                    }

                    TweenMax.to(bgBox.children[index], 0.8, { opacity: 1, ease: Power3.easeOut });
                    heroTxts.children[index].style.display = "block";
                    TweenMax.to(heroTxts.children[index], 0.5, { top: 0, opacity: 1, ease: Power3.easeOut });
                });

                el.addEventListener('mouseleave', function () {
                    var index = getIndex(this);
                    var otherIndex = [((index + 1) > 2) ? 0 : index + 1, ((index - 1) < 0) ? 2 : index - 1];
                    var parent = this.parentNode;
                    var bgBoxImg = document.getElementsByClassName('bg-box')[0].children[index];
                    var heroTxtsTxt = document.getElementsByClassName('hero-txts')[0].children[index];

                    if (window.innerWidth > 1024) {
                        TweenMax.to(heroTxtsTxt, 0, { top: 50, opacity: 0, ease: Power3.easeOut });
                        heroTxtsTxt.style.display = "none";
                        TweenMax.to(bgBoxImg, 0.8, { opacity: 0, ease: Power3.easeOut });
                        parent.children[otherIndex[0]].classList.remove('effect');
                        parent.children[otherIndex[1]].classList.remove('effect');
                        heroVideo.play();

                        // heroAnimation restart
                        clearTimeout(_videoTime);
                        clearInterval(_txtInterval);
                        clearTimeout(_txtTime);
                        heroAnimation();
                    }
                });
            }

            for (i = 0; i < slideContent.length; i++) {
                slideContent[i].addEventListener('mouseover', function () {
                    this.children[0].lastElementChild.classList.add('on');
                });
                slideContent[i].addEventListener('mouseout', function () {
                    this.children[0].lastElementChild.classList.remove('on');
                });
            }
        },

        slideEvt: function() {
            var slideContainer = document.getElementsByClassName('slide-container')[0];
            var slideWrapper = slideContainer.firstElementChild; //
            var slidePgb = slideContainer.lastElementChild; //
            var layoutSlideWrapper = document.getElementsByClassName('l-slide-container')[0];
            var slideRightBtn = slidePgb.previousElementSibling;
            var slideLeftBtn = slideRightBtn.previousElementSibling;
            var slidePgbFill = slidePgb.firstElementChild;
            var txtBoxH2 = document.getElementById('sec-02-txt-header');
            var txtBoxh4 = txtBoxH2.previousElementSibling;

            txtBoxH2.style.transition
            slideLeftBtn.addEventListener('click', function () {
                var scaleX = -1;

                if (_slidePositionX >= -530) {
                    _slidePositionX = 0;
                    this.classList.add('slide-btn--disable');
                    scaleX = 0.2;
                    layoutSlideWrapper.style.zIndex = 0;
                    TweenMax.to(txtBoxh4, 0.5, { opacity: 1 });
                    txtBoxH2.classList.remove('active');
                }
                else if (_slidePositionX >= -1060) {
                    _slidePositionX = -530;
                    scaleX = 0.4;
                }
                else if (_slidePositionX >= -1590) {
                    _slidePositionX = -1060;
                    scaleX = 0.6;
                }
                else if (_slidePositionX >= -1624) {
                    _slidePositionX = -1590;
                    this.nextElementSibling.classList.remove('slide-btn--disable');
                    scaleX = 0.8;
                }
                else {
                    // error
                    alert('slide left button error');
                    return;
                }

                setTransform(slideWrapper, { tl: [_slidePositionX, 0, 0], scx: 1, scy: 1 });
                setTransform(slidePgbFill, { tl: [0, 0, 0], scx: scaleX, scy: 1 });
            });

            slideRightBtn.addEventListener('click', function () {
                var scaleX = -1;

                if (_slidePositionX > -530) {
                    _slidePositionX = -530;
                    this.previousElementSibling.classList.remove('slide-btn--disable');
                    scaleX = 0.4
                    layoutSlideWrapper.style.zIndex = 2;
                    TweenMax.to(txtBoxh4, 0.5, { opacity: 0 });
                    txtBoxH2.classList.add('active');
                }
                else if (_slidePositionX > -1060) {
                    _slidePositionX = -1060;
                    scaleX = 0.6;
                }
                else if (_slidePositionX > -1590) {
                    _slidePositionX = -1590;
                    scaleX = 0.8;
                }
                else if (_slidePositionX > -1624) {
                    _slidePositionX = -1624;
                    this.classList.add('slide-btn--disable');
                    scaleX = 1;
                }
                else {
                    // error
                    alert('slide right button error');
                    return;
                }

                setTransform(slideWrapper, { tl: [_slidePositionX, 0, 0], scx: 1, scy: 1 });
                setTransform(slidePgbFill, { tl: [0, 0, 0], scx: scaleX, scy: 1 });
            });
        },

        cultureEvt: function() {
            var c = document.getElementsByClassName('list_a_1')[0];

            c.addEventListener('mouseover', () => {
                var a = document.getElementsByClassName('culture_img_1')[0]; a.style.opacity = "1";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "0";
            })

            c.addEventListener('mouseout', () => {
                var a = document.getElementsByClassName('culture_img_1')[0]; a.style.opacity = "0";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "1";
            })

            // 2
            var c = document.getElementsByClassName('list_a_2')[0];

            c.addEventListener('mouseover', () => {
                var a = document.getElementsByClassName('culture_img_2')[0]; a.style.opacity = "1";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "0";
            })

            c.addEventListener('mouseout', () => {
                var a = document.getElementsByClassName('culture_img_2')[0]; a.style.opacity = "0";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "1";
            })

            // 3
            var c = document.getElementsByClassName('list_a_3')[0];

            c.addEventListener('mouseover', () => {
                var a = document.getElementsByClassName('culture_img_3')[0]; a.style.opacity = "1";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "0";
            })

            c.addEventListener('mouseout', () => {
                var a = document.getElementsByClassName('culture_img_3')[0]; a.style.opacity = "0";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "1";
            })

            // 4
            var c = document.getElementsByClassName('list_a_4')[0];

            c.addEventListener('mouseover', () => {
                var a = document.getElementsByClassName('culture_img_4')[0]; a.style.opacity = "1";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "0";
            })

            c.addEventListener('mouseout', () => {
                var a = document.getElementsByClassName('culture_img_4')[0]; a.style.opacity = "0";
                var a = document.getElementsByClassName('culture_video')[0]; a.style.opacity = "1";
            })
        },
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    mainPage.init();
});

window.addEventListener('load', function () {
    mainPage.resizeEvt();
    mainPage.mouseEvt();
    mainPage.slideEvt();
    mainPage.cultureEvt();

    pageHeader.mouseEvt();
    pageFooter.clickEvt();
})