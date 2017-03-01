
function showLoadMapWindow(){
	$("#tabs").append("<div class='tab'>Map001Tab</div>");
	$("#mapDiv").append("<div id='loadMapWindow' height= '200px' width= '400px'>");
	$("#loadMapWindow").append("<input type='file' id='files' name='files[]' multiple />");
	$("#loadMapWindow").append("<output id='filelist'></output>");
	document.getElementById('files').addEventListener("change",handleFileSelect,false);
}

function showCreateMapWindow(){
	$("#tabs").append("<div class='tab'>Map001Tab</div>");
	$("#mapDiv").append("<div id='createMapWindow' height= '200px' width= '400px'>");
	$("#createMapWindow").append("</br></br>Name: <input type='text' name='name' value=''>");
	$("#createMapWindow").append("</br></br>Rows: <input type='text' name='rows' value=''>");
	$("#createMapWindow").append("</br></br>Columns: <input type='text' name='columns' value=''>");
	$("#createMapWindow").append("</br></br>Sprite size: (on pixels): <input type='text' name='size' value=''>");
	$("#createMapWindow").append("</br></br><button type='button' name='button' onclick='createMap()'>Create</button>");
}

function createMap(){
	var name = $('input[name="name"]').val();
	var rows = $('input[name="rows"]').val();
	var columns = $('input[name="columns"]').val();
	var spriteSize = $('input[name="size"]').val();

	$(".tab:last-child").html(name);
	$("#createMapWindow").remove();
	$("#mapDiv").append("<div class='map' id='" + name + "' height= '90%' width= '90%'>");

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
	$(".tab:last-child").html(f.name);
	var reader = new FileReader();
	reader.readAsText(f);
	reader.addEventListener("load",createMapFromFile,false);
}

function createMapFromFile(e){
	var	output = e.target.result;
	var mapArray = output.split("\n");

	var name = $(".tabs:last-child").html();
	$("#loadMapWindow").remove();
	$("#mapDiv").append("<div class='map' id='" + name + "' height= '90%' width= '90%'>");

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
