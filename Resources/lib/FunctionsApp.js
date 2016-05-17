/**
 * @author David
 */
exports.createHash = function(_sKey, _sTS)
{
	var hash = Ti.Utils.md5HexDigest(_sKey + '' + _sTS);
	
	return hash;
};

exports.createTimeStamp = function()
{
	var sTS = Math.round(new Date().getTime() / 1000.0);

	return sTS;
};

exports.createLabelFromLeft = function(text, color, fontSize, fontWeight, left, top, width, height, shadow, textAling, right) {
	if (width == null) {
		width = 'auto';
	}
	if (height == null) {
		height = 'auto';
	}
	if (shadow == null) {
		shadow = false;
	}
	if (textAling == null) {
		textAling = 'left';
	}
	var label = Titanium.UI.createLabel({
		color : color,
		text : text,
		font : {
			fontSize : fontSize,
			fontWeight : fontWeight,
			fontFamily : 'Helvetica Neue Ultra Light'
		},
		left : left,
		textAlign : textAling,
		top : top,
		height : height,
		width : width
	});

	if (shadow) {
		label.shadowColor = '#131c28';
		label.shadowOffset = {
			x : 0,
			y : 1
		};
	}

	if (right != null) {
		label.right = right;
	}

	return label;
};

exports.labelError = function()
{
	var labelError = Ti.UI.createLabel({
		width: "100%",
		font : {
					fontSize : 14,
					fontWeight : 'bold'
				},
		color: "#FC959D",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	
	return labelError;
};

exports.showDialog = function(title, message) {

	var dialog = Titanium.UI.createAlertDialog({
		title : title,
		message : message,
		buttonNames : ['OK']
	});
	dialog.show();

};

exports.loading = function() {

	var loading = Ti.UI.createActivityIndicator({
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 18,
			fontWeight : 'bold'
		},
		message : L("loading_data"),
		style : Ti.UI.ActivityIndicatorStyle.BIG_DARK,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		zIndex : 9999
	});

	return loading;
};

exports.validaRUT = function (rut_txt)
{	
	var validFormat = rut_txt.replace(/^[0-9]+-[0-9kK]{1}$/g, "");
	
	if(validFormat != "")
	{
		return false;
	}
	else
	{
		var rut_parameters = rut_txt.split("-");
			
		var rut_structure = (rut_parameters[0].split("")).reverse();
		var rut_digVer = (rut_parameters[1] != "k")?rut_parameters[1]: 10;
			
		var mult = 2;
		var prod = 0;
			 			
		for( var i = 0; i<rut_structure.length; i++ )
		{
			if(mult > 7)
				mult = 2;
				
			prod += (rut_structure[i]*mult);
			mult++;
		}
			
		var digVer = 11 - (prod%11);

		if(digVer == rut_digVer)
		{				
			return true;
		}
		else
		{
			return false;
		}
	}
};