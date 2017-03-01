
function showLoadMapWindow(){
	$("#tabs").append("<div class='tab' onclick='openTab(event)'>Map001Tab</div>");
	$("#mapDiv").append("<div id='loadMapWindow' height= '200px' width= '400px'>");
	$("#loadMapWindow").append("<input type='file' id='files' name='files[]' multiple />");
	$("#loadMapWindow").append("<output id='filelist'></output>");
	document.getElementById('files').addEventListener("change",handleFileSelect,false);
}


function showCreateMapWindow(){
	$("#tabs").append("<div class='tab' onclick='openTab(event)'>Map001Tab</div>");
	$("#mapDiv").append("<div id='createMapWindow' height= '200px' width= '400px'>");
	$("#createMapWindow").append("</br></br>Name: <input type='text' name='name' value=''>");
	$("#createMapWindow").append("</br></br>Rows: <input type='text' name='rows' value='10'>");
	$("#createMapWindow").append("</br></br>Columns: <input type='text' name='columns' value='20'>");
	$("#createMapWindow").append("</br></br>Sprite size: (on pixels): <input type='text' name='size' value='60'>");
	$("#createMapWindow").append("</br></br><button type='button' name='button' onclick='createMap()'>Create</button>");
}

function createMap(){
	var name = $('input[name="name"]').val();
	var rows = $('input[name="rows"]').val();
	var columns = $('input[name="columns"]').val();
	var spriteSize = $('input[name="size"]').val();

	$(".tab:last-child").html(name);
	$("#createMapWindow").remove();
	$("#mapDiv").append("<div class='Map' id='" + name + "' height= '90%' width= '90%'>");

	var map = document.getElementById(name);
	var str = '';

	str += "<table>";
	for(var i = 0; i < rows; i++){
		str += "<tr>";
		for(var j = 0; j < columns; j++){
				str += "<td height='";
				str += spriteSize;
				str += "px' width='"
				str += spriteSize;
				str += "px'></td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	$("#" + name).append(str);
}


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
	var f = files[0];
	var name = f.name.split(".");
	$(".tab:last-child").html(name[0]);
	var reader = new FileReader();
	reader.readAsText(f);
	reader.addEventListener("load",createMapFromFile,false);
}

function createMapFromFile(e){
	var	output = e.target.result;
	var mapArray = output.split("\n");

	var pestañas = document.getElementsByClassName("tab");
	var name = pestañas[pestañas.length-1].innerHTML;

	$("#loadMapWindow").remove();
	$("#mapDiv").append("<div class='Map' id='" + name + "' height= '90%' width= '90%'>");

	var map = document.getElementById(name);
	var str = '';

	str += "<table>";
 	for(var i = 0; i < mapArray.length-1; i++){
 		str += "<tr>";
 		for(var j = 0; j < mapArray[i].length-1; j++){
			str += "<td>" + mapArray[i][j] + "</td>";
		}
 		str += "</tr>";
	}

 	str += "</table>";
 	$("#" + name).append(str);
}

function openTab(evt){
	var maps;
	maps = document.getElementsByClassName("Map");
	for(var i = 0; i < maps.length; i++){
		maps[i].style.display = "none";
	}
	 var mapName = evt.currentTarget.innerHTML;
	 document.getElementById(mapName).style.display = "block";
}

function openLastTab(){
	$(".tab:last-child").trigger('click');
}
