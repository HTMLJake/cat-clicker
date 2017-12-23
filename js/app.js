$(function() {
    let model = {
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
        curCat : model.catArr[0],
        changeCat(index) {
            this.curCat = model.catArr[index];
            catView.changeCat(this.curCat.name, this.curCat.imgURL);
            catView.updateClick(this.curCat.index);
        },

        init : function() {
            listView.createList();
            catView.changeCat(this.curCat.name, this.curCat.imgURL);
            catView.updateClick(this.curCat.index);
            catView.setClickEvent();
        }

    };

    let catView = {
        updateClick : function(clicks) {
            $('.clicks').text(clicks);
        },
        changeCat : function(name, url) {
            $('.name').text(name);
            $('.clickable').css('background-image', `url('${url}')`);
        },
        setClickEvent : function() {
            $('.clickable').click(function() {
                octopus.curCat.index++;
                $('.clicks').text(octopus.curCat.index);
            });
        }
    }

    let listView = {
        createList : function () {
            for (const cat of model.catArr) {
                $('.catList').append(`<li><button class="list-item">${cat.name}</button></li>`);   
            }
            $('.list-item').click(function() {
                octopus.changeCat($('.list-item').index(this));
            });
        }
    };

    octopus.init();
});
