/**
 * @author David
 */

function LoginWindow()
{
	var functionApp = require('lib/FunctionsApp');
	var network = require('lib/Network');
	
	var self = Ti.UI.createWindow({
		backgroundColor : '#F1F1F1',
		title: 'Login'
	});
	
	var Title_view = Ti.UI.createView({
		top: "0%",
		width: "100%",
		height: "40%",
		backgroundColor: '#69FCFF',
		layout: "vertical"
	});
	
	var Form_view = Ti.UI.createView({
		top: "40%",
		width: "100%",
		height: "60%",
		layout: "vertical"
	});
	
	var Title_Label = Ti.UI.createLabel({
		top: "50%",
		width: "100%",
		height: Titanium.UI.SIZE,
		font : {
					fontSize : 50,
					fontWeight : 'bold'
				},
		text : "SAT",
		color: "#3D5152",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var Sub_title_Label = Ti.UI.createLabel({
		top: "3px",
		width: "100%",
		height: Titanium.UI.SIZE,
		font : {
					fontSize : 14,
					fontWeight : 'bold'
				},
		text : "Sports Analyst Tool",
		color: "#3D5152",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var User_txt = Ti.UI.createTextField({
		top : "60px",
		width : "70%",
		height : 60,
		backgroundColor: "#FFF",
		color: "#666",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		borderWidth: 2,
		borderColor: "#CCC",
		borderRadius: 8,
		hintText : "RUT",
		hintTextColor: "#CCC",
		maxLength: 10 
	});
	
	var Pass_txt = Ti.UI.createTextField({
		top : "25px",
		width : "70%",
		height : 60,
		backgroundColor: "#FFF",
		color: "#666",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		borderWidth: 2,
		borderColor: "#CCC",
		borderRadius: 8,
		hintText : "CLAVE",
		passwordMask : true,
		inputType : "password",
		hintTextColor: "#CCC"
	});
	
	var Button_login = Ti.UI.createButton({
		top: "25px",
		width: "70%",
		height: 60,
		borderRadius: 8,
		title: "Ingresar"
	});
	
	var labelError_message = functionApp.labelError();
	
	var loading = functionApp.loading();

	Title_view.add(Title_Label);
	Title_view.add(Sub_title_Label);
	
	Form_view.add(labelError_message);
	Form_view.add(User_txt);
	Form_view.add(Pass_txt);
	Form_view.add(Button_login);
	
	self.add(Title_view);
	self.add(Form_view);
	self.add(loading);
	
	function loadingData( _json )
	{

		if( _json.error != 0)
		{
			//functionsApp.showDialog('Error', _json);
			
			User_txt.borderColor = '#FC959D';
			Pass_txt.borderColor = '#FC959D';
			labelError_message.top = "3px";
			labelError_message.height = Titanium.UI.SIZE;
			labelError_message.text = "Usuario o clave incorrecta.";
			
			return;
		}
		
		Ti.App.Properties.setString("idUsuario", _json.id_usuario);
		Ti.App.Properties.setString("nombre", _json.nombre);
		Ti.App.Properties.setString("apellido", _json.apellido);
		Ti.App.Properties.setString("rut", _json.rut);
		Ti.App.Properties.setString("clave", _json.clave);
		Ti.App.Properties.setString("email", _json.email);
		Ti.App.Properties.setString("fecha", _json.fechaNacimiento);
		Ti.App.Properties.setString("altura", _json.altura);
		Ti.App.Properties.setString("peso", _json.peso);
		Ti.App.Properties.setString("idEquipo", _json.id_equipo);
		Ti.App.Properties.setString("equipo", _json.equipo);
		Ti.App.Properties.setString("tipo", _json.tipo);
		Ti.App.Properties.setString("deporte", _json.deporte);
		Ti.App.Properties.setString("login", true);
		
		var UserInterface = require('ui/common/UserInterfaceWindow');
		new UserInterface().open();
		
		self.close();
	}
	
	var params = {
		BLOCKSIZE : 20
	};
	
	self.addEventListener('open', function(){
		self.activity.actionBar.hide();
		labelError_message.top = 0;
		labelError_message.height = 0;
		labelError_message.text = "";
	});
	
	User_txt.addEventListener('blur', function(){
		if( functionApp.validaRUT(User_txt.getValue()) )
		{
			User_txt.borderColor = '#A1D490';
			labelError_message.top = 0;
			labelError_message.height = 0;
			labelError_message.text = "";
		}
		else
		{
			User_txt.borderColor = '#FC959D';
			labelError_message.top = "3px";
			labelError_message.height = Titanium.UI.SIZE;
			labelError_message.text = "Rut no valido";
		}
	});
	
	Button_login.addEventListener('click', function(){
		params.RUT = User_txt.getValue();
		params.PASS = Pass_txt.getValue();
		
		if( functionApp.validaRUT(User_txt.getValue()) )
		{
			network.loadJSON(loadingData, 'Login', params, 'POST', loading);
		}
		else
		{
			User_txt.borderColor = '#FC959D';
			labelError_message.top = "3px";
			labelError_message.height = Titanium.UI.SIZE;
			labelError_message.text = "Rut no valido";
		}
	});
	
	return self;
};

module.exports = LoginWindow;