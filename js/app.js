$(function() {
    let model = {
        curCat : null,
        catArr : [
            {
                name: 'Simon',
                index: 0,
                imgURL: 'http://sites.psu.edu/siowfa15/wp-content/uploads/sites/29639/2015/10/cat.jpg'
            },{
                name: 'Taylor',
                index: 0,
                imgURL: 'https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg'
            },{
                name: 'Paul',
                index: 0,
                imgURL: 'https://metrouk2.files.wordpress.com/2017/10/523733805-e1508406361613.jpg?quality=80&strip=all'
            },{
                name: 'Jamie',
                index: 0,
                imgURL: 'https://fthmb.tqn.com/UysbMNXu5oQb54kHjOj6Kq-WIBs=/2121x1414/filters:fill(auto,1)/Calicocat-GettyImages-638741138-5931a1125f9b589eb48ff29d.jpg'
            },{
                name: 'Haley',
                index: 0,
                imgURL: 'https://fthmb.tqn.com/mJroA0u-j7ROts63xY4oJkosaMs=/3372x2248/filters:no_upscale():fill(transparent,1)/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg'
            }
        ]
    };

    let octopus = {
        init : function() {
            this.setCurCat(0);
            listView.init();
            catView.init();
            modalView.init();
        },

        getCurCat : function() {
            return model.curCat;
        },

        getCatArr : function() {
            return model.catArr;
        },
        
        incrementCounter : function() {
            model.curCat.index++;
            catView.render();
        },

        setCurCat : function (index) {
            model.curCat = model.catArr[index];
        },

        addNewCat : function(name, url) {
            model.catArr.push(
            {
                name: name,
                index: 0,
                imgURL: url
            })
            listView.render();
            modalView.render();
        },

        editCat : function(catIndex, name, url) {
            if(url){
                model.catArr[catIndex].imgURL = url;
            }
            model.catArr[catIndex].name = name;
            catView.render();
            listView.render();
            modalView.render();
        }

    };

    let catView = {
        init : function () {
            this.catElem = $('#cat-container');
            this.catNameElem = $('#cat-name');
            this.catImgElem = $('#cat-img');
            this.catClicksElem = $('#cat-clicks');

            this.catImgElem.click(function() {
                octopus.incrementCounter();
            });
            this.render();
        },
        render : function() {
            let currentCat = octopus.getCurCat();
            this.catNameElem.text(currentCat.name);
            this.catImgElem.css('background-image', `url('${currentCat.imgURL}')`);
            this.catClicksElem.text(currentCat.index);
        }
    }

    let listView = {
        init : function () {
            this.catElem = $('.cat-container');
            this.listItems = $('.list-item');
            this.catListElem = $('#cat-list');
            this.addCatButton = $('#add-cat');
            this.editCatButton = $('#edit-cat');
            
            this.addCatButton.click(function() {
                modalView.addNameInput.val('');
                modalView.addUrlInput.val('');
                modalView.addCatModalElem.show();
            });

            this.editCatButton.click(function() {
                modalView.editNameInput.val('');
                modalView.editUrlInput.val('');
                modalView.editCatModalElem.show();
            });
            
            this.render();

        },
        render : function() {
            this.catListElem.html('');
            let cats = octopus.getCatArr();
            for (const cat of cats) {
                this.catListElem.append(`<li><button class="list-item">${cat.name}</button></li>`);   
            }
            $('.list-item').click(function() {
                let selected = $('.list-item').index(this);
                octopus.setCurCat(selected);
                catView.render();
            });
        }
    };

    let modalView = {
        init : function() {
            /* Modal Elements */
            this.addCatModalElem = $('#add-cat-modal');
            this.editCatModalElem = $('#edit-cat-modal');
            /* Add Input Elements */
            this.addNameInput = $('#add-name-input');
            this.addUrlInput = $('#add-img-input');
            /* Edit Input Elements */
            this.editNameInput = $('#edit-name-input');
            this.editUrlInput = $('#edit-img-input');
            this.catSelection = $('#cat-select');
            /* Buttons */
            this.submitButton = $('.submit');
            this.editCatButton = $('.edit');
            this.cancelButton = $('.cancel');

            this.submitButton.click(function(){
                let name = modalView.addNameInput.val();
                let url = modalView.addUrlInput.val();
                if(name && url){
                    octopus.addNewCat(name, url);
                }
            });

            this.editCatButton.click(function() {
                let name = modalView.editNameInput.val();
                let url = modalView.editUrlInput.val();
                let selected = modalView.catSelection[0].selectedIndex;
                if(url) {
                    octopus.editCat(selected, name, url);
                } else if (name){
                    console.log(selected);
                    octopus.editCat(selected, name);
                } else {
                    alert("Missing Name!");
                }
            });

            this.cancelButton.click(function() {
                modalView.addCatModalElem.hide();
                modalView.editCatModalElem.hide();
            });

            this.render();
        },

        render : function() {
            this.addCatModalElem.hide();
            this.editCatModalElem.hide();

            this.catSelection.html('');
            let cats = octopus.getCatArr();
            for (const cat of cats) {
                this.catSelection.append(`<option>${cat.name}</option>`);   
            }

        }
    }

    octopus.init();
});