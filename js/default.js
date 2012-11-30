(function($){
    document.write('<scr'+'ipt src="/js/libs/recorder.js"></scr'+'ipt>');
    document.write('<scr'+'ipt src="/js/webrtc.js"></scr'+'ipt>');

    $(document).ready(function(){
        webrtc.bootstrap();

        $('.player').bind('onaudiobuffersready', function(array){
            //PUT CODE HERE
        })
    });
})(jQuery)