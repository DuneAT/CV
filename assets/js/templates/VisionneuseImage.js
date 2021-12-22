import { getJsonImage } from "../scriptGallery.js";

const template = document.createElement ("template");
template.innerHTML = `
<style>
    div#main-container {
        background-color: #806843;
        display: flex;
        height: calc(100vh);
        min-height: calc(100vh);
        overflow-y: auto;
        padding-left: 10%;
        padding-right: 10%;
        font-size: 20px;

        flex-direction: column;
        flex-wrap: nowrap;
    }

    img.img-vizualisation {
        width: 100%;
        padding-bottom: 10px;
    }

    img.main-image-visualiseuse {
        max-height: 80vh;
        max-width: 90%;
    }

    div.container-vizualisation {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        width: 15%;
        overflow-y: auto;
        height: 80vh;
        min-height: 50vh;
    }

    div.container-rubrique {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    div.main-visualiseuse {
        width: 80%;
        text-align: center;
    }
</style>

<div id="main-container">
    <a href="./index.html">home</a>
</div>
`

class VisonneuseImage extends HTMLElement {
    constructor () {
        super ();

        this.attachShadow ({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        let content = getJsonImage ()
        console.log (content);

        // création d'une rubrique

        Object.keys (content).forEach (value => {
            let rubrique = this.addRubrique (value);

            content[value].forEach (img => {
                this.addImageToRubrique (rubrique, img.image, img.description)
            })
        })
        // let rubrique1 = this.addRubrique ("Onirique");
        // let rubrique2 = this.addRubrique ("Inacceptable");
        // this.addImageToRubrique (rubrique2, ["image0.png","image1.png","image2.png","image3.png","image4.png","image5.png","image6.png","image7.png","image8.png","image9.png","image10.png","image11.png","image12.png","image13.png","image14.png","image15.png","image16.png","image17.png","image18.png","image19.png","image20.png","image21.png","image22.png","image23.png","image24.png"]);
        // this.addImageToRubrique (rubrique1, "Bae.png")
    }

    addRubrique (rubrique) {
        const pattern = `
            <h2>${rubrique}</h2>
            <div class="container-rubrique" id="${rubrique.replaceAll (" ", "-")}">
                <div class="main-visualiseuse">
                    <img class="main-image-visualiseuse">
                    <div class="main-image-description"></div>
                </div>
                <div class="container-vizualisation">
                </div>
            </div>
        `

        let container = document.createElement ("template");
        container.innerHTML = pattern;
        this.shadowRoot.querySelector ("#main-container").appendChild (container.content.cloneNode (true));

        return rubrique;
    }

    addImageToRubrique (rubrique, image, description) {
        const path = "./assets/pictures/";
        let htmlImg = document.createElement ("img");
        htmlImg.src = path + image;
        htmlImg.classList.add ("img-vizualisation");
        htmlImg.addEventListener ("click", ev => {
            this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
                .querySelector (".main-visualiseuse > img").src = path + image;
            this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
                .querySelector (".main-image-description").innerHTML = description;
        });
        if (this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
                            .querySelector (".main-visualiseuse > img").src === "") {
            this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
                .querySelector (".main-visualiseuse > img").src = path + image;
            this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
                .querySelector (".main-image-description").innerHTML = description;
        }
        this.shadowRoot.querySelector ("#" + rubrique.replaceAll (" ", "-"))
            .querySelector (".container-vizualisation").appendChild (htmlImg);
    }
}

customElements.define("visionneuse-image", VisonneuseImage);