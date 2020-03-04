var button = document.getElementById('copy')

function copyStringToClipboard(str) {
    // Create new element
    var el = document.createElement('textarea')
    // Set value (string to be copied)
    el.value = str
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '')
    el.style = {
        position: 'absolute',
        left: '-9999px'
    }
    document.body.appendChild(el)
    // Select text inside element
    el.select()
    // Copy text to clipboard
    document.execCommand('copy')
    // Remove temporary element
    document.body.removeChild(el)
}

button.addEventListener('click', function () {
    button.innerHTML = "haha"
    copyStringToClipboard("haha")
})

var snippets = {
    "Javascript": {
        function: `function test() {
    return("successfull");
}`,
        variable: `var test = "successfull";`
    },
    "Html": {
        head: `<head></head>`,
        body: `<body>
    <div></div>
</body>`
    }
}



$.each(snippets, function (key, value) {
    $("#languages_list").append('<li><a href="#", onclick="changeSelectedLanguage(\'' +key+ '\')">' +key+ '</a></li>');
})
