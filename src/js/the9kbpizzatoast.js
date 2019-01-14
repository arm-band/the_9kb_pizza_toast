(function($) {
    $.fn.the9kbpizzatoast = function(options) {

        var defaults = {
            text              : '',
            showText          : '<br><a href="./the9kbpizzatoast" id="the9kbpizzatoast_hiddenButton">ページの閲覧中、このウインドウを表示しない</a>',
            buttonText        : 'リンクボタン',
            buttonColor       : '#fff',
            buttonTextColor   : '#333',
            buttonBorderColor : '#ccc',
            buttonLink        : '#',
            buttonShadow      : false,
            borderRadius      : '0px',
            boxShadow         : false
        };

        //string of class, id
        var classID = 'the9kbpizzatoast';
        var showFlag = Cookies.get('name');
        var croque = showFlag === classID ? false : true;
        if(croque) {
            var params = $.extend(defaults, options);

            console.log(params.buttonShadow);
        console.log(validBoolean(params.buttonShadow));
            //css value
            var buttonBGColor = validColor(params.buttonColor) ? params.buttonColor : defaults.buttonColor;
            var buttonTextColor = validColor(params.buttonTextColor) ? params.buttonTextColor : defaults.buttonTextColor;
            var buttonBorderColor = validColor(params.buttonBorderColor) ? params.buttonBorderColor : defaults.buttonBorderColor;
            var buttonShadow = validBoolean(params.buttonShadow) ? '0 3px 3px rgba(48,48,48,0.4)' : '0 0 0 rgba(0,0,0,0)';
            var boxBorderRadius = validPixel(params.borderRadius) ? params.borderRadius : defaults.borderRadius;
            var boxShadow = validBoolean(params.boxShadow) ? '0 3px 3px rgba(48,48,48,0.4)'  : '0 0 0 rgba(0,0,0,0)';

            //generate elements
            var wrapperDiv = $('<div></div>');
            var div = $('<div></div>');
            var textP = $('<p></p>');
            var button = $('<a></a>');
            //prepare
            textP.html(escHTML(params.text) + params.showText);
            button.text(escHTML(params.buttonText)).attr('href', escAttr(params.buttonLink));

            div.addClass(classID + '_body');
            textP.addClass(classID + '_text');
            button.attr('id', classID + '_button').addClass(classID + '_button');
            div.append(textP).append(button);
            wrapperDiv.attr('id', classID).addClass(classID).append(div);

            //reset css
            reset(wrapperDiv);
            reset(div);
            reset(textP);
            reset(button);
            textP.css({
                'letter-spacing': '0',
                'line-height': '1'
            });
            button.css({
                'letter-spacing': '0',
                'line-height': '1'
            });

            //css
            wrapperDiv.css({
                'width': '100%',
                'position': 'fixed',
                'left': '0',
                'bottom': '0',
                'visibility': 'hidden'
            });
            div.css({
                'margin': '1rem 2rem',
                'padding': '1rem',
                'background-color': '#fff',
                'border': '1px solid #eee',
                'display': 'flex',
                'justify-content': 'space-around',
                'align-items': 'center',
                'border-radius': boxBorderRadius,
                'boxShadow': boxShadow,
                'visibility': 'visible',
                'z-index': '9999'
            });
            textP.css({
                'margin-right': '1rem',
                'line-height': '1.6'
            });
            button.css({
                'display': 'block',
                'margin-left': '1rem',
                'text-align': 'center',
                'padding': '0.8rem 1.6rem',
                'background-color': buttonBGColor,
                'color': buttonTextColor,
                'transition': 'all .3s ease',
                'text-decoration': 'none',
                'border': '1px solid ' + buttonBorderColor,
                'border-radius': boxBorderRadius,
                'boxShadow': buttonShadow
            });

            //add
            $('body').append(wrapperDiv);

            //button hover
            $('#' + classID + '_button').on({
                mouseover: function() {
                        $(this).css({
                            'opacity': '0.7'
                        });
                    },
                mouseleave: function() {
                        $(this).css({
                            'opacity': '1'
                        });
                    }
            });
            //set cookie
            $('#' + classID + '_hiddenButton').on('click', function() {
                Cookies.set('name', classID);
                wrapperDiv.css({
                    'display': 'none'
                });
                return false;
            });
        }

        //functions
        //css
        function reset($elm) {
            $elm.css({
                'margin': '0',
                'padding': '0',
                'border': '0',
                'font-size': '100%',
                'font': 'inherit',
                'vertical-align': 'baseline'
            });
        }
        //escape
        function escHTML(string) {
            if(typeof string !== 'string') {
                return string;
            }
            return string.replace(/[&'`"<>]/g, function(match) {
                return {
                    '&': '&amp;',
                    "'": '&#x27;',
                    '`': '&#x60;',
                    '"': '&quot;',
                    '<': '&lt;',
                    '>': '&gt;',
                }[match]
            });
        }
        function escAttr(string) {
            if(typeof string !== 'string') {
                return string;
            }
            return string.replace(/[`"<>]/g, function(match) {
                return {
                    '`': '&#x60;',
                    '"': '&quot;',
                    '<': '&lt;',
                    '>': '&gt;',
                }[match]
            });
        }
        //validation
        function validColor(string) {
            if(typeof string !== 'string') {
                return string;
            }
            return string.match(/^\#([\dabcdef]{3}|[\dabcdef]{6}){1}$/gi);
        }
        function validPixel(string) {
            if(typeof string !== 'string') {
                return string;
            }
            return string.match(/^[\d]+px$/g);
        }
        function validBoolean(bool) {
            if(typeof bool !== 'boolean') {
                return false;
            }
            return bool;
        }
    };
})(jQuery);