function view(formulaText) {
    //var formulaText = "2Mg2O2"
    var form = []
    f.innerHTML = ""

    for (var i = 0; i < formulaText.length; i++) {
        var char = formulaText[i]
        var lastType = "space"
        var len = form.length
        console.log(len);
        if (len > 0) lastType = form[len-1][0]

        if (isNaN(parseInt(char))) {
            switch (char) {
                case ' ':
                    if (lastType != "space") form.push(["space"])
                    break;
                case '/':
                    form.push(["sup",""])
                    break;
                case '+':
                case '-':
                    if (lastType == 'sup' && form[len-1][1] == "") {
                        form[len-1][1] += char
                    } else {
                        if (lastType != "space") form.push(["space"])
                        form.push(["text",char])
                        form.push(["space"])
                    }
                    break;
                default:
                    switch (lastType) {
                        case 'text':
                            form[len-1][1] += char
                            break;
                        default:
                            form.push(["text", char])
                    }
                break;
            }
        } else {
            switch (lastType) {
                case 'sup':
                    form[len-1][1] += char
                    break;
                case 'sub':
                    form[len-1][1] += char
                    break;
                case 'space':
                    form.push(["count", char])
                    break
                case 'count':
                    form[len-1][1] += char
                    break;
                case 'text':
                    form.push(["sub", char])
            }
        }
    }
    console.log(form)
    form.map((e) => {
        var n = ""
        switch (e[0]) {
            case 'space':
                n = " "
                break;
            default:
                n = `<${e[0]}>${e[1]}</${e[0]}>`
        }
        f.innerHTML += n
    })
}
//view("45Ag5O2/+5 + 6H/-1Cl = AgCl + H2O")
