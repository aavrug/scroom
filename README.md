# Scroom

## Scroll

Hold the image and drag it from one position to another.

## Zoom

Using mouse scroller you can zoom in or zoom out the image.

## Selection

Just click on the left upper corner square shape button to enable the selection. Then click on the image and drag, you will get a selected area.

For disabling selection option, click on the upper corner square shape button.

## Remove

For removing the selected area just click on the selected area. Note, that the selection option should be enabled.

## Keys

``` 
boxes : For populating selected areas.
saveDataUrl : URL which will handle the form data.
saveCoordinateUrl : URL which will handle the coordinates.
deleteUrl : URL which will use for deletion of saved selected area.
hoverData : Fields name display on hover with values. 
```

## For populating saved selected area

```
    var savedBoxes = [
        {"id":"square-306-238","left":"306","top":"238","width":"40","height":"27"},
        {"id":"square-660-312","left":"660","top":"312","width":"80","height":"51"},
        {"id":"square-380-265","left":"380","top":"265","width":"180","height":"124"}
    ];
    
    $('#scroom-block').scrollZoom({boxes: savedBoxes});
```

## For displaying details of selected area on hover

```
    var savedBoxes = [
        {"id":"square-306-238","left":"306","top":"238","width":"40","height":"27", "name":"test1", "description":"testdes1"},
        {"id":"square-660-312","left":"660","top":"312","width":"80","height":"51", "name":"test2", "description":"testdes2"},
        {"id":"square-380-265","left":"380","top":"265","width":"180","height":"124", "name":"test3", "description":"testdes3"}
    ];

    var displayFields = ['name', 'description'];
    
    $('#scroom-block').scrollZoom({boxes: savedBoxes, hoverData: displayFields});
```

## Responsive Div

In your styling file just set width and height to "scroom-block" class as per your requirement.

```
    div.scroom-block {
        width: 912px;
        height: 465px;
    }
```

## Upcoming

Different shapes of selection.
