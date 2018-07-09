$(document).ready(function () {

	var getDate = function () {
		var d = new Date(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			day = d.getDate(),
			month = d.getMonth(),
			year = d.getFullYear();

		var monthArray = new Array("янв.", "фев.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек.");

		// var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' г. ' + hrs + ' ч. ' + min + ' мин.' ;
		var actualDate = `${day} ${monthArray[month]} ${year} г. ${hrs} ч. ${min} мин.` ;

		return actualDate;
	};

	var countTweets = function(){
		var tweetCounter = $('.tweet-card').length;
		$('#tweetCounter').text(tweetCounter);
	}

	var wrapURLs = function (text, new_window) {
		var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
		var target = (new_window === true || new_window == null) ? '_blank' : '';
  
		return text.replace(url_pattern, function (url) {
		var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
		var href = protocol_pattern.test(url) ? url : 'http://' + url;
		return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
		});
	};

	var createTweet = function (date, text) {
		var $tweetBox = $('<div class="card tweet-card">'); // обертка для твита
		var $tweetDate = $('<div class="tweet-date">').text(date); // создаем дату
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs (text)).wrapInner('<p></p>'); //создаем контент с твитом

		var additionalClassName;
		if (text.length < 100) {
			additionalClassName = 'font-size-large';
		} else if (text.length > 150) {
			additionalClassName = 'font-size-small';
		} else {
			additionalClassName = 'font-size-normal';
		}

		$tweetText.addClass(additionalClassName);

		$tweetBox.append($tweetDate).append($tweetText);
		$('#tweetList').prepend($tweetBox);

		countTweets();
	};

	var tweetBase = [
			{
				date: '12 апр. 2017 г.',
				text: 'Потратила 3,5 часа, чтобы выбрать шрифт для саблайма.'
			}, 
			{
				date: '18 апр. 2017 г.',
				text: 'Не такой большой твит. Средненькй. Не такой большой твит. Средненькй. Не такой большой твит. Средненькй. Не такой большой твит. Средненькй.'
			}, 
			{
				date: '22 апр. 2017 г.',
				text: 'Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь. Самый большой твит о чем-нибудь.'
			}, 
			{
				date: '28 апр. 2017 г.',
				text: 'Сделала копию странички в twitter с http://webcademy.ru/'
			}
		];

	tweetBase.forEach(function(tweet){
		createTweet(tweet.date, tweet.text);
	});

	$('#postNewTweet').on('submit', function(e){
		e.preventDefault(); // отменяем отправку формы
		var tweetText = $('#tweetText').val(); // получаем текст твита
		createTweet(getDate(), tweetText);
		$('#tweetText').val('');
	});

});