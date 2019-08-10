async function translate(translateTo, text, translateFrom = 'auto') {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + translateFrom + "&tl=" + translateTo + "&dt=t&q=" + encodeURI(text);
    
    const response = await fetch(url);
    const data = await response.json();
    var result = "";
    for(var i = 0; i < data[0].length; i++) {
        result+=data[0][i][0]+" ";
    }
    return {
        translateFrom: data[2],
        translateTo: translateTo,
        result: result,
        text: text
    };
}
