var ReadData;
var WriteData;

function readAllContent(card){
	//Leer Todo - Desde 00, 224 Bytes
	return read(card, "00 E0");
}

function readOwner(card){
	//Leer usuario - Desde 30-60, 48 Bytes
	return formatByteString(read(card, "70 30"));
}

function readBalance(card){
	//Leer saldo - Desde 80, 8 Bytes
	return parseFloat(read(card, "B0 08").bytes(00, 8).toString(ASCII));
}

function readHASH(card){
	//Leer HASH - Desde E0, 32 Bytes
	return read(card, "E0 20");
}

function read(card, dir){
	ReadData  = card.plainApdu(new ByteString("FF B0 00 "+dir, HEX));
	//print("APDU READ_CARD SW: " + card.SW.toString(HEX));
	return ReadData;
}

function writeHASH(card, hash){
	write(card,"E0", "20",hash);
}

function writeBalance(card, balance){
	write(card,"B0", "08",asciiToByteString(balance));
}

function write(card, dir, long, message){
    while (message.size < parseInt(long, 16)) {
        message = message.concat(new ByteString("2A", HEX));
    }

    WriteData = card.plainApdu(new ByteString("FF D0 00 " + dir + " " + long + " " + message, HEX));
    //print("APDU WRITE_CARD SW: " + card.SW.toString(HEX));
}

//---------------Funciones Auxiliares---------------//

function asciiToByteString(str) {
    return new ByteString(str, ASCII);
}

function formatByteString(byteStr) {
    var str = byteStr.toString(ASCII);
    var formattedStr = str.replace(/\*+/g, ',').replace(/,+$/, '');
    return formattedStr;
}

function writeNewUser(card,surname1,surname2,name){
	write(card,"20", "10",asciiToByteString(""));
	write(card,"30", "10",asciiToByteString("***CAFETERIA****"));
	write(card,"40", "10",asciiToByteString("*****ETSISI*****"));
	write(card,"50", "10",asciiToByteString(""));
	write(card,"60", "10",asciiToByteString("-----USUARIO----"));
	write(card,"70", "10",asciiToByteString(surname1.toUpperCase()));
	write(card,"80", "10",asciiToByteString(surname2.toUpperCase()));
	write(card,"90", "10",name.toUpperCase());
	write(card,"A0", "10",asciiToByteString("----SALDO-------"));
	writeBalance(card, "00000.00")
}