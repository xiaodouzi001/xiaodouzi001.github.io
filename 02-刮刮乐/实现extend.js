(function () {
    function Jquery() {
        return new Jquery.prototype.init();
    }

    Jquery.prototype = {
        constructor: 'Jquery',
        init: function () {
        },
        extend: function () {
            var length = arguments.length;
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
    };
    Jquery.prototype.init.prototype = Jquery.prototype;
    window.$ = window.jQuery = Jquery;
})();
$.extend({"name:"zhgnsan"})
