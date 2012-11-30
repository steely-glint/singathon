webrtc = {
    audioContext: null,
    recorder: null,
    room: null,
    bootstrap: function(){
        var self = this;

        //set room id
        this.room = this.getParamByName('r');
        if (this.room){
            console.log("Room id: "+this.room);
        }else{
            throw new Error("Room id could not be identified.")
        }

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        this.audioContext = new window.AudioContext;

        navigator.getUserMedia({audio: true}, function(stream){
            //setup audio
            var input = self.audioContext.createMediaStreamSource(stream);
            console.log('Media stream created.');
            input.connect(self.audioContext.destination);
            console.log('Input connected to audio context destination.');

            //setup recorder
            self.recorder = new Recorder(input);
            console.log('Recorder initialised.');
            self.main();
        }, function(e) {
            alert('No live audio input: ' + e);
        });
    },
    main: function(){
        console.log('Entering main.')
        this.bindEvents();
    },
    bindEvents: function(){
        var self = this;
        $('.jsRecordStart').click(function(e){
            e.preventDefault();
            self.recorder.record();
            console.log('Recording...');
        })
        $('.jsRecordStop').click(function(e){
            e.preventDefault();
            self.recorder.stop();
            console.log('Recording stopped.');
        })
        $('.jsRecordSubmit').click(function(e){
            e.preventDefault();
            self.sendData();
        });
    },
    sendData: function(audio, video){
        var self = this;
        if (audio){
            this.recorder.exportWAV(function(blob){
                $.ajax({
                    url: ''+'?r='+self.room, //TODO
                    type: 'post',
                    data: blob,
                    success: function(){
                        console.log('Audio data sent.')
                    },
                    error: function(){
                        console.log("Audio data send failed.")
                    }
                });
            });
        }
    },
    getParamByName: function(name){
        var name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if(results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}