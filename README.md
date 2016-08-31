# Scroom

## Scroll

Hold the image and drag it from one position to another.

## Zoom

Using mouse scroller you can zoom in or zoom out the image.

## Selection

Just click on the left upper corner square shape button to enable the selection. Then click on the image and drag, you will get a selected area.

For disabling selection option click on the upper corner square shape button.

## Remove

For removing the selected area just click on the selected area and for this the selection option should be enabled.

## Keys

``` 
boxes : For populating selected areas.
saveDataUrl : Url for saving the form data.
saveCoordinateUrl : Url for saving the coordinates.
```

## For populating save selected area

```
	var savedBoxes = [{"id":"square-306-238","left":"306","top":"238","width":"40","height":"27"}, {"id":"square-660-312","left":"660","top":"312","width":"80","height":"51"}, {"id":"square-380-265","left":"380","top":"265","width":"180","height":"124"}];
	$('#scroom-block').scrollZoom({boxes: savedBoxes});
```

## Upcomping

Displaying saved data on hover.