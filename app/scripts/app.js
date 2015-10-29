$(document).ready(function() {

	var listo = [];

	function Tasks(task) {
		this.task = task;
		this.id = 'new';
	}

	$('newTaskForm').hide();

	var advanceTask = function(task) {
		var modified = task.innerText.trim();
		for (var i=0; i < listo.length; i++) {
			if(listo[i].task === modified) {
				if(listo[i].id === 'new') {
					listo[i].id = "inProgress";
				}
				else if (listo[i].id === 'inProgress') {
					listo[i].id = 'Archived';
				}
				else {
					listo.splice(i, 1);
				}
				updateStorage();
				break;
			}
		}
		task.remove();
	};

	var addTask = function(task) {
		if (task) {
			task = new Tasks(task);
			listo.push(task);
			updateStorage();
			$('#newItemInput').val('');
			$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm. #newListItem').fadeToggle('fast', 'linear');
		
	};

	$('#saveNew').on('click', function(e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		console.log(task);
		addTask(task);
	});

	//Opens form
	$('newListItem').on('click', function() {
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});

	//Closes form
	$('#cancel').on('click', function(e) {
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});

	//For changing status of tasks from 'new' to 'inProgress'
	$(document).on('click', '#item', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);
	});

	//For changing status of tasks from 'inProgress' to 'Archived'
	$(document).on('click', '#inProgress', function(e) {
		e.preventDefault();
		var task = this;
		task.id='Archived';
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		this.id = 'inProgress';
		$('#archivedList').append(changeIcon);
	});

	$(document).on('click', '#archived', function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
	});

	var updateStorage = function() {
		localStorage["TaskList"] = listo;
	}

})