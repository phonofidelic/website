var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// audiofiles in model
var APfiles = {
	currentTrack: null,
	tracks: [
		{
			id: 'trk_1',
			src: 'img/audio/track1.m4a'
		},
		{
			id: 'trk_2',
			src: 'img/audio/track2.m4a'
		}
	]
};

// controler accessses files

var APcontroller = {
	init: function() {
		APinterface.init();
	},
	selectTrack: function() {

	}
}

// build interface elements
var APinterface = {
	init: function() {
		this.render()
	},
	render: function() {
		var APcontainer = document.createElement('div');
		var buttonArray = [
			{
				classNam: 'glyphicon glyphicon-backward audio-controll-component',
				buttonName: 'backButton'
			},
			{
				classNam: 'glyphicon glyphicon-play audio-controll-component',
				buttonName: 'playButton'
			},
						{
				classNam: 'glyphicon glyphicon-pause audio-controll-component',
				buttonName: 'pauseButton'
			},
						{
				classNam: 'glyphicon glyphicon-stop audio-controll-component',
				buttonName: 'stopButton'
			},
						{
				classNam: 'glyphicon glyphicon-forward audio-controll-component',
				buttonName: 'forwardButton'
			},
		];

		for (var i = 0; i < buttonArray.length; i++) {
			var classN = buttonArray[i].classNam;
			var buttonName = document.createElement('span');
			$(buttonName).addClass(classN);
			APcontainer.appendChild(buttonName);
		}

		$('#audio').append(APcontainer);
	}
};
APcontroller.init();