/**
 * @author David
 */

function UserInterfaceWindow()
{
	var functionsApp = require('lib/FunctionsApp');
	var network = require('lib/Network');
	
	var self = Ti.UI.createWindow({
		backgroundColor : '#F1F1F1',
		title: 'SAT',
		layout: "vertical"
	});
	
	var loading = functionsApp.loading();
	self.add(loading);	
	
	var Nombre = functionsApp.createLabelFromLeft(Ti.App.Properties.getString('nombre') + ' ' + Ti.App.Properties.getString('apellido'), "#3D5152", 25, 'bold', 0, '5px', '100%', Titanium.UI.SIZE, 0, Titanium.UI.TEXT_ALIGNMENT_CENTER, 0);	
	var Equipo = functionsApp.createLabelFromLeft(Ti.App.Properties.getString('equipo'), "#999", 15, 'normal', 0, 0, '100%', Titanium.UI.SIZE, 0, Titanium.UI.TEXT_ALIGNMENT_CENTER, 0);
	var Tipo = functionsApp.createLabelFromLeft(Ti.App.Properties.getString('tipo'), "#666", 20, 'normal', 0, '5px', '100%', Titanium.UI.SIZE, 0, Titanium.UI.TEXT_ALIGNMENT_CENTER, 0);
	
	self.add(Equipo);
	self.add(Nombre);
	self.add(Tipo);
	
	var tbNews = Ti.UI.createTableView({
		top : 20,
		data : [],
		backgroundColor : '#f0f0f0',
		separatorColor : '#ccc',
		visible : false,
	});
	self.add(tbNews);
	
	function loadData(_json) {
		
		Ti.API.info(JSON.stringify(_json));
		
		if (_json.error != 0) {
			functionsApp.showDialog('Error', _json.error);
			return;
		}
		
		var data = [];
		
		for (var i = 0, j = _json.data.length; i < j; i++) {
			
			var nombre = '';
			
			nombre = _json.data[i].nombre+ ' ' +_json.data[i].apellido;
			
			var row = Ti.UI.createTableViewRow({
				backgroundColor : '#f0f0f0',
				height : 60,
				layout: "vertical"
			});
			
			var lblNombreRow = functionsApp.createLabelFromLeft(nombre, '#666', 16, 'bold', 15, 0, Titanium.UI.SIZE, Titanium.UI.SIZE, '', Titanium.UI.TEXT_ALIGNMENT_LEFT, 0);			
			
			row.add(lblNombreRow);
			
			data.push(row);
		}
		
		tbNews.setData(data);

		tbNews.visible = true;
		
	}
	
	var params = {
		BLOCKSIZE : 20,
		ID_USUARIO: Ti.App.Properties.getString('idUsuario'),
		ID_EQUIPO: Ti.App.Properties.getString('idEquipo')
	};
	
	self.addEventListener('focus', function(e) {

		network.loadJSON(loadData, 'Equipo', params, null, loading);
		
	});
	
	return self;
}

module.exports = UserInterfaceWindow;