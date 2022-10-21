/**
 * POMjs 1.00
 *
 * password-om.js
 *
 * Plain vanilla javascript for the "Öppet Moln" ("Open Cloud") random password
 * generator site (password.oppetmoln.se). For the sake of having a name, it
 * shall be POMjs. There's really nothing fancy going on here :-)
 *
 * Copyright 2022 Joaquim Homrighausen; All rights reserved.
 * Development sponsored by WebbPlatsen i Sverige AB
 * https://www.webbplatsen.se
 *
 * This file is part of POMjs. POMjs is free software.
 *
 * You may redistribute it and/or modify it under the terms of the
 * GNU General Public License version 2, as published by the Free Software
 * Foundation.
 *
 * POMjs is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the POMjs package. If not, write to:
 *  The Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor
 *  Boston, MA  02110-1301, USA.
 */
 
/* Some globals, to be filled by script */

var POM_cfgLanguage = 'noLang?';
var POM_cfgTitle = 'noTitle?';
var POM_cfgSlogan = 'noSlogan?';
var POM_cfgGenPasswordHint = 'noHint?';
const POM_strUppercase = POM_genAlphabet(true);
const POM_strLowercase = POM_genAlphabet(false);
const POM_strDigits = POM_genDigits();
const POM_strSpecialOne = '-._#$@%!';
const POM_strSpecialTwo = '"+(){}[]?&,*<>|:;^';

/* Easy customization of defaults, etc */
const POM_strUppercase_Default = true;
const POM_strLowercase_Default = true;
const POM_strDigits_Default = true;
const POM_strSpecialOne_Default = true;
const POM_strSpecialTwo_Default = false;
const POM_mkPasswordOnLoad = true;
const POM_minLength = 16;
const POM_maxLength = 256;
const POM_sliderStep = 8;
const POM_debug = false;

/* Generate some strings */
function POM_genAlphabet(isUpper = false) {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + (isUpper ? 65 : 97))).join('');
}
function POM_genDigits() {
    return [...Array(10)].map((_, i) => String.fromCharCode(i + 48)).join('');
}
/* Distill string down to unique characters by using a set */
function POM_distillString(s) {
    s = s.split('');
    s = new Set(s);
    s = [...s].join('+');
    return(s);
}
/* Escape special regex characters in string, from MDN */
function POM_escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/* Validate "manual input" */
function POM_validateNumInput() {
    let mkLengthSlider = document.getElementById('mk-password-len-slider');
    if (mkLengthSlider) {
        if (this.value === '') {
            this.value = POM_minLength;
        }
        mkLengthSlider.value = this.value;
        if (mkLengthSlider.value < POM_minLength) {
            mkLengthSlider.value = POM_minLength;
        } else if (mkLengthSlider.value > POM_maxLength) {
            mkLengthSlider.value = POM_maxLength;
        }
        this.value = mkLengthSlider.value;
    }
}
/* Validate "manual input" */
function POM_generatePassword() {
    let strengthP = document.getElementById('mk-password-strength');
    strengthP.style.background = 'inherit';
    strengthP.style.width = '0';
    strengthP.style.transition = 'none';
    let passwordField = document.getElementById('mk-password-field');
    passwordField.value = '';
    passwordField.classList.remove('mk-password-field-focus');
    let mkLengthField = document.getElementById('mk-length-field');
    if (POM_debug) {
        console.clear();
    }
    if (mkLengthField) {
        if (mkLengthField.value >= POM_minLength && mkLengthField.value <= POM_maxLength) {
            let passwordSource = '';
            if (document.getElementById('mk-uppercase-select').checked) {
                passwordSource += POM_strUppercase;
            } 
            if (document.getElementById('mk-special-one-select').checked) {
                passwordSource += (POM_strSpecialOne + POM_strSpecialOne);
            }
            if (document.getElementById('mk-digits-select').checked) {
                passwordSource += POM_strDigits;
            } 
            if (document.getElementById('mk-lowercase-select').checked) {
                passwordSource += POM_strLowercase;
            } 
            if (document.getElementById('mk-digits-select').checked) {
                passwordSource += POM_strDigits;
            } 
            if (document.getElementById('mk-special-two-select').checked) {
                passwordSource += (POM_strSpecialTwo + POM_strSpecialTwo);
            }
            if (passwordSource.length>0) {
                let passwordGen = '';
                let theChar = '';
                for (let i = 0; i < mkLengthField.value; i++) {
                    const charPos = Math.floor(Math.random() * passwordSource.length);
                    theChar = passwordSource[charPos];
                    passwordGen += theChar;
                }            
                passwordField.value = passwordGen;
                
                let scoreP = 0;/* Password strength score, max is 8 */
                let searchStr;
                let re;
                
                /* See if password contains uppercase characters */
                searchStr = '[' + POM_escapeRegExp(POM_strUppercase) + ']';
                if (POM_debug) {
                    console.log('Using ' + searchStr + ' to scan password');
                }
                re = new RegExp(searchStr);
                if (re.test(passwordGen)) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password contains UPPERCASE');
                    }
                } else {
                    if (POM_debug) {
                        console.log('Password does NOT contain UPPERCASE');
                    }
                }
                /* See if password contains lowercase characters */
                searchStr = '[' + POM_escapeRegExp(POM_strLowercase) + ']';
                if (POM_debug) {
                    console.log('Using ' + searchStr + ' to scan password');
                }
                re = new RegExp(searchStr);
                if (re.test(passwordGen)) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password contains lowercase');
                    }
                } else {
                    if (POM_debug) {
                        console.log('Password does NOT contain lowercase');
                    }
                }
                /* See if password contains digits characters */
                searchStr = '[' + POM_escapeRegExp(POM_strDigits) + ']';
                if (POM_debug) {
                    console.log('Using ' + searchStr + ' to scan password');
                }
                re = new RegExp(searchStr);
                if (re.test(passwordGen)) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password contains digits');
                    }
                } else {
                    if (POM_debug) {
                        console.log('Password does NOT contain digits');
                    }
                }
                /* See if password contains specialOne characters */
                searchStr = '[' + POM_escapeRegExp(POM_strSpecialOne) + ']';
                if (POM_debug) {
                    console.log('Using ' + searchStr + ' to scan password');
                }
                re = new RegExp(searchStr);
                if (re.test(passwordGen)) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password contains specialOne');
                    }
                } else {
                    if (POM_debug) {
                        console.log('Password does NOT contain specialOne');
                    }
                }
                /* See if password contains specialtwo characters */
                searchStr = '[' + POM_escapeRegExp(POM_strSpecialTwo) + ']';
                console.log('Using ' + searchStr + ' to scan password');
                re = new RegExp(searchStr);
                if (re.test(passwordGen)) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password contains specialTwo');
                    }
                } else {
                    if (POM_debug) {
                        console.log('Password does NOT contain specialTwo');
                    }
                }
                /* Bump score if password is > 7 characters */
                if (passwordGen.length > 7) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password >7 characters, buping score');
                    }
                }
                /* Bump score if password is > 15 characters */
                if (passwordGen.length > 15) {
                    scoreP++;
                    if (POM_debug) {
                        console.log('Password >15 characters, buping score');
                    }
                }
                /* Bump score if password is > 31 characters */
                if (passwordGen.length > 31) {
                    scoreP += 2;
                    if (POM_debug) {
                        console.log('Password >31 characters, buping score');
                    }
                }
                /* Bump score if password is > 63 characters */
                if (passwordGen.length > 63) {
                    scoreP += 4;
                    if (POM_debug) {
                        console.log('Password >63 characters, buping score');
                    }
                }
                /* Let's not overflooooow */
                if (scoreP > 8) {
                    scoreP = 8;
                }
                if (scoreP > 6) {
                    strengthP.style.background = '#27ce60';
                } else if (scoreP > 5) {
                    strengthP.style.background = '#27ae60';
                } else if (scoreP > 3) {
                    strengthP.style.background = '#FFC300';
                } else {
                    strengthP.style.background = '#C0392B';
                }
                strengthP.style.width = (scoreP * 12.5) + '%';
                strengthP.style.transition = 'width 0.3s ease-in';
            } 
        }
    }
}
/* Copy content of generated password field, if any, to clipboard */ 
function POM_copyPassword() {
    let passwordField = document.getElementById('mk-password-field');
    if (passwordField && passwordField.value.length > 0) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            /* Use "modern" method */
            navigator.clipboard.writeText(passwordField.value).then(function() {
                passwordField.classList.add('mk-password-field-focus');
            }, function(e) {
                alert("Could not copy text: " + e);    
            });
        } else {
            /* Use legacy method */
            var theText = document.createElement('textarea');
            theText.value = passwordField.value;
            theText.setAttribute('readonly', '');
            theText.style.position = 'absolute';
            theText.style.top = '-6969px';
            theText.style.left = '-6969px';
            document.body.appendChild(theText);
            theText.focus();
            theText.select();
            try {
                var goodCopy = document.execCommand('copy');
                if (goodCopy) {
                    passwordField.classList.add('mk-password-field-focus');
                } else {
                    alert('That did not work');
                }
            } catch(e) {
                alert('Could not copy text: ' + e.message);    
            }
            document.body.removeChild(theText);
        }
    }
}
/* Initialize */
function POM_initialSetup() {
    /* Setup, language strings, etc. Ugly, but it works :-) */
    if (navigator.language) {
        POM_cfgLanguage = navigator.language;
        if (POM_debug) {
            console.log("Language: " + POM_cfgLanguage);
        }
        let dashPos = POM_cfgLanguage.indexOf('-');
        if (dashPos && dashPos>0) {
            POM_cfgLanguage = POM_cfgLanguage.substring(0, dashPos);
        }
        POM_cfgLanguage = POM_cfgLanguage.toLowerCase();
    } else {
        POM_cfgLanguage = '???';
    }
    /* Add your translation here */    
    switch(POM_cfgLanguage) {
        case 'sv':
        case 'se':
            POM_cfgTitle = 'Slumpmässigt Lösenord';
            POM_cfgSlogan = 'Inga kakor, <span tyle="display:inline-block">ingen spårning.</span><br/>Bara lösenord.';
            POM_cfgGenPasswordHint = 'Generera lösenord';
            break;
        case 'de':
            /* Thank you Peter Hampf */
            POM_cfgTitle = 'Zufallsgenerator für Passwörter';
            POM_cfgSlogan = 'Keine Cookies, <span style="display:inline-block">keine Tracker.</span><br/>Nur Passwörter.';
            POM_cfgGenPasswordHint = 'Passwort generieren';
            break;            
        default:
            POM_cfgTitle = 'Random Password Generator';
            POM_cfgSlogan = 'No cookies, <span style="display:inline-block">no trackers.</span><br/>Just passwords.';
            POM_cfgGenPasswordHint = 'Generate password';
            break;
    }
    /* Paint "HTML" with language strings */
    document.getElementById('cfg-page-title').innerHTML = POM_cfgTitle;
    document.getElementById('cfg-page-slogan').innerHTML = POM_cfgSlogan;
    document.getElementById('cfg-page-lang').innerHTML = '[' + POM_cfgLanguage + ']';
    document.getElementById('mk-password-btn').title = POM_cfgGenPasswordHint;
    /* Set reasonable defaults */
    document.getElementById('mk-uppercase-select').checked = POM_strUppercase_Default;
    document.getElementById('mk-lowercase-select').checked = POM_strLowercase_Default;
    document.getElementById('mk-digits-select').checked = POM_strDigits_Default;
    document.getElementById('mk-special-one-select').checked = POM_strSpecialOne_Default;
    document.getElementById('mk-special-two-select').checked = POM_strSpecialTwo_Default;
    
    document.getElementById('mk-password-field').value = '';
    let mkPasswordSlider = document.getElementById('mk-password-len-slider');
    if (mkPasswordSlider) {
        mkPasswordSlider.value = POM_minLength;
        mkPasswordSlider.setAttribute("min", POM_minLength);
        mkPasswordSlider.setAttribute("max", POM_maxLength);
        mkPasswordSlider.step = POM_sliderStep;
    }
    document.getElementById('mk-length-field').value = POM_minLength;
    /* Paint "HTML" with password source */
    document.getElementById("gen-uppercase").innerText = POM_strUppercase;
    document.getElementById("gen-lowercase").innerText = POM_strLowercase;
    document.getElementById("gen-digits").innerText = POM_strDigits;
    document.getElementById("gen-special-one").innerText = POM_strSpecialOne;
    document.getElementById("gen-special-two").innerText = POM_strSpecialTwo;
    /* Add timestamp, for no good reason :) */
    document.getElementById("gen-timestamp").innerText = Date.now();
    /* Add some event handlers */
    document.getElementById('mk-password-len-slider').addEventListener("oninput", function() {
        let mkLengthField = document.getElementById('mk-length-field');
        if (mkLengthField) {
            mkLengthField.value = this.value;
            if (mkLengthField.value < POM_minLength) {
                mkLengthField.value = POM_minLength;
            } else if (mkLengthField.value > POM_maxLength) {
                mkLengthField.value = POM_maxLength;
            }
            this.value = mkLengthField.value;
        }
    });
    document.getElementById('mk-length-field').addEventListener("click", function() {
        this.select();
    });
    document.getElementById('mk-length-field').addEventListener("blur", POM_validateNumInput);
    document.getElementById('mk-length-field').addEventListener("change", POM_validateNumInput);
    document.getElementById('mk-password-btn').addEventListener("click", POM_generatePassword);
    document.getElementById('mk-password-field').addEventListener("click", POM_copyPassword);
    /* Possibly generate password on load */
    if (POM_mkPasswordOnLoad) {
        document.getElementById('mk-password-btn').click();
    }
}


/* Wait for things to be loaded */
if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    POM_initialSetup();
} else {
    document.addEventListener("DOMContentLoaded", POM_initialSetup);
}

/* end of file "password-om.js" */
