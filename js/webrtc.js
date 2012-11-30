webrtc = {
    $video: null,
    $canvas: null,
    cvsCtx: null,
    init: function(){
        var self = this;
        if (this.hasGetUserMedia){
            this.setGetUserMedia();
            this.setCanvas();
            this.getAudioVideo(function(){
                self.bindVideoControls()
            });
        }else{
            alert("Your browser/version does not support GetUserMedia.")
        }
    },
    hasGetUserMedia: function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },
    setGetUserMedia: function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    },
    setCanvas: function(){
        this.$canvas = $('canvas');
        this.cvsCtx = this.$canvas[0].getContext("2d");
    },
    getAudioVideo: function(callback){
        var self = this;
        navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
            self.$video = $('video').attr('src', window.URL.createObjectURL(localMediaStream)).bind('loadedmetadata', function(e){
                if (typeof callback === 'function'){
                    callback();
                }
            });
        }, function(error){
            console.log(error);
        });
    },
    bindVideoControls: function(){
        var self = this;
        var $controls = $('.controlsContainer');
        $controls.find('.snapshot').click(function(e){
            e.preventDefault();
            self.snapshot();
        });
    },
    snapshot: function(){
        var self = this;
        this.cvsCtx.drawImage(this.$video[0], 0, 0);
        $('.snapshotContainer .snapshotList').append('<li><img src="'+self.$canvas[0].toDataURL('image/webp')+'" /></li>');
    }
}