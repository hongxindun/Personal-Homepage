/**
 * Created by Baron on 2016/4/5.
 */

function g(selector){
    var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}

function random(range){
    var min = Math.min(range[0], range[1]);
    var max = Math.max(range[0], range[1]);
    var diff = max - min;

    var num = Math.round(Math.random() * diff) + min;
    return num;
}

function T_change(){
    var data = T_data;
    var T_tpl1 = g("#T_line").innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');

    var tpl_html = [];

    for(var i in data){
        var _html = T_tpl1.replace(/\{T_index\}/g, i)
                         .replace(/\{T_title\}/g, data[i].title)
                         .replace(/\{T_detail\}/g, data[i].detail);
        tpl_html.push(_html);
    }



    g('#T_line').innerHTML = tpl_html.join('');

    for(var i = 0; i < data.length; i++){
        g('#T_content_'+i).style.top = 200 + 200 * i + 'px';
        if(i%2 == 1){
            g('#T_content_'+i).setAttribute('class', 'T_content_right');
        }
    }
}


function M_change(){
    var data = M_data;
    var M_tpl = g("#M_content").innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');

    var tpl_html = [];

    for(var i in data){
        var _html = M_tpl.replace(/\{M_index\}/g, i)
            .replace(/\{M_title\}/g, data[i].title)
            .replace(/\{M_detail\}/g, data[i].detail);
        tpl_html.push(_html);
    }



    g('#M_content').innerHTML = tpl_html.join('');

}

function A_change(){
    var data = A_data;
    var A_nav_tpl = g('#A_nav').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');
    var A_tpl = g('#album_photo').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');
    var html = [];
    var A_nav_html = [];
    for(var i in data){
        var _html = A_tpl
            .replace(/\{A_index\}/g, i)
            .replace(/\{A_src\}/g, data[i].src)
            .replace(/\{caption\}/g, data[i].caption)
            .replace(/\{desc\}/g, data[i].desc);
        var _nav_html = A_nav_tpl
            .replace(/\{A_nav_index\}/g, i);

        html.push(_html);
        A_nav_html.push(_nav_html);
    }
    g('#album_photo').innerHTML = html.join('');
    g('#A_nav').innerHTML = A_nav_html.join('');

    rsort(random([1, data.length]));
}

function range(){
    var range = {
        left:{
            x:[],
            y:[]
        },
        right:{
            x:[],
            y:[]
        }
    };

    var album_photo = {
        width: g('#album_photo').clientWidth,
        height: g('#album_photo').clientHeight
    };

    var photo = {
        width: g('.photo')[0].clientWidth,
        height: g('.photo')[0].clientHeight
    };

    range.left.x = [photo.width / 4, album_photo.width /2];
    range.left.y = [photo.height / 4, album_photo.height - photo.height /4];
    range.right.x = [album_photo.width / 2, album_photo.width - photo.width / 4];
    range.right.y = range.left.y;
    return range;
}

function rsort(n){
    var _photo = g('.photo');
    var photos = [];
    for(var i = 0; i < _photo.length; i++){
        _photo[i].className = 'photo photo_front';
        _photo[i].style.left = '';
        _photo[i].style.top = '';
        _photo[i].style['transform'] = _photo[i].style['-webkit-transform'] = 'scale(1.3)';
        photos.push(_photo[i]);
    }
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center';

    photo_center = photos.splice(n, 1);
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    var ranges = range();

    for(var j = 0; j < photos_left.length; j++){
        var photo = photos_left[j];
        photo.style.left = random(ranges.left.x) + 'px';
            photo.style.top = random(ranges.left.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }

    for(var s = 0; s < photos_right.length; s++){
        var photo = photos_right[s];
        photo.style.left = random(ranges.right.x) + 'px';
        photo.style.top = random(ranges.right.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }

    var navs = g('.icon');
    for(var k = 0; k < navs.length; k++){
        navs[k].className = 'icon';
    }
    g('#A_nav_' + n).className += " icon_current";

}

function turn(elem){
    var cls = elem.className;
    var n = elem.id.split('_')[1];
    if(!/photo_center/.test(cls)){
        return rsort(n);
    }
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/, 'photo_back');
    } else{
        cls = cls.replace(/photo_back/, 'photo_front');
    }
    elem.className = cls;
}

function to_top(){
    var to_top_btn = g('#to_top');
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    var isTop = true;


    window.onscroll = function(){
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(osTop >= clientHeight){
            to_top_btn.style.display = 'block';
        }else{
            to_top_btn.style.display = 'none';
        }

        if(!isTop){
            clearInterval(timer);
        }
        isTop = false;
    };

    to_top_btn.onclick = function(){
        timer = setInterval(function(){
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var ispeed = Math.floor(-osTop /5);
            document.documentElement.scrollTop = document.body.scrollTop =osTop + ispeed;
            isTop = true;
            if(osTop == 0){
                clearInterval(timer);
            }
        },30);
    };
}


T_change();
M_change();
A_change();
to_top();
