const template = document.createElement ("template");
template.innerHTML = `
<style>
    nav#navigation, div#main-container {
        color: ivory;
    }

    nav#navigation {
        background-color: #373024;
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
        width: calc(25% - 20px);
        text-align: center;
        height: 60px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: space-evenly;
        background-color: #42392A;
        cursor: pointer;
    }

    li.focused {
        border-bottom: 0px;
        background-color:  #806843;
        height: 60px;
    }

    div#main-container {
        background-color: #806843;
        display: flex;
        height: calc(100vh - 60px);
        min-height: calc(100vh - 60px);
        overflow-y: auto;
        padding-left: 10%;
        padding-right: 10%;
        font-size: 20px;

        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
    }

    img {
        width: 30px;
        height: 30px;
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
        this.addOnglet ("Home page", "star.png", "objective-eng.html");
        this.addOnglet ("Formation and Competences", "diplome.svg", "education-eng.html");
        this.addOnglet ("Works", "book.png", "experiences-eng.html", true);
        this.addOnglet ("About me", "women.png", "aboutme-eng.html");
    }

    addOnglet (nomOnglet, svg, htmlFile, dft=false) {        
        const path = "./assets/js/templates/html/";
        const svgpath = "./assets/js/templates/pictures/";
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

        let image = document.createElement ("img");
        image.src = svgpath + svg;
        li.appendChild (image);
        li.prepend (image.cloneNode (true));
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