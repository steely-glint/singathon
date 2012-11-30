webrtc = {
    audioContext: null,
    recorder: null,
    room: null,
    audioData: [],
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
        console.log('Entering main.');
        this.bindEvents();
        this.getData();
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
            self.sendData(true);
        });
    },
    sendData: function(audio, video){
        var self = this;
        if (audio){
            this.recorder.exportWAV(function(blob){
                var xhr = new XMLHttpRequest(),
                    upload = xhr.upload;

                xhr.open('POST', '/serverside/storeBlob.php?r='+self.room, true);
                xhr.onload = function(e) {
                    console.log("done");
                };
                xhr.send(blob);
            });
        }
    },
    getData: function(callback){
        console.log("get data");
        var self = this;
        $.ajax({
            url: '/serverside/fetchBlobs.php?r='+self.room,
            type: 'get',
            success: function(data){
                self.audioData = JSON.parse(data);
                self.loadAudio()
            }
        });
    },
    loadAudio: function(){
        var self = this;
            load(0);
        function load(i){
            if (i === self.audioData.length-1){
                self.playAll();
                return;
            }
            var request = new XMLHttpRequest();
            request.open('GET', '/serverside/'+self.audioData[i].blob, true);
            request.responseType = 'arraybuffer';
            request.onload = function(){
                self.audioContext.decodeAudioData(request.response, function(buffer) {
                    self.audioData[i].buffer = buffer;
                    i++;
                    load(i);
                });
            }
            request.send();
        }
    },
    playAll: function(){
        $('.player').trigger('onaudiobuffersready', this.audioData);
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