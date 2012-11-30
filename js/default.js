(function($){
    document.write('<scr'+'ipt src="/js/modernizr.min.js"></scr'+'ipt>');
    document.write('<scr'+'ipt src="/js/webrtc.js"></scr'+'ipt>');

    $(document).ready(function(){
        webrtc.init();
    });
})(jQuery)