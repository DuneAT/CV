const template = document.createElement ("template");
template.innerHTML = `
<style>
    nav#navigation, div#main-container {
        color: ivory;
    }

    nav#navigation {
        background-color: rgb(40, 40, 40);
    }

    #ul-navigation {
        display: flex;
        list-style-type: none;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: flex-end;
        align-content: flex-start;
        -moz-padding-start: 0px;
        -webkit-padding-start: 0px;
        -khtml-padding-start: 0px;
        -o-padding-start: 0px;
        padding-start: 0px;
        padding: 0px;
        margin: 0px;
        height: 60px;
    }

    li.li-nav {
        width: calc(20% - 20px);
        border: outset 2px;
        text-align: center;
        height: 60px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        background-color: rgb(120, 120, 120);
    }

    li.focused {
        border-color: rgb(120,120,120);
        border-bottom: 0px;
        background-color: rgb(80, 80, 80);
        height: 60px;
    }

    div#main-container {
        background-color: rgb(80, 80, 80);
        display: flex;
        height: calc(100vh - 60px);
        min-height: calc(100vh - 60px);
        overflow-y: auto;
        padding-left: 1em;
        padding-right: 1em;
    }
</style>

<nav id="navigation">
    <ul id="ul-navigation">
    </ul>
</nav>
<div id="main-container">
</div>
`

class ContainerMultiOnglet extends HTMLElement {
    constructor () {
        super ();

        this.attachShadow ({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector ("#navigation").style.backgroundColor = document.querySelector ("body").style.backgroundColor;

        // pour ajouter un onglet :
        // this.addOnglet (mon-titre-onglet, fichier.html)
        this.addOnglet ("Objective", "objective-eng.html", true);
        this.addOnglet ("Formation and Competences", "education-eng.html");
        this.addOnglet ("Works", "experiences-eng.html");
        this.addOnglet ("About me", "aboutme-eng.html");
    }

    addOnglet (nomOnglet, htmlFile, dft=false) {        
        const path = "./assets/js/templates/html/";
        let ul = this.shadowRoot.querySelector ("#ul-navigation");

        let li = document.createElement ("li");
        li.classList.add ("li-nav");
        let content = "";
        this.importHTML (path + htmlFile, (data) => {
            content = data;
            if (dft) {
                this.shadowRoot.querySelector ("#main-container").innerHTML = content;
                li.classList.add ("focused");
            }
        });
        li.addEventListener ("click", ev => {
            this.shadowRoot.querySelectorAll ("li.focused").forEach (liClass => {
                liClass.classList.remove ("focused")
            })
            this.shadowRoot.querySelector ("#main-container").innerHTML = content;
            li.classList.add ("focused");
        });
        li.innerHTML = nomOnglet;
        ul.appendChild (li);
    }
    
    importHTML (path, fxCallback) {
        let request = new XMLHttpRequest ();
        request.open ("GET", path, true);
        request.send ();
        request.onloadend = () => {
            fxCallback (request.responseText)
        }
    }
}

customElements.define("container-multi-onglet", ContainerMultiOnglet);