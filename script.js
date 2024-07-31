const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
const button = document.getElementById("versionsButton");
let selectedVersion = ""; 


//styling
button.addEventListener('click', function() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
    button.style.borderRadius = "5px 5px 0px 0px";
});

window.onclick = function(event) {
    if (!event.target.matches('#versionsButton')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          button.style.borderRadius = "5px";
        }
      }
    }
}

//search verse
document.getElementById("search").addEventListener("click", () => {
    document.getElementById("verseText").innerHTML = "Loading... This might take a minute."
    fetchVerse(document.getElementById("verseInput").value, selectedVersion);
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        document.getElementById("verseText").innerHTML = "Loading... This might take a minute."
        fetchVerse(document.getElementById("verseInput").value, selectedVersion);
    }
})

const bibleVersions = {
    "English": [
      {"name": "21st Century King James Version (KJ21)", "id": "kj21"},
      {"name": "American Standard Version (ASV)", "id": "asv"},
      {"name": "Amplified Bible (AMP)", "id": "amp"},
      {"name": "Amplified Bible, Classic Edition (AMPC)", "id": "ampc"},
      {"name": "BRG Bible (BRG)", "id": "brg"},
      {"name": "Christian Standard Bible (CSB)", "id": "csb"},
      {"name": "Common English Bible (CEB)", "id": "ceb"},
      {"name": "Complete Jewish Bible (CJB)", "id": "cjb"},
      {"name": "Contemporary English Version (CEV)", "id": "cev"},
      {"name": "Darby Translation (DARBY)", "id": "darby"},
      {"name": "Disciples’ Literal New Testament (DLNT)", "id": "dlnt"},
      {"name": "Douay-Rheims 1899 American Edition (DRA)", "id": "dra"},
      {"name": "Easy-to-Read Version (ERV)", "id": "erv"},
      {"name": "EasyEnglish Bible (EASY)", "id": "easy"},
      {"name": "Evangelical Heritage Version (EHV)", "id": "ehv"},
      {"name": "English Standard Version (ESV)", "id": "esv"},
      {"name": "English Standard Version Anglicised (ESVUK)", "id": "esvuk"},
      {"name": "Expanded Bible (EXB)", "id": "exb"},
      {"name": "1599 Geneva Bible (GNV)", "id": "gnv"},
      {"name": "GOD’S WORD Translation (GW)", "id": "gw"},
      {"name": "Good News Translation (GNT)", "id": "gnt"},
      {"name": "Holman Christian Standard Bible (HCSB)", "id": "hcsb"},
      {"name": "International Children’s Bible (ICB)", "id": "icb"},
      {"name": "International Standard Version (ISV)", "id": "isv"},
      {"name": "J.B. Phillips New Testament (PHILLIPS)", "id": "phillips"},
      {"name": "Jubilee Bible 2000 (JUB)", "id": "jub"},
      {"name": "King James Version (KJV)", "id": "kjv"},
      {"name": "Authorized (King James) Version (AKJV)", "id": "akjv"},
      {"name": "Legacy Standard Bible (LSB)", "id": "lsb"},
      {"name": "Lexham English Bible (LEB)", "id": "leb"},
      {"name": "Living Bible (TLB)", "id": "tlb"},
      {"name": "The Message (MSG)", "id": "msg"},
      {"name": "Modern English Version (MEV)", "id": "mev"},
      {"name": "Mounce Reverse Interlinear New Testament (MOUNCE)", "id": "mounce"},
      {"name": "Names of God Bible (NOG)", "id": "nog"},
      {"name": "New American Bible (Revised Edition) (NABRE)", "id": "nabre"},
      {"name": "New American Standard Bible (NASB)", "id": "nasb"},
      {"name": "New American Standard Bible 1995 (NASB1995)", "id": "nasb1995"},
      {"name": "New Catholic Bible (NCB)", "id": "ncb"},
      {"name": "New Century Version (NCV)", "id": "ncv"},
      {"name": "New English Translation (NET)", "id": "net"},
      {"name": "New International Reader's Version (NIRV)", "id": "nirv"},
      {"name": "New International Version (NIV)", "id": "niv"},
      {"name": "New International Version - UK (NIVUK)", "id": "nivuk"},
      {"name": "New King James Version (NKJV)", "id": "nkjv"},
      {"name": "New Life Version (NLV)", "id": "nlv"},
      {"name": "New Living Translation (NLT)", "id": "nlt"},
      {"name": "New Matthew Bible (NMB)", "id": "nmb"},
      {"name": "New Revised Standard Version, Anglicised (NRSVA)", "id": "nrsva"},
      {"name": "New Revised Standard Version, Anglicised Catholic Edition (NRSVACE)", "id": "nrsvace"},
      {"name": "New Revised Standard Version Catholic Edition (NRSVCE)", "id": "nrsvce"},
      {"name": "New Revised Standard Version Updated Edition (NRSVUE)", "id": "nrsvue"},
      {"name": "New Testament for Everyone (NTFE)", "id": "ntfe"},
      {"name": "Orthodox Jewish Bible (OJB)", "id": "ojb"},
      {"name": "Revised Geneva Translation (RGT)", "id": "rgt"},
      {"name": "Revised Standard Version (RSV)", "id": "rsv"},
      {"name": "Revised Standard Version Catholic Edition (RSVCE)", "id": "rsvce"},
      {"name": "Tree of Life Version (TLV)", "id": "tlv"},
      {"name": "The Voice (VOICE)", "id": "voice"},
      {"name": "World English Bible (WEB)", "id": "web"},
      {"name": "Worldwide English (New Testament) (WE)", "id": "we"},
      {"name": "Wycliffe Bible (WYC)", "id": "wyc"},
      {"name": "Young's Literal Translation (YLT)", "id": "ylt"}
    ],
    "Spanish": [
      {"name": "La Biblia de las Américas (LBLA)", "id": "lbla"},
      {"name": "Biblia del Jubileo (JBS)", "id": "jbs"},
      {"name": "Dios Habla Hoy (DHH)", "id": "dhh"},
      {"name": "Nueva Biblia de las Américas (NBLA)", "id": "nbla"},
      {"name": "Nueva Biblia Viva (NBV)", "id": "nbv"},
      {"name": "Nueva Traducción Viviente (NTV)", "id": "ntv"},
      {"name": "Nueva Versión Internacional (NVI)", "id": "nvi"},
      {"name": "Nueva Versión Internacional (Castilian) (CST)", "id": "cst"},
      {"name": "Palabra de Dios para Todos (PDT)", "id": "pdt"},
      {"name": "La Palabra (España) (BLP)", "id": "blp"},
      {"name": "La Palabra (Hispanoamérica) (BLPH)", "id": "blph"},
      {"name": "Reina Valera Actualizada (RVA-2015)", "id": "rva-2015"},
      {"name": "Reina Valera Contemporánea (RVC)", "id": "rvc"},
      {"name": "Reina-Valera 1960 (RVR1960)", "id": "rvr1960"},
      {"name": "Reina Valera Revisada (RVR1977)", "id": "rvr1977"},
      {"name": "Reina-Valera 1995 (RVR1995)", "id": "rvr1995"},
      {"name": "Reina-Valera Antigua (RVA)", "id": "rva"},
      {"name": "Spanish Blue Red and Gold Letter Edition (SRV-BRG)", "id": "srv-brg"},
      {"name": "Traducción en lenguaje actual (TLA)", "id": "tla"}
    ]
  };

// Function to iterate over JSON and use addElement
function processBibleVersions(versions) {
    for (const [language, versionList] of Object.entries(versions)) {
        // Create and add a header for the language
        const header = document.createElement("h3");
        header.textContent = language;
        header.style.margin = "10px 0px 5px 10px";
        header.style.pointerEvents = "none";
        header.style.color = "lightgray"
        dropdownContent.appendChild(header);

        // Add the versions for the language
        versionList.forEach(version => {
            addElement(version.name, version.id);
        });
    }
}
  
// Call the function with sample JSON data
processBibleVersions(bibleVersions);

function addElement(name, bId) {
    // create a new <a> element
    const newA = document.createElement("a");
    newA.setAttribute("id", bId);

    // and give it some content
    const newContent = document.createTextNode(name);

    // add the text node to the newly created <a> element
    newA.appendChild(newContent);

    // add the newly created <a> element to the dropdown-content div
    dropdownContent.appendChild(newA);

    newA.addEventListener("click", () => {
        console.log("Selected version:", newA.id);
        selectedVersion = newA.id;
        button.innerHTML = `${newA.innerHTML} <i class="fa-solid fa-caret-down"></i>`;
        // dropdownContent.style.display = "none";
        button.style.borderRadius = "5px";
    });
}


// Random verse
async function fetchAndDisplayPassage() {
    // Get the passage input
    const passageInput = document.getElementById('verseInput').value;

    // Construct the URL with user input
    // const url = `https://labs.bible.org/api/?passage=${encodeURIComponent(passageInput)}&type=json`;
    const url =`https://labs.bible.org/api/?passage=random&type=json`

    try {
        // Fetch the JSON data
        const response = await fetch(url);
        const data = await response.json();

        // Check if the data is empty or not
        if (data.length === 0) {
            document.getElementById('verseText').innerHTML = 'No data found for the provided passage.';
            return;
        }

        // Process the data
        const text = data.map(entry => {
            return `<strong>${entry.bookname} ${entry.chapter}:${entry.verse}</strong> ${entry.text}`;
        }).join(' ');

        // Update the HTML
        document.getElementById('verseText').innerHTML = text;
    } catch (error) {
        console.error('Error fetching the Bible passage:', error);
        document.getElementById('verseText').innerHTML = 'Error fetching the passage.';
    }
}

async function fetchVerse(verse, version) {
    const encodedVerse = encodeURIComponent(verse);
    const encodedVersion = encodeURIComponent(version);
    
    const url = await fetch(`https://idktesting.onrender.com/proxy?url=https%3A%2F%2Fwww.biblegateway.com%2Fpassage%2F%3Fsearch%3D${encodedVerse}%26version%3D${encodedVersion}&className=passage-text`);
    const json = await url.json();
    
    try {
        if (json.contents && json.contents.length > 0) {
            // Join all contents with a line break
            const rawHtml = json.contents.join('<br>');
            const cleanedHtml = cleanHtml(rawHtml);
            document.getElementById("verseText").innerHTML = cleanedHtml;
            document.title = verse + " - Quick Bible"
        } else {
            document.getElementById("verseText").innerHTML = "Verse not found or error fetching data.";
        }
    } catch(error) {
        document.getElementById("verseText").innerHTML = "Verse not found or error fetching data."
    }
    // console.log(json);
}

function cleanHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // List of class names to remove
    const classesToRemove = ['footnotes', 'full-chap-link', "crossrefs", "footnote", "passage-other-trans", "crossreference", "reference"];

    classesToRemove.forEach(className => {
        const elements = doc.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    });

    return doc.body.innerHTML;
}

// fetchAndDisplayPassage()
// getVersions();
document.getElementById("settings").addEventListener('click', function() {
    togglePopup();
});

function togglePopup() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
}

// Set initial value for lightThemeEnabled in localStorage if not already set
if (localStorage.getItem('lightThemeEnabled') === null) {
    localStorage.setItem('lightThemeEnabled', 'false');
}

const lightThemeEnabled = localStorage.getItem('lightThemeEnabled') === 'true';

lightTheme(lightThemeEnabled);

document.getElementById("lightTheme").checked = lightThemeEnabled;

document.getElementById("lightTheme").addEventListener('change', function() {
    localStorage.setItem('lightThemeEnabled', this.checked.toString());
    
    lightTheme(this.checked);
    
    if (this.checked) {
        console.log("Checkbox is checked");
    } else {
        console.log("Checkbox is not checked");
    }
});

function lightTheme(activated) {
    if (activated) {
        document.body.style.backgroundColor = " rgb(241 241 241)"
        document.body.style.color = "black"
        document.getElementById("verseInput").style.borderWidth = "1px";
        document.getElementById("verseInput").style.borderColor = "black";
        document.getElementById("verseInput").style.borderStyle = "solid";
        document.querySelectorAll(".centered-div")[1].style.borderColor = "#5d5d5d";
        document.querySelectorAll(".centered-div")[1].style.backgroundColor = "rgb(250,250,250)"
        document.body.style.scrollbarColor = "#474747 #f1f1f1"
    } else {
        document.body.style.backgroundColor = "#1e1e1e"
        document.body.style.color = "rgb(243, 242, 242)"
        document.getElementById("verseInput").style.borderWidth = "0px";
        document.body.style.scrollbarColor = "#fdfdfd #1e1e1e"


        document.querySelectorAll(".centered-div").forEach(element => {
            element.style.borderColor = "lightgray";
            element.style.backgroundColor = "rgb(40 57 63 / 0%)"
        });
    }
}

document.getElementById("size").addEventListener('change', function() {
    if (this.value <= 50) {
        document.getElementById("verseText").style.fontSize = this.value + "px"
    } else {
        console.log("Noooo")
    }
})

// Get the button
var scrollButton = document.getElementById("scrollButton");

// Show the button when the user scrolls down 100px from the top of the document
document.body.addEventListener('scroll', function(){
    if (document.body.scrollTop < document.querySelectorAll(".centered-div")[1].clientHeight + 30) {
        scrollButton.style.bottom = "-60px"; // Hide button
    } else {
        scrollButton.style.bottom = "20px"; // Show button
    }
});

// Scroll to the top of the document when the button is clicked
scrollButton.onclick = function() {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
};

