/**
 * @author beidan
 * @description 拼图小游戏
 */
;(function () {
    function Puzzle() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.imgLikeArr = document.querySelectorAll('img');
        this.imgArr = Array.prototype.slice.call(this.imgLikeArr);
        console.log(this.imgLikeArr)
        console.log(this.imgArr)
    }

    Puzzle.prototype = {
        init: function (url) {
            var image = new Image(), self = this;
            // image.crossOrigin = 'anonymous'
            image.src = url;

            image.onload = function () {         
                self.randomImg();
                self.renderImg(image);
                self.dragEvent();
                // self.isSuccess();
            };
        },

        //canvas绘制图片 1920x1080
        renderImg: function (image) {
            var index = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    this.context.drawImage(image, 640 * j, 360 * i, 640, 360, 0, 0, 640, 360);
                    this.imgArr[index].src = this.canvas.toDataURL('image/jpeg');
                    this.imgArr[index].id = index;
                    index++;
                }
            }
        },
        //监听事件
        dragEvent: function () {
            var contain = document.getElementById('game'),
                // next = document.getElementById('next'),
                myBtn = document.getElementById("myBtn"),
                self = this; 

            contain.addEventListener("dragstart", dragstart);
            contain.addEventListener("drop", drop);
            contain.addEventListener("dragover", function( event ) {
                event.preventDefault();
            });
            myBtn.addEventListener("click", nextrank);

            function dragstart(e){
                console.log("drag")
                if (e.target.tagName.toLowerCase() == "img") {
                    e.dataTransfer.setData('id', e.target.id);
                }
            }

            function drop(ev){
                if (ev.target.tagName.toLowerCase() == "img") {
                    var originObj = document.getElementById(ev.dataTransfer.getData('id'));
                    var cache = {
                        'src': originObj.src,
                        'id': originObj.id
                    };
                    var endObj = ev.target.querySelector('img') || ev.target;

                    originObj.src = endObj.src;
                    originObj.id = endObj.id;
                    endObj.src = cache.src;
                    endObj.id = cache.id;

                    if (originObj.id != endObj.id) {
                        self.changestep();
                    }
                    console.log("drop")
                    self.isSuccess();
                }
            }
            
            function nextrank(){
                src = "img/" + imageName[foot++];
                console.log(src);
                self.recoverGap();
                // self.init('img/02.png');
                self.init(src);
                self.showtip();
                self.changerank();
                document.getElementById('step').innerText = 0;
                myBtn.removeEventListener("click", nextrank);
                contain.removeEventListener("dragstart", dragstart);
                contain.removeEventListener("drop", drop);
            }

        },
        //实现小块图片的随机排序
        randomImg: function () {
            this.imgArr.sort(function () {
                return Math.random() - Math.random();
            });
        },
        //成功时可选择下一关
        showtip: function () {
            var hint = document.querySelector('.hint');
            hint.classList.toggle('hide');
        },
        //改变关卡
        changerank: function () {
            var rank = document.getElementById('rank');
            rank.innerText++;
        },
        //获取当前的步数
        getStep: function() {
            var step = document.getElementById('step');
            // stepCount[count] =  step.innerText;
            // console.log(stepCount[count]);
            return step.innerText;
        },
        //获取总步数
        getTotalStep: function() {
            
            // stepCount[count] =  step.innerText;
            // console.log(stepCount[count]);
            totalStep.innerText;
        },
        //改变步数
        changestep: function () {
            var step = document.getElementById('step');
            step.innerText++;
        },
        //拼图完成时缝隙合并
        removeGap: function() {
            var img = document.getElementsByTagName('img');
            for (var i = 0; i<img.length;i++) {
                img[i].style.cssText= "width:100%;display:block";
            };
        },
        //缝隙生成
        recoverGap: function() {
            var img = document.getElementsByTagName('img');
            for (var i = 0; i<img.length;i++) {
                img[i].style.cssText= "width:99%;display:inline";
            };
        },
        //判断游戏是否完成
        isSuccess: function () {
            var imgLikeArr = document.querySelectorAll('img'),
                imgArr = Array.prototype.slice.call(imgLikeArr),
                len = imgArr.length, i,
                flag = true, self = this;

            for (i = 0; i < len; i++) {
                if (imgArr[i].id != i) {
                    flag = false;
                }
            }

            if (flag) {
                setTimeout(function () {
                    console.log("success");              
                    stepCount[count++] = self.getStep();
                    self.removeGap();          
                    if(foot==10){
                        self.showEndTip();
                    }
                    else self.showtip();
                }, 200);
            }
        },
        //展示游戏结束提示
        showEndTip: function(){
            var endTip = document.getElementById('endTip');
            endTip.style.cssText= "display:block";
            // var detailStep = document.getElementById('detailStep');    
            var items=document.getElementsByClassName("eachStep");//获取li集合bai
            var totalStep = document.getElementById('totalStep');
            for(var i=0;i<items.length;i++){
            var curr=items[i];//获取当前li
            curr.innerText='第'+(i+1)+'关'+':'+stepCount[i];//为当前li赋值
            totalStepCount+=parseInt(stepCount[i]);
            }
            totalStep.innerText=totalStepCount;
        }
    };

    var puzzle = new Puzzle();
    var imageName = new Array("01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "10.png");
    var foot = 1;
    var count = 0;
    var src = "img/" + imageName[0];
    var stepCount = new Array(10);
    var totalStepCount = 0;
    console.log(src);
    puzzle.init(src);

    
    


})();



//时钟
var hour,minute,second;//时 分 秒
        hour=minute=second=0;//初始化
        var millisecond=0;//毫秒
        var int;
        function Reset()//重置
        {
            window.clearInterval(int);
            millisecond=hour=minute=second=0;
            document.getElementById('timetext').value='00时00分00秒000毫秒';
        }
 
        function start()//开始
        {
            int=setInterval(timer,50);
        }
 
        function timer()//计时
        {
            millisecond=millisecond+50;
            if(millisecond>=1000)
            {
                millisecond=0;
                second=second+1;
            }
            if(second>=60)
            {
                second=0;
                minute=minute+1;
            }
 
            if(minute>=60)
            {
                minute=0;
                hour=hour+1;
            }
            document.getElementById('timetext').value=hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒';
 
        }
 
        function stop()//暂停
        {
            window.clearInterval(int);
        }




