$(document).ready( function() {
	var savedBoxes = [
        {"id":"square-306-238","left":"306","top":"238","width":"40","height":"27", "name":"test1", "description":"testdes1"},
        {"id":"square-660-312","left":"660","top":"312","width":"80","height":"51", "name":"test2", "description":"testdes2"},
        {"id":"square-380-265","left":"380","top":"265","width":"180","height":"124", "name":"test3", "description":"testdes3"}
    ];
	var displayFields = ['name', 'description'];
    $('#scroom-block').scrollZoom({boxes: savedBoxes, hoverData: displayFields});
});
