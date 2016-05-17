/**
 * @author David
 */

exports.validaRUT = function (rut_txt, network, functionApp)
{	
	var reponseValues = {};

	var loading = functionApp.loading();
	
	function findUserData( _json )
	{
		var userExist = _json.Response;
		
		if(userExist != 0)
		{
			reponseValues.VAL = true;
			reponseValues.MESSAGE = "";	
				
			return reponseValues;		
		}
		else
		{
			reponseValues.VAL = false;
			reponseValues.MESSAGE = "El rut ingresado no existe.";
				
			return reponseValues;
		}
		//Ti.API.info(JSON.stringify(_json));
	}
	
	var validFormat = rut_txt.replace(/^[0-9]+-[0-9kK]{1}$/g, "");
	
	if(validFormat != "")
	{
		reponseValues.VAL = false;
		reponseValues.MESSAGE = "El Formato del rut no es valido.";
		
		return reponseValues;
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
			Ti.API.info();
			if(mult > 7)
				mult = 2;
				
			prod += (rut_structure[i]*mult);
			mult++;
		}
			
		var digVer = 11 - (prod%11);

		if(digVer == rut_digVer)
		{
			
			var params = {
				BLOCKSIZE : 20,
				USER: rut_txt
			};
			
			network.loadJSON(findUserData, 'FindUserId', params, 'POST', loading);
			
			// return reponseValues;
		}
		else
		{
			reponseValues.VAL = false;
			reponseValues.MESSAGE = "El rut ingresado no es valido.";
			
			return reponseValues;
		}
	}
};