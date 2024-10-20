loadScript("TRANSACCIONES.js");
loadScript("READ WRITE.js");
loadScript("SEGURIDAD.js");
loadScript("Config.js");


//---Bucle de Espera por Tarjeta y Acceso a la misma---//

var card;
var input;
var response;

	try{
		card = new Card();
		
		print("===========================================================");
		print("= Bienvenido al Sistema de Cajero del Comedor de la ETSISI=");
		print("===========================================================");
		
		//---Acceder a la Tarjeta---//
		
		// -Select
		var apdu = new ByteString("FF A4 00 00 01 06", HEX);
		response = card.plainApdu(apdu);
		//print("APDU SELECT_CARD SW: " + card.SW.toString(HEX));
	
		// -Autenticacion
		apdu = new ByteString("FF 20 00 00 03 FF FF FF", HEX);
		response = card.plainApdu(apdu);
		//print("APDU PRESENT_PSC SW: " + card.SW.toString(HEX));
		
		//---Comprobar por Modificaciones Ilegales---//

		if(!checkHASH(readAllContent(card),readHASH(card))){
			print("*** La tarjeta ha sido modificada ilegalmente y no se acepta ***");
			throw new Error("Tarjeta Ilegal");
		}
		
		//---Ver los datos del Usuario---//
		
		print("Usuario: "+ readOwner(card));
		print("Saldo: "+ readBalance(card))

		//---Hacer uso de las funcionalidades de la tarjeta---//

		do {
			print("============");
			print("= OPCIONES =");
			print("============");
			print("1 - Comprar Menu Completo con Bebida"); // 7,40
			print("2 - Comprar Menu Completo Sin Bebida");// 6,80
			print("3 - Comprar Menu Medio con Bebida"); // 6,00
			print("4 - Comprar Menu Medio sin Bebida"); // 5,40
			print("5 - Anadir Saldo");
			print("6 - Meter otra tarjeta");
			
			input = getOption();
			
			print("Introduce el numero de la opcion: " + input)
			
			switch(input){
			case "1":
				break;
			case "2":
				break;
			case "3":
				break;
			case "4":
				break;
			case "5":
				break;
			}
			
		} while(!input.equals("6"));
	} catch(error) {
		print(error.name + ": " + error.message);
		print("- Esperando por la tarjeta...");
	}	
//---------------Funciones Auxiliares---------------//

function loadScript(scriptName) {
    var scriptContent = load(scriptName);
    eval(scriptContent);  
}