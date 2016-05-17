/**
 * @author David
 */
exports.loadJSON = function(callback, service, params, method, loading)
{
	var functionApp = require('lib/FunctionsApp');
	
	var sKey = '0303456nananananna';
	
	var ts = functionApp.createTimeStamp();
	var hash = functionApp.createHash(sKey, ts);
	
	var WebServiceHost = "http://192.168.1.42/Prototype_project/services/";
	
	var webServiceURL = {
		'Login': 'Login.php',
		'FindUserId': 'FindUserId.php',
		'Equipo': 'GetTeam.php'
	};
	
	if(params == null)
	{
		params = {};
	}
	
	if(method == null)
	{
		method = 'POST';
	}
	
	params.HASH = hash;
	params.TS = ts;
	
	url = WebServiceHost + webServiceURL[service];
	
	var readyState = -1;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(600000);
	
	xhr.onload = function(e)
	{
		// Ti.API.info('>>> onload! ------------------------------- ');
		// Ti.API.info('status ' + xhr.status);
		// Ti.API.info('connected ' + xhr.connected);
		// Ti.API.info('readyState ' + xhr.readyState);
		// Ti.API.info('connectionType ' + xhr.connectionType);
		// Ti.API.info('location ' + xhr.location);
		// Ti.API.info('>>> got the data! ... ');

		var jsondata = null;
		
		if(xhr.status == 200)
		{
			try
			{
				if( typeof(loading) != 'undefined' || loading != null)
					loading.hide();
				jsondata = JSON.parse(xhr.responseText);
			}
			catch(errorJSON)
			{
				if( typeof(loading) != 'undefined' || loading != null)
					loading.hide();
				functionApp.showDialog('Error', "No hay respuesta del servidor");
				return;
			}
			
			try
			{
				if( typeof(callback) != undefined)
				{
					if(typeof(loading) != 'undefined' || loading != null)
						loading.hide();
					callback(jsondata);					
				}
			}
			catch(errorCallBack)
			{
				if( typeof(loading) != 'undefined' || loading != null)
					loading.hide();
				functionApp.showDialog('Error', "Error al mostrar la informacion.");
				return;
			}
			
			if( typeof(loading) != 'undefined' || loading != null)
				loading.hide();
		}
		else
		{
			if( typeof(loading) != 'undefined' || loading != null)
				loading.hide();
			functionApp.showDialog('Error', "Hemos detectado un error, intente mas tarde.");
			return;
		}
	};
	
	xhr.onerror = function(e)
	{
		if( typeof(loading) != 'undefined' || loading != null)
			loading.hide();
		functionApp.showDialog('Error', "Tiempo de espera agotado.");
	};
	
	xhr.ondatastream = function()
	{
		if(xhr.readyState > readyState)
		{
			readyState = xhr.readyState;
		}
	};
	
	xhr.open(method, url);
	xhr.send(params);
	
	if( typeof(loading) != 'undefined' || loading != null)
			loading.show();
};


