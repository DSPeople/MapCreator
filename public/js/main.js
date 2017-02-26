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

	$("#createMapWindow").remove();
	$("#mapDiv").append("<div class='map' id='" + name + "' height= '90%' width= '90%'>");

	var map = document.getElementById(name);
	var str = '';

	str += "<table>";
	for(var i = 0; i < rows; i++){
		str += "<tr>";
		//$("#" + name).append("<tr>")
		for(var j = 0; j < columns; j++){
				//$("#" + name).append("<td></td>")
				str += "<td height='";
				str += spriteSize;
				str += "px' width='"
				str += spriteSize;
				str += "px'></td>";
		}
		str += "</tr>";
	//	$("#" + name).append("</tr>")
	}
	str += "</table>";
	$("#" + name).append(str);

}
