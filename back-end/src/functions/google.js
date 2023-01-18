const { google } = require('googleapis');

const MyGoogle = async (req, res) => {
	let { fromDay, toDay } = req.body;

	try {
		const auth = new google.auth.GoogleAuth({
			keyFile: 'credentials.json',
			scopes: 'https://www.googleapis.com/auth/spreadsheets',
		});

		// Create client instance for auth
		const client = await auth.getClient();

		//Instance of google Sheets API
		const googleSheets = google.sheets({ version: 'v4', auth: client });

		// Get metadata about spreadsheet
		const minutasID = '17tsiC8BUoqeqEcI2ZGGQYTSiRQrY9gV4ep4q95UtQJc';
		const registroID = '19f4h3st0vAhjVxGqB5m6ofkXul6ldQlo5V2-Q_hlBRk';

		/* const minutasMetaData = await googleSheets.spreadsheets.get({
			auth,
			spreadsheetId: minutasID,
		}); */
		/* const registroMetaData = await googleSheets.spreadsheets.get({
			auth,
			spreadsheetId: registroID,
		}); */

		//---------------------------------- Obteniendo la Fecha Actual del sistema

		//if (fromDay == undefined || toDay == undefined || fromDay == '' || toDay == '') {
		const date = fromDay ? new Date(fromDay) : new Date();
		const endDate = new Date(toDay);
		var options = {
			month: 'long',
		};
		let startDay = date.getDate() + 1;
		let finishDay = toDay ? endDate.getDate() + 1 : startDay;

		let month = date.toLocaleDateString('es-CL', options);
		month = month.charAt(0).toUpperCase() + month.slice(1, 3);
		//Dic;
		let completeYear = Number(date.getFullYear());
		let year = date.getFullYear().toString().slice(2, 4);
		//2022;
		let year2 = `'${completeYear}'`;
		let pageName = `'${month + year}'`; //Dic22
		//----------------------------------

		//---------------------------------- Obteniendo la información del excel del Registro de ventanas de mantencion
		// Read rows from spreadsheet
		const registroRows = await googleSheets.spreadsheets.values.get({
			auth,
			spreadsheetId: registroID,
			range: pageName,
		});

		const datosRegistro = registroRows.data.values;
		//console.log('💥🟢  file: google.js:61  datosRegistro', datosRegistro);

		const datosRegistroFiltered = [];

		for (let i = 0; i < datosRegistro.length; i++) {
			let row = datosRegistro[i];
			let rowDate = row[7].split(' ');
			let rowYear = Number(rowDate[0].split('/')[2]);
			let configDay = Number(row[0].split('/')[0]);

			//Verifico el año (Porque la api me muestra datos del 2021 que no sé de dónde los saca) y luego Verifico qué día si realizó esta ventana
			if (rowYear === completeYear && configDay >= startDay && configDay <= finishDay) {
				datosRegistroFiltered.push(row[1]);
			}
		}
		//console.log('💥🟢  file: google.js:76  datosRegistroFiltered', datosRegistroFiltered);

		//---------------------------------- Obteniendo la información del excel del Registro de minutas
		// Read rows from spreadsheet
		const minutasRows = await googleSheets.spreadsheets.values.get({
			auth,
			spreadsheetId: minutasID,
			//range: pageName,
			range: year2,
		});
		const datosMinutas = minutasRows.data.values;
		//console.log('💥🟢  file: google.js:84  datosMinutas', datosMinutas);

		const datosMinutasFiltered = [];
		for (let i = 0; i < datosMinutas.length; i++) {
			let row = datosMinutas[i];
			let rowDate = row[7].split(' ');
			let rowYear = Number(rowDate[0].split('/')[2]);
			let rowDay = Number(rowDate[0].split('/')[0]);

			let rowHour = Number(rowDate[1]?.split(':')[0]);
			
			let resolution = row[9];
			
			console.log('💥🟢  file: google.js:95  startDay', startDay);
			if (resolution == '#APROBADOCAB' && rowYear === completeYear) {
				//console.log("HOLAAAAAAAAAAAA")
				console.log('💥🟢  file: google.js:95  rowDay', rowDay);
				console.log('💥🟢  file: google.js:97  rowHour', rowHour);
				 
				if (rowDay >= startDay && rowDay < finishDay) datosMinutasFiltered.push(row[1]);
				if (rowDay == startDay - 1 && rowHour >= 19) datosMinutasFiltered.push(row[1]);
				if (rowDay == finishDay && rowHour < 19) datosMinutasFiltered.push(row[1]);
			}
		}

		//----------------------------------

		//---------------------------------- Unifying output
		let response = { registro: datosRegistroFiltered, minutas: datosMinutasFiltered };
		//console.log('💥🟢  file: google.js:128  response', response);
		res.send(response);
	} catch (error) {
		console.log(error.stack);
		res.send('Error Back-End: ' + error.message);
	}
};

module.exports = {
	MyGoogle,
};
