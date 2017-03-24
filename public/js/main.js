var selectedSprite = "";
var mapCount = 1;
var spriteSize = 0;

var img = new Image();
img.src = "spritesheets/terrain.png"
img.width = "1024px";
img.height = "384px";

var img = new Image();
img.src = "spritesheets/terrain.png";
img.width = "1024px";
img.height = "384px";

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
	$("#createMapWindow").append("</br></br>Name: <input type='text' name='name' value='map" + mapCount + "'>");
	$("#createMapWindow").append("</br></br>Rows: <input type='text' name='rows' value='10'>");
	$("#createMapWindow").append("</br></br>Columns: <input type='text' name='columns' value='20'>");
	$("#createMapWindow").append("</br></br>Sprite size: (on pixels): <input type='text' name='size' value='64'>");
	$("#createMapWindow").append("</br></br><button type='button' name='button' onclick='createMap()'>Create</button>");
}

function createMap(){
	var name = $('input[name="name"]').val();
	var rows = $('input[name="rows"]').val();
	var columns = $('input[name="columns"]').val();
	spriteSize = $('input[name="size"]').val();


    //OBTENCION DE VALORES DEL FORMULARIO
	$(".tab:last-child").html(name);
	$("#createMapWindow").remove();
	$("#mapDiv").append("<div class='Map' id='" + name + "' height= '90%' width= '90%'>");

	var map = document.getElementById(name);
	var str = '';
	var count = 0;

    //ANCHURA MAXIMA DEL MAPA
    $("#" + name).css("max-width",(spriteSize*columns)+(4*columns)); //tamaño div + borde div
    //CREACION DEL GRID
	for(var i = 0; i < rows*columns; i++){
		count++;
		str += "<div class='cell' id='cell"+ count +"'></div>";
        $("#" + name).append(str);
        str = "";
	}

    //CREACION DE LA LISTA DE CAPAS
    str = "<div class='layerDiv'><span>Layer Selector:&nbsp</span><select class='layerSelector' id='layerSelector_" + name + "'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></div>"
    $("#" + name).append(str);

    $(".cell").css('height',spriteSize);
    $(".cell").css('width',spriteSize);

    //FUNCION PARA PINTAR
    $(".cell").click(function(event){
        //OBTENCION DE IMAGEN A METER
        var mycanv = $("#"+ selectedSprite)[0];
		var cell = event.target;
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        var url = mycanv.toDataURL();
        img.src = url;
        //POSICIONAMIENTO DE LA IMAGEN
        var layers = document.getElementById("layerSelector_map1");
        img.style.zIndex = layers.options[layers.selectedIndex].text;
        img.style.position = "relative";
        var imagesCount = $("#"+event.target.id).children().length;
        var top = 44 * imagesCount;
        img.style.top = "-" + top.toString() +"px";

        //APPEND DE LA IMAGEN
		cell.append(img);
    })
}


function handleFileSelect(evt) {
    var spriteSize = 60;
    var files = evt.target.files; // FileList object
	var f = files[0];
	var name = f.name.split(".");
	$(".tab:last-child").html(name[0]);
	var reader = new FileReader();
	reader.readAsText(f);
	reader.addEventListener("load",createMapFromFile,false);
}

function createMapFromFile(e){
    var spriteSize = 60;
	var	output = e.target.result;
	var mapArray = output.split("\n");
	var pestañas = document.getElementsByClassName("tab");
	var name = pestañas[pestañas.length-1].innerHTML;

    if($(window).width() < 1900){
        spriteSize = 40;
    }

	$("#loadMapWindow").remove();
	$("#mapDiv").append("<div class='Map' id='" + name + "' height= '90%' width= '90%'>");

	var map = document.getElementById(name);
	var str = '';

	str += "<table>";
 	for(var i = 0; i < mapArray.length-1; i++){
 		str += "<tr>";
 		for(var j = 0; j < mapArray[i].length-1; j++){
            str += "<td height='" + spriteSize + "px' width='" + spriteSize + "px'>"+ mapArray[i][j] +"</td>";
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



function createSprites(){
	var spriteSize = 64;
	var count = 0;

	for (var i = 1; i <= 6; i++) {
		for(var j = 1; j <= 16; j++){
			count++;
			var str = "<canvas id='sprite"+ count + "' width='64' height='64'></canvas>";
			$("#spriteBar").append(str);
			var canv = document.getElementById("sprite" + count);
			var ctx = canv.getContext("2d");
			ctx.drawImage(img, (j-1)*spriteSize, (i-1)*spriteSize, spriteSize, spriteSize, 0, 0, spriteSize, spriteSize);
		}
	}

    $("#spriteBar > canvas").click(function(event){
        selectedSprite = event.target.id;
    });
}
