/**
 * Copy a string to clipboard
 *
 * @param str {String} the string to be copied
 */
function copyStringToClipboard(str) {
    var el = document.createElement('textarea')
    el.value = str
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '')
    el.style = {
        position: 'absolute',
        left: '-9999px'
    }
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

/**
 * Multidimensional array containing all snippets
 *
 * First dimension : language name
 * Second dimension : variables containing snippets
 */
var snippets = {
    "Javascript": {

        "Copy string to clipboard": `function copyStringToClipboard(str) {
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
}`,

        "Lazy loading image": `!function(window){
  var $q = function(q, res){
        if (document.querySelectorAll) {
          res = document.querySelectorAll(q);
        } else {
          var d=document
            , a=d.styleSheets[0] || d.createStyleSheet();
          a.addRule(q,'f:b');
          for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
            l[b].currentStyle.f && c.push(l[b]);

          a.removeRule(0);
          res = c;
        }
        return res;
      }
    , addEventListener = function(evt, fn){
        window.addEventListener
          ? this.addEventListener(evt, fn, false)
          : (window.attachEvent)
            ? this.attachEvent('on' + evt, fn)
            : this['on' + evt] = fn;
      }
    , _has = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
    ;

  function loadImage (el, fn) {
    var img = new Image()
      , src = el.getAttribute('data-src');
    img.onload = function() {
      if (!! el.parent)
        el.parent.replaceChild(img, el)
      else
        el.src = src;

      fn? fn() : null;
    }
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
       rect.top    >= 0
    && rect.left   >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

    var images = new Array()
      , query = $q('img.lazy')
      , processScroll = function(){
          for (var i = 0; i < images.length; i++) {
            if (elementInViewport(images[i])) {
              loadImage(images[i], function () {
                images.splice(i, i);
              });
            }
          };
        }
      ;
    // Array.prototype.slice.call is not callable under our lovely IE8
    for (var i = 0; i < query.length; i++) {
      images.push(query[i]);
    };

    processScroll();
    addEventListener('scroll',processScroll);

}(this);`
    },

    "Html": {

        "Markup example": `<form id="myForm" action="#" method="post">

  <div>
    <label for="name">Text Input:</label>
    <input type="text" name="name" id="name" value="" tabindex="1">
  </div>

  <div>
    <h4>Radio Button Choice</h4>

    <label for="radio-choice-1">Choice 1</label>
    <input type="radio" name="radio-choice" id="radio-choice-1" tabindex="2" value="choice-1">

    <label for="radio-choice-2">Choice 2</label>
    <input type="radio" name="radio-choice" id="radio-choice-2" tabindex="3" value="choice-2">
  </div>

  <div>
    <label for="select-choice">Select Dropdown Choice:</label>
    <select name="select-choice" id="select-choice">
      <option value="Choice 1">Choice 1</option>
      <option value="Choice 2">Choice 2</option>
      <option value="Choice 3">Choice 3</option>
    </select>
  </div>

  <div>
    <label for="textarea">Textarea:</label>
    <textarea cols="40" rows="8" name="textarea" id="textarea"></textarea>
  </div>

  <div>
    <label for="checkbox">Checkbox:</label>
    <input type="checkbox" name="checkbox">
  </div>

  <div>
    <input type="submit" value="Submit">
  </div>

</form>`,
    },

    "CSS": {

        "Fluid Typographie": `html {
  font-size: 16px;
}
@media screen and (min-width: 320px) {
  html {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
}
@media screen and (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}`,
      "Top Shadow" : `body::before {
  content: "";
  position: fixed;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);
  z-index: 100;
}`,
    },

    "PHP": {

        "Count Execution Time": `$execution_time = microtime(); // Start counting

// Your code

$execution_time = microtime() - $execution_time;
printf('It took %.5f sec', $execution_time);`,

        "Get Current File Name": `<?php
    $pageName = basename($_SERVER['PHP_SELF']);
?>`,
    }
}

/**
 * Change selected language in app and fill the snippets list with corresponding ones
 *
 * @param language {String} new selected language
 */
function changeSelectedLanguage(language) {

    document.getElementById("selected_language").innerHTML = "Selected Language : " + language
    $("#snippets_list").empty()

    // fill the snippets list with snippets from selected language
    $.each(snippets[language], function (key, val) {
        $("#snippets_list").append('<li><a href="#" id=\'' + key + '\'>' + key + '\</a></li>')

        var currentSnippet = document.getElementById(key)
        currentSnippet.addEventListener('click', function() {
            copyStringToClipboard(val)
        })
    })
}

// fill the language list with languages from the snippets tab
$.each(snippets, function (key, value) {
    $("#languages_list").append('<li><a href="#", onclick="changeSelectedLanguage(\'' + key + '\')">' + key + '</a></li>')
})
