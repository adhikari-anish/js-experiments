const CONT_WIDTH = 400;
const CONT_HEIGHT = 240;

function Carousel(wrapper) {

    //carousel container
    var container = document.querySelector('.carousel-container');
    container.style.width = CONT_WIDTH + "px";
    container.style.height = CONT_HEIGHT + "px";
    container.style.overflow = "hidden";
    container.style.position = "relative";

    //carousel wrapper img
    var img_coll = document.querySelectorAll('.carousel-image-wrapper img');
    var img_arr = Array.from(img_coll);

    img_arr.forEach(item => {
        item.style.width = CONT_WIDTH + "px";
        item.style.height = CONT_HEIGHT + "px";
        item.style.float = "left";
    });

    //carousel wrapper
    const WRAPPER_WIDTH = img_arr.length * CONT_WIDTH;

    var wrapper = document.querySelector('.carousel-image-wrapper');
    wrapper.style.width = WRAPPER_WIDTH + "px";
    wrapper.style.height = CONT_HEIGHT + "px";
    wrapper.style.marginLeft = 0 + "px";
    wrapper.style.position = "absolute";

    var leftArrow = document.createElement('div');
    container.appendChild(leftArrow);
    leftArrow.style.position = "absolute";
    leftArrow.zIndex = "5";
    leftArrow.style.top = 120 + "px";
    leftArrow.style.left = 0 + "px;"
    var lImg = document.createElement("img");
    lImg.setAttribute("src", "./images/left-arrow.png");
    lImg.setAttribute("height", "30");
    lImg.setAttribute("width", "30");
    lImg.setAttribute("alt", "left-arrow");
    leftArrow.append(lImg);

    var rightArrow = document.createElement('div');
    container.appendChild(rightArrow);
    rightArrow.style.position = "absolute";
    rightArrow.zIndex = "5";
    rightArrow.style.top = 120 + "px";
    rightArrow.style.right = 0 + "px";
    var rImg = document.createElement("img");
    rImg.setAttribute("src", "./images/right-arrow.png");
    rImg.setAttribute("height", "30");
    rImg.setAttribute("width", "30");
    rImg.setAttribute("alt", "right-arrow");
    rightArrow.append(rImg);

    //indicator
    var indicator = document.createElement('div');
    container.appendChild(indicator);
    indicator.style.position = "absolute";
    indicator.style.zIndex = "5";
    indicator.style.top = 210 + "px";
    indicator.style.left = 160 + "px";


    button1 = document.createElement("button");
    button1.style.height=10+'px';
    button1.style.width=10+'px'; 
    button1.style.marginRight = 5 + "px";
    button1.style.borderRadius = "50%";
    button2 = document.createElement("button");
    button2.style.height=10+'px';
    button2.style.width=10+'px'; 
    button2.style.marginRight = 5 + "px";
    button2.style.borderRadius = "50%";
    button3 = document.createElement("button");
    button3.style.height=10+'px';
    button3.style.width=10+'px'; 
    button3.style.marginRight = 5 + "px";
    button3.style.borderRadius = "50%";
    indicator.appendChild(button1);
    indicator.appendChild(button2);
    indicator.appendChild(button3);

    var buttonArr = [];
    buttonArr.push(button1);
    buttonArr.push(button2);
    buttonArr.push(button3);



    this.wrapper = wrapper;    
    var i = 0;
    var changer;
    this.hold = 2000;

    lImg.onclick = () => {
        if(i != 0) {
            clearInterval(changer);
            buttonArr[i].style.backgroundColor='white';
            buttonArr[i-1].style.backgroundColor='black';
            this.animateImage(i, i-1);
            i = i-1;
        }
    }

    rImg.onclick = () => {
        if(i != 2) {
            clearInterval(changer);
            buttonArr[i].style.backgroundColor='lightgray';
            buttonArr[i+1].style.backgroundColor='black';
            this.animateImage(i, i+1);
            i = i+1;
        }
    }

    this.setter = function() {
        changer = setInterval(() => {
            index = i;
            nextIndex = (i+1)%3;
            clearInterval(changer);
            this.animateImage(index, nextIndex);
            i = (i+1) % 3;

        }, 2000);
    }

    this.animateImage = function(cI, nI) {
        
        buttonArr[cI].style.backgroundColor='white';
        buttonArr[nI].style.backgroundColor='black';

        let animation = setInterval(() => {

            if(cI < nI) {
                this.wrapper.style.marginLeft = parseInt(this.wrapper.style.marginLeft,10) - ((nI - cI) * CONT_WIDTH)/100 + 'px';
                

                if(Math.abs(parseInt(this.wrapper.style.marginLeft,10)) >= nI * CONT_WIDTH) {
                    clearInterval(animation);
                    this.setter();
                }
            }
            else if(cI > nI) {
                this.wrapper.style.marginLeft = parseInt(this.wrapper.style.marginLeft,10) - ((nI - cI) * CONT_WIDTH)/100 + 'px';
                if(Math.abs(parseInt(this.wrapper.style.marginLeft,10)) <= nI*CONT_WIDTH) {
                    clearInterval(animation);
                    this.setter();
                }
            }
        }, 1);
    }
}

var wrapper = new Carousel(wrapper);
wrapper.setter();



