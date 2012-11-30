(function($){
    document.write('<scr'+'ipt src="/js/libs/recorder.js"></scr'+'ipt>');
    document.write('<scr'+'ipt src="/js/webrtc.js"></scr'+'ipt>');

    $(document).ready(function(){
        webrtc.bootstrap();
    });
})(jQuery)