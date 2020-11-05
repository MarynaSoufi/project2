(()=> {
    const app = {        
        init(){
            console.log("Script is running!");
            this.data = linup.sort((a,b) => a.artist[0].name > b.artist[0].name ? 1: -1);//sorted data
            this.header = document.querySelector(".header");
            this.createNavigation();
            this.lastA = document.querySelector("li:last-child");
            this.lastA.classList.add("btn");
            this.myA = document.querySelectorAll(".navigation nav ul li a");
            this.myUl = document.querySelector("ul");
            this.lineUp = document.querySelector("ul :nth-child(2) a");
            this.home = document.querySelector("ul :nth-child(1) a");
            this.container = document.querySelector(".container");
            this.logo = document.querySelector(".logo");
            this.first = document.querySelector(".sort :nth-child(2)");
            this.myPicture = document.querySelectorAll(".pic");
            this.target = 1625148000000;            
            this.info_link = document.querySelectorAll(".info-link");
            this.setClock();
            

            
        
            if(window.location.pathname === "/app/line.html") {
                this.createLinUp();
                this.changeColor();
                this.alfabet();
                this.createFooter();
                this.createInfo();
                this.createMore();
                this.createNews();
                this.createModal();
                //this.viewDay();
                this.clickModal();
                this.createShare();
                
            }
            
        },
        createNavigation () {
            const mainDiv = document.createElement("div");
            mainDiv.classList = ("navigation");
            this.header.appendChild(mainDiv);
            const mainNav = document.querySelector(".navigation");
            const myNav = document.createElement("nav");
            mainNav.appendChild(myNav);
            const myUl = document.createElement("ul");
            myNav.appendChild(myUl);
            for (let i = 0; i < navigation.length; i++){
                //console.log(navigation[i].link);
                const myLi = document.createElement("li");
                myUl.appendChild(myLi);
                const myA = document.createElement("a");
                myA.setAttribute("href", `${navigation[i].link}`);
                myA.innerText = navigation[i].name.toUpperCase();
                myLi.appendChild(myA);
            }
        },
        createLinUp(){
            const overzicht = document.createElement('div');
            overzicht.classList.add("sort");
            const overzichtH = document.createElement('h3');
            overzichtH.textContent = "Overzicht A-Z";
            
            overzicht.appendChild(overzichtH);
            overzichtH.classList.add = ("view");
            this.chooseDay(overzicht);
            document.body.appendChild(overzicht);
            const container = document.createElement("div");
            document.body.appendChild(container);
            container.classList.add("container");
            
            for (let i of this.data){
                //console.log(i.from);
                const div = document.createElement("div");
                div.style.width = "33%";
                div.style.height = "290px";
                div.style.backgroundPosition = "50% 50%";
                div.setAttribute("data", `${i.id}`);
                div.classList.add("pic");        
                container.appendChild(div);
                const place = document.createElement("h2");
                place.textContent = `${i.place.name}`;
                const dag = document.createElement("h3");
                dag.textContent = this.getDays(i.from);
                let date = new Date(i.from);
                div.setAttribute("id", `${date.getDay()}`);
                div.appendChild(dag);
                div.appendChild(place);
                for (let j of i.artist) {
                    const name = document.createElement("h1");
                    name.textContent = `${j.name}`;
                    div.appendChild(name);
                    for (let b of j.picture) {
                        div.style.backgroundImage = `url("${b.small}")`;
                    }
                    
                }
               
            }
            
        },
        viewDay(id){
            const pic = document.querySelectorAll(".pic");
            console.log(pic);
            pic.forEach(function(e) {
                console.log(e);
                let idH = e.getAttribute("id");
                console.log(id);
                e.style.display = !id || idH === id ? "block" : "none" ;
            });           
        },        
        getDays(a) {
            let d = new Date(a);
            let dag = d.getDay();
            if(dag == 0) {
                return "Zondag";
            }else if(dag == 1) {
                return "Mandag";
            }else if(dag == 2) {
                return "Dinsdag";
            }else if(dag == 3) {
                return "Woensdag";
            }else if (dag == 4) {
                return "Donderdag";
            }else if (dag == 5) {
                return "Vrijdag";
            }else if (dag == 6){
                return "Zaterdag";
            }
        },
        getNameOfTheDay(number) {
            if(number == 0) {
                return "Zondag";
            }else if(number == 1) {
                return "Mandag";
            }else if(number == 2) {
                return "Dinsdag";
            }else if(number == 3) {
                return "Woensdag";
            }else if (number == 4) {
                return "Donderdag";
            }else if (number == 5) {
                return "Vrijdag";
            }else if (number == 6){
                return "Zaterdag";
            }
        },
        chooseDay(a){
            let arr = [];
            for (let i of linup){
                const b = new Date(i.from);
                if (!arr.includes(b.getDay())) {
                    arr.push(b.getDay());

                }
            }
            for (let j of arr){
                //console.error(j);
                const h3 = document.createElement("h3");
                h3.setAttribute("id", `${j}`);
                let p = h3.getAttribute("id");
                //console.log(`id = ${p}`);
                //const myText = this.getDays(j);
                h3.innerText = this.getNameOfTheDay(p);
                //console.log(h3);
                a.appendChild(h3);
            }
            
        },
       
        changeColor() {
            this.lineUp.style.color = "black";
        },
        alfabet() {
            const filters = document.querySelectorAll(".sort h3");
            filters.forEach(f => {
                f.addEventListener("click", (n) => {
                    filters.forEach(ff => {
                        if(ff.innerText !== this.innerText){
                            ff.style.color = "rgb(0, 0, 255)";
                        }                        
                    });
                    n.target.style.color = "black";
                    const id = n.target.getAttribute("id");
                    this.viewDay(id);
                });
            });  
        },
       
        updateClock(){
            const days = document.querySelector(".day");
            const hours = document.querySelector(".hour");
            const minutes = document.querySelector(".minute");
            const seconds = document.querySelector(".second");
            const curr = this.target - Date.parse(new Date());
            let t = this.dhm(curr);
                days.textContent = `${t.days} DAGEN `;
                hours.textContent = `${t.hours}H `;
                minutes.textContent = `${t.minutes}M `;
                seconds.textContent = `${t.seconds}S`;
               
        },
        setClock() {
            const timer_show = document.createElement("div");
            timer_show .setAttribute("id", "timer");
            //document.body.appendChild(timer_show);
            document.body.insertBefore(timer_show, this.container);
           
            for(let i = 0; i <4;i++){
                let span = document.createElement("span");
                timer_show.appendChild(span);
            }
            spans = document.querySelectorAll("span");
            spans.forEach(function(e,i) {
                if(i == 0) {
                    e.classList.add("day");
                }else if(i == 1){
                    e.classList.add("hour");
                }else if(i == 2){
                    e.classList.add("minute");
                }else {
                    e.classList.add("second");
                }
            });
            setInterval(this.updateClock.bind(this), 1000); 
        },
        dhm(ms){
            days = Math.floor(ms / (24*60*60*1000));
            if (days <=9) {
                days = "0" + days;
            }
            daysms=ms % (24*60*60*1000);
            hours = Math.floor((daysms)/(60*60*1000));
            if (hours <=9) {
                hours = "0" + hours;
            }
            hoursms=ms % (60*60*1000);
            minutes = Math.floor((hoursms)/(60*1000));
            if (minutes <=9) {
                minutes = "0" + minutes;
            }
            minutesms=ms % (60*1000);
            seconds = Math.floor((minutesms)/(1000));
            if (seconds <=9) {
                seconds = "0" + seconds;
            }
            return {
                days,
                hours,
                minutes,
                seconds
              };
        }, 
        createFooter() {
            const footer = document.createElement("footer");
            const divSocial = document.createElement("div");
            const ulSocial = document.createElement("ul");
            const myInfo = document.createElement("div");
            const info = document.createElement("div");
            const more = document.createElement("div");
            const news = document.createElement("div");
            news.classList.add("news");
            more.classList.add("more");
            info.classList.add("info");

            const infoH = document.createElement("h4");
            const moreH = document.createElement("h4");
            const newsH = document.createElement("h4");
            const newP = document.createElement("p");
            const infoUl = document.createElement("ul");
            newP.textContent = "Subscribe to our newsletter to stay tuned to the latest news.";
            newsH.textContent = "NEWSLETTER";
            moreH.textContent = "KNOW MORE?";
            infoH.textContent = "INFO";
            info.appendChild(infoH);
            info.appendChild(infoUl);
            more.appendChild(moreH);
            news.appendChild(newsH);
            newsH.appendChild(newP);

            myInfo.classList.add("my-info");
            myInfo.appendChild(info);
            myInfo.appendChild(more);
            myInfo.appendChild(news);
            divSocial.appendChild(ulSocial);
            divSocial.appendChild(myInfo);
            divSocial.classList.add("social");
            footer.appendChild(divSocial);
            document.body.appendChild(footer);
            //create links sosial
            for(let i of social) {
                const link = document.createElement("li");
                link.classList.add("social-li");
                const a = document.createElement("a");
                a.classList.add("social-li__link");
                a.setAttribute("href", `${i.link}`);
                const img = document.createElement("img");
                img.width = 40;
                img.height = 40;
                img.src = i.pictuteUrl;
                a.appendChild(img);
                link.appendChild(a);
                ulSocial.appendChild(link);
            }
            
        },
        //create navigation info 
       
        createInfo() {
            const arr = ["About Rock Werchter", "Contact", "Press website", "Conditions of sale", "Green", "Disclaimer", "Privacy policy", "Cookies", "Thanks to"];
            const infoUl = document.querySelector(" .info ul");
            for( let i = 0; i < arr.length;i++) {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.setAttribute("href", "#");
                a.textContent = `${arr[i]}`;
                li.appendChild(a);
                infoUl.appendChild(li);
                a.classList.add("info-link");
              
            }
            this.info_link.forEach(function(e, i) {
                console.error(e);
                console.log(i);
                if(i == 0){
                    e.textContent = "About Rock Werchter";
                }else {
                    e.innerText = "123";
                }
            });
        },
        createMore() {
            const arr = ["Tickets", "At the festival site", "How to get there?", "Camping", "Frequently asked questions"];
            const ul = document.createElement("ul");
            const more = document.querySelector(".more");
            more.appendChild(ul);
            for( let i = 0; i < arr.length; i++) {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.setAttribute("href", "#");
                a.textContent = `${arr[i]}`;
                li.appendChild(a);
                ul.appendChild(li);
                a.classList.add("info-link");
            }
        },
        createNews() {
            const news = document.querySelector(".news");
            const form = document.createElement("form");
            const input = document.createElement("input");
            const submit = document.createElement("input");
            form.setAttribute("method", "post");
            input.setAttribute("type", "email");
            input.setAttribute("placeholder", "Email");
            input.classList.add("input");
            submit.classList.add("submit");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "Submit");
            form.appendChild(input);
            form.appendChild(submit);
            news.appendChild(form);
        },
        createModal() {
            for (let i of this.data){
                const myModal = document.createElement("div");//modal window
                myModal.setAttribute("data", `${i.id}`);
                const content = document.createElement("div");//modal content
                content.classList.add("modal-content");
                btn = document.createElement("button");
                btn.classList.add("modal-symbol"); 
                btn.textContent = "X";
                myModal.appendChild(btn);
                myModal.appendChild(content);
                modalSocial = document.createElement("div");//social links
                modalSocial.classList.add("modal-social");
                modalSocialH3 = document.createElement("h3");
                modalSocialH3.classList.add("modal-title");
                modalSocialH3.textContent = "KNOW MORE?";
                modalSocialUl = document.createElement("ul");
                modalSocial.appendChild(modalSocialH3);
                modalSocial.appendChild(modalSocialUl);
                const image = document.createElement("div");
                image.classList.add("my-modal-image");
                const h1 = document.createElement("h1");
                const h2 = document.createElement("h2");
                const h3 = document.createElement("h3");
                h2.textContent = `${i.place.name}`;
                h3.textContent = this.getDays(i.from);
                image.appendChild(h1);
                image.appendChild(h3);
                image.appendChild(h2);
                const wrapper = document.createElement("div");
                wrapper.classList.add("wrap");
                content.appendChild(image);
                content.appendChild(wrapper);
                myModal.classList.add("my-modal");
                
                
                for( let j of i.artist) {
                    h1.innerText = `${j.name}`;
                    document.body.appendChild(myModal);
                    const p = document.createElement("p");
                    p.textContent = `${j.synopsys}`;
                    wrapper.appendChild(p);
                    for (let b of j.picture) {
                        image.style.backgroundImage = `url("${b.small}")`;
                    }
                    for(let c of j.media) {
                        const video = document.createElement("iframe");
                        video.setAttribute("src", `${c.sourceId}`);
                        wrapper.appendChild(video);
                    }
                    for(let d in j.social) {
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        a.setAttribute("href",`${j.social[d]}`);
                        a.innerText = `${j.social[d]}`;
                        li.appendChild(a);
                        modalSocialUl.appendChild(li);
                    }
                   
                }
                wrapper.appendChild(modalSocial);
                
            }
            
        },
        viewModal(value) {
            const modal = document.querySelectorAll(".my-modal");
            modal.forEach(function(e) {
               const data = e.getAttribute("data");
               e.style.display = data === value? "block" : "none" ;
              
            }); 
        },
        //modalWindow
        clickModal() {
            const btn = document.querySelectorAll(".modal-symbol");
            console.log(btn);
            const fotos = document.querySelectorAll(".pic");
            const modal = document.querySelectorAll(".my-modal");
            fotos.forEach(f => {
                f.addEventListener("click", (n) => { 
                    
                    const value = n.target.getAttribute("data");
                    console.log(value);
                    this.viewModal(value);
                });
            }); 
            modal.forEach(e=> {
                e.addEventListener("click",(n) => {
                    if (n.target == e) {
                        e.style.display = "none";
                    }
                });
            });
            btn.forEach(b=> {
                b.addEventListener("click",(n)=> {
                    modal.forEach (m => {
                        m.style.display = "none";
                    });

                });
            });
                    
              
        }

        

      
    };
    
    app.init();
})();