 $(function(){
//banner
    var box=$('.bunnertu')[0];
    var img=$('.banner1');
    var lit=$('.slider-item');
    var left=$('.lt')[0];
    var right=$('.gt')[0];
    var width=parseInt(getStyle(box,'width'));
    console.log(width)
    var next=0;
    var n=0;
    var flag0=true;

    var t=setInterval(move,2000);
    function move(){
       
        next=n+1;

        if(next>=img.length){
            next=0;
        }
        img[next].style.left=width+'px';
        animate(img[n],{left:-width},800);
        animate(img[next],{left:0},800);
        lit[n].style.background='#3e3e3e'
        lit[next].style.background='#b61b1f'
        n=next;
    }
    box.onmouseover=function(){
        left.style.display='block'
        right.style.display='block'

        clearInterval(t);
    }
    box.onmouseout=function(){
        left.style.display='none'
        right.style.display='none'
        t=setInterval(move,2000)
    }
    right.onclick=function(){
        move();
    }
    left.onclick=function(){
        
        next=n-1;
        if(next<0){
            next=img.length-1;
        }
        img[next].style.left=-width+'px';
        animate(img[n],{left:width},800);
        animate(img[next],{left:0},800);
        lit[n].style.background='#3e3e3e'
        lit[next].style.background='#b61b1f'
        n=next;
    }

    for(var i=0;i<lit.length;i++){
        lit[i].index=i;
        lit[i].onclick=function(){
            if(this.index>n){
                
                img[this.index].style.left=width+'px';
                animate(img[n],{left:-width},800);
                animate(img[this.index],{left:0},800);
                lit[n].style.background='#3e3e3e'
                lit[this.index].style.background='#b61b1f'
                n=this.index;
            }else if(this.index<n){
                
                img[this.index].style.left=-width+'px';
                animate(img[n],{left:width},800);
                animate(img[this.index],{left:0},800);
                lit[n].style.background='#3e3e3e'
                lit[this.index].style.background='#b61b1f'
                n=this.index;
            }
        }
    }

//轮播图
    var lunbo=$(".lunbo")[0];
    var left1=$(".lunbo-left")[0];
    var right1=$(".lunbo-right")[0];
    var imgBox=$(".img-box")[0];
    var flag1=true;
    var width1=parseInt(getStyle($('.img-lis')[0],"width"));
    var t1=setInterval(move1,1500);

    function move1(){
        if(!flag1){
            return
        }
        flag1=false;
        animate(imgBox,{left:-width},600,function(){
            var first=getFirst(imgBox);
            imgBox.appendChild(first);
            imgBox.style.left="0px";
            flag1=true;
        });
    }

    lunbo.onmouseover=function(){
        clearInterval(t1);
         left1.style.display='block'
        right1.style.display='block'

    }

    lunbo.onmouseout=function(){
        t=setInterval(move1, 1500);
        left1.style.display='none'
        right1.style.display='none'
    }

    left1.onclick=function(){
        if(!flag1){
            return
        }
        flag1=false;
        var last=getLast(imgBox);
        var first=getFirst(imgBox);
        insertBefore(last, first);
        imgBox.style.left=-width+"px";
        animate(imgBox,{left:width},600,function(){
            flag1=true;
        });
    }
    right1.onclick=function(){
        move1();
    }






//楼层跳转
    var cheight=document.documentElement.clientHeight;
    var cwidth=document.documentElement.clientWidth;
    var floor=$('.floor');
    var floor_lis=$('.handler');
    var floor_nav=$('.floor-nav')[0];
    var nheight;
 
    var now;
    var flag=true;
    var flag2=true;
    for(var i=0;i<floor.length;i++){
        floor[i].h=floor[i].offsetTop;
    }
    window.onscroll=function(){
        var obj=document.body.scrollTop?document.body:document.documentElement;
        var top=obj.scrollTop;
        if(top>=floor[0].h-300){
            floor_nav.style.display='block';
            nheight=floor_nav.offsetHeight;
            floor_nav.style.top=(cheight-nheight)/2+'px';
            if(flag==true){
                flag=false;
            }flag=true;
        }
        if(top<floor[0].h-300){
            floor_nav.style.display='none';
            if(flag2==true){
                flag2=false;
            }flag2=true;
        }
        // 出现对应的颜色
        for(var i=0;i<floor.length;i++){
            if(top>=floor[i].h-200){
                for(var j=0;j<floor_lis.length;j++){
                    floor_lis[j].style.color='#625351';

                }
                floor_lis[i].style.color='#C81576'
                now=i;
            }
        }

        // 点击返回对应的楼层
        for(var i=0;i<floor_lis.length;i++){
            floor_lis[i].index=i;

            floor_lis[i].onclick=function(){
                animate(document.body,{scrollTop:floor[this.index].h})
                animate(document.documentElement,{scrollTop:floor[this.index].h})
            }
            floor_lis[i].onmouseover=function(){

                this.style.background='#C81576'
                this.style.color='#fff'
            }
            floor_lis[i].onmouseout=function(){
                if(now==this.index){
                    this.style.background='#fff'
                    this.style.color='#C81576'
                    return;
                }
                this.style.background='#fff'
                this.style.color='#625351'
                
            }
        }
    }

    //选项卡
        function xuan(fu){
                var box_in=fu;
                for(var i=0;i<box_in.length;i++){
                    hover(box_in[i],function(){
                        this.style.background='#fff';
                        var box_x=$('.p-x',this)[0];
                        box_x.style.display='block'
                    },function(){
                        var box_x=$('.p-x',this)[0];
                        var that=this;
                            box_x.style.display='none';
                            that.style.background='#F1F1F1';
                    })
                }
            }
            xuan($('.songzhi'));
            xuan($('.fore3 dorpdown'));
            xuan($('.fore6 dorpdown'));
            xuan($('.fore7 dorpdown'));
            xuan($('.fore8 dorpdown'));
            xuan($('.fore9 dorpdown'));


    //banner选项卡
    var box_in1=$('.item');
    for(var i=0;i<box_in1.length;i++){
        
        hover(box_in1[i],function(){

            var box_x1=$('.p-x',this)[0];
            box_x1.style.display='block'
        },function(){
            var box_x1=$('.p-x',this)[0];
            var that=this;
                box_x1.style.display='none';

        })
    }
        



//1L-12L图片滚动
    function xia(obj){


        // var sbox=$('.img-box')[0];
        // var simg=$('.Simg');
        // var slit=$('.quan');
        // var sleft=$('.body-left')[0];
        // var sright=$('.body-right')[0];
        
        
        var sbox=obj;
        var simg=$('.Simg',obj);
        var slit=$('.quan',obj);
        var sleft=$('.body-left',obj)[0];
        var sright=$('.body-right',obj)[0];

        // var swidth=440;
        var swidth=parseInt(getStyle(sbox,'width'));
        // console.log(swidth)
        var snext=0;
        var sn=0;
        var flag=true;

         var st=setInterval(smove,2000);


            function smove(){
                if(!flag){
                    return;
                }
                flag=false;
                snext=sn+1;

                if(snext>=simg.length){
                    snext=0;
                }
                simg[snext].style.left=swidth+'px';
                animate(simg[sn],{left:-swidth},600);
                animate(simg[snext],{left:0},600,function(){
                    flag=true
                });
                slit[sn].style.background='#3e3e3e'
                slit[snext].style.background='#b61b1f'
                sn=snext;
            }
            sbox.onmouseover=function(){
                sleft.style.display='block'
               sright.style.display='block'

                clearInterval(st);
            }
            sbox.onmouseout=function(){
                sleft.style.display='none'
                sright.style.display='none'
               st=setInterval(smove,2000)
            }
            sright.onclick=function(){
                smove();
            }
            sleft.onclick=function(){
                if(!flag){
                    return;
                }
                flag=true;
                snext=sn-1;
                if(snext<0){
                    snext=simg.length-1;
                }
                simg[snext].style.left=-swidth+'px';
                animate(simg[sn],{left:swidth},600);
                animate(simg[snext],{left:0},600,function(){
                    flag=true;
                });
                slit[sn].style.background='#3e3e3e'
               slit[snext].style.background='#b61b1f'
                sn=snext;
            }

            for(var i=0;i<slit.length;i++){
                slit[i].index=i;
                slit[i].onclick=function(){
                    if(this.index>sn){
                        if(!flag){
                            return;
                        }
                        flag=false;
                        simg[this.index].style.left=swidth+'px';
                        animate(simg[sn],{left:-swidth},600);
                        animate(simg[this.index],{left:0},600,function(){
                            flag=true
                        });
                        slit[sn].style.background='#3e3e3e'
                        slit[this.index].style.background='#b61b1f'
                        sn=this.index;
                    }else if(this.index<sn){
                        if(!flag){
                            return;
                        }
                        flag=true;
                       simg[this.index].style.left=-swidth+'px';
                        animate(simg[sn],{left:swidth},600);
                        animate(simg[this.index],{left:0},600,function(){
                            flag=true;
                        });
                       slit[sn].style.background='#3e3e3e'
                        slit[this.index].style.background='#b61b1f'
                        sn=this.index;
                    }
                }
            }
    }
    xia($(".p-box")[0]);
    xia($(".p-box")[1]);
    xia($(".p-box")[2]);
    xia($(".p-box")[3]);
    xia($(".p-box")[4]);
    xia($(".p-box")[5]);
    xia($(".p-box")[6]);
    xia($(".p-box")[7]);
    xia($(".p-box")[8]);
    xia($(".p-box")[9]);
    xia($(".p-box")[10]);
    xia($(".p-box")[11]);
    xia($(".p-box")[12]);

//1L按钮
        function AN(F,h){
            

            var seek=$(".tab-item",F);
            var kang=$(".seek-hidden",F);

            var n=0;

            for(var i=0;i<seek.length;i++){
                seek[i].index=i; 
                seek[i].onmouseover=function(){
                    for(var j=0;j<h.length;j++){
                        kang[j].style.display="none";
                        h[j].style.display="none";
                    }
                    kang[this.index].style.display="block";
                    h[this.index].style.display="block";
                    n=this.index;
                }
             }
        }
        // 1L
        var F1=$(".mmt")[0];
        var Fbox1=$(".mmc")[0];
        var h1=$(".F1-hidden",Fbox1);
        AN(F1,h1);
        // 2L
        var F2=$(".mmt")[1];
        var Fbox2=$(".mmc")[1];
        var h2=$(".F2-hidden",Fbox2);
        AN(F2,h2);
        // 3L
        var F3=$(".mmt")[2];
        var Fbox3=$(".mmc")[2];
        var h3=$(".F3-hidden",Fbox3);
        AN(F3,h3);
        // 4L
        var F4=$(".mmt")[3];
        var Fbox4=$(".mmc")[3];
        var h4=$(".F4-hidden",Fbox4);
        AN(F4,h4);
        // 5L
        var F5=$(".mmt")[4];
        var Fbox5=$(".mmc")[4];
        var h5=$(".F5-hidden",Fbox5);
        AN(F5,h5);
        //6L
        var F6=$(".mmt")[5];
        var Fbox6=$(".mmc")[5];
        var h6=$(".F6-hidden",Fbox6);
        AN(F6,h6);
        //7L
        var F7=$(".mmt")[6];
        var Fbox7=$(".mmc")[6];
        var h7=$(".F7-hidden",Fbox7);
        AN(F7,h7);
        //8L
        var F8=$(".mmt")[7];
        var Fbox8=$(".mmc")[7];
        var h8=$(".F8-hidden",Fbox8);
        AN(F8,h8);
        //9L
        var F9=$(".mmt")[8];
        var Fbox9=$(".mmc")[8];
        var h9=$(".F9-hidden",Fbox9);
        AN(F9,h9);
        //10L
        var F10=$(".mmt")[9];
        var Fbox10=$(".mmc")[9];
        var h10=$(".F10-hidden",Fbox10);
        AN(F10,h10);
        //11L
        var F11=$(".mmt")[10];
        var Fbox11=$(".mmc")[10];
        var h11=$(".F11-hidden",Fbox11);
        AN(F11,h11);







   
//右边固定
    var lis=$(".jdm-toolbar-tab");
    for(var i=0; i<lis.length;i++){
        hover(lis[i],function(){
            var div=$("em",this)[0];
            div.style.display="block";
            div.style.zIndex=999;
        },function(){
            var div=$("em",this)[0];
            div.style.display="none";
        })
    }

//返回顶部
      var obj=document.body.scrollTop?document.body:document.documentElement;
        var back=$("#back");
        back.onclick=function(){
            animate(document.body,{scrollTop:0},600);
            animate(document.documentElement,{scrollTop:0},600);
        }


})