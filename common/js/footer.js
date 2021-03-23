// Footer JAVA Script

function Footer() {
    var _windowW;

    return {
        clickEvt: function() {
            var familySiteBtn = document.getElementsByClassName('familysite')[0].firstElementChild;
            var familysiteRiseup = document.getElementsByClassName('familysite_riseup')[0];
            var closeBtn = document.getElementsByClassName('close_btn')[0];

            familySiteBtn.addEventListener('click', () => {
                _windowW = window.innerWidth;
                if (_windowW < 982 & _windowW > 758)
                    familysiteRiseup.style.height = '227px'
                else
                    familysiteRiseup.style.height = '283px';
            })

            closeBtn.addEventListener('click', () => {
                familysiteRiseup.style.height = '0px';
            })
        }
    }
}

// CCM Page Open Close Event
function ccmPageOpen() {
    document.getElementsByClassName('ccm_pop_up')[0].style = "display:block;";
    document.documentElement.scrollTop = 0;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByClassName('desktop_gnb_menu')[0].style = "display:none;";
}

function ccmPageClose() {
    document.getElementsByClassName('ccm_pop_up')[0].style = "display:none;";
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
    document.getElementsByClassName('desktop_gnb_menu')[0].style = "display:block;";
}