var baseUrl = 'https://jsonplaceholder.typicode.com/photos';
buildPhotosList(baseUrl);

	var popup = document.forms['popup'];
	var openPopupBtn = document.querySelector('.services button');
	var hidden = document.querySelector('.hidden');
	openPopupBtn.addEventListener('click', function(e){
	hidden.style.display = "block";
	popup.classList.add('show');
})
	window.onclick = function(event) {
    if (event.target == hidden) {
        hidden.style.display = "none";
        popup.classList.remove('show');
    }
}

// album_id or photo_id change
var radios = popup.querySelectorAll('[name=user_choice]');
for (var i = 0; i < radios.length; i++) {
	radios[i].addEventListener('change', function (event) {
		console.log(event.target.value)
		popup.querySelector('#album_id_field').style.display = 'none';
		popup.querySelector('#photo_id_field').style.display = 'none';
		popup.querySelector('#' + event.target.value + '_field').style.display = 'block';
	})
}

// popup submit and build list of items according to the [name=user_choice]
popup.addEventListener('submit', function (event) {
	event.preventDefault();
	if (popup.querySelector('#photo_id_field').style.display !== 'none') {
		var url = baseUrl + '/' + popup.querySelector('[name=photo_id_input]').value;
	} else if (popup.querySelector('#album_id_field').style.display !== 'none') {
		var url = baseUrl + '?album_id=' + popup.querySelector('[name=album_id_select]').value;
	} else {console.log('nothing')}
	buildPhotosList(url)
	popup.classList.remove('show');
	hidden.style.display = "none";

})

function buildPhotosList(url) {
	fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function (data) {
		if (!(data instanceof Array)) {
			var items = [data];
		} else { var items = data; }

		var albums = document.querySelector('.albums');
		albums.innerHTML = '';

		var itemsLength = Math.min(items.length, 20);
		for (var i = 0; i < itemsLength; i++) {
			albums.append(createItem(items[i]));
		}

	})
	.catch(function (e) {console.error(e)})
}

function createItem (obj) {
	var container = document.createElement('section');
	container.classList.add('album');

	var thumbnail = document.createElement('img');
	thumbnail.src = obj.thumbnailUrl;
	thumbnail.alt = obj.title;
	thumbnail.title = obj.title;
	container.append(thumbnail);

	var content = document.createElement('div');
	content.classList.add('content');
	container.append(content);

	var title = document.createElement('h3')
	title.textContent = obj.title;
	content.append(title)

	var link = document.createElement('a');
	link.href = obj.url;
	link.textContent = obj.url;
	content.append(link)

	return container;
}