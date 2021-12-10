const template = document.createElement ("template");
template.innerHTML = `
<style>
    ul {
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
    }

    li {
        padding: 1em;
        width: calc(20% - 20px);
        border: outset 2px;
        text-align: center;
    }

    li.focused {
        border-color: grey;
        border-bottom: 0px;
        background-color: rgb(230, 230, 230);
    }

    div#main-container {
        background-color: rgb(230, 230, 230);
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

        // pour ajouter un onglet :
        // this.addOnglet (mon-titre-onglet, fichier.html)
        this.addOnglet ("Mon Parcours", "monParcours.html", true);
        this.addOnglet ("Experience Professionnelle", "experiencePro.html");
        this.addOnglet ("A propos de moi", "aboutMe.html");
        this.addOnglet ("Experience Professionnelle", "experiencePro.html");
        this.addOnglet ("A propos de moi", "aboutMe.html");
    }

    addOnglet (nomOnglet, htmlFile, dft=false) {        
        const path = "./assets/js/templates/html/";
        let ul = this.shadowRoot.querySelector ("#ul-navigation");

        let li = document.createElement ("li");
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