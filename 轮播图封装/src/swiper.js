// swiper 构造函数 
/*swiper传入两个参数
    class_name 类名
    options 配置对象

    dom三项:
        root 根节点
        wapper 滑块容器
        slides 所有滑块
    私有对象 options 
 */
function Swiper(class_name, options) {
    this.dom = {};

    //option 配置对象处理
    this.privateDate = {};

    handleOption.call(this, options)
    SelectDom.call(this, class_name);
    init.call(this)

}

// 处理root 把所有和swiper有关的元素全部放进一个对象,方便管理
function SelectDom(class_name) {
    // 获取根节点
    this.dom.root = document.querySelector(class_name);
    // 获取滑块容器
    this.dom.wrapper = this.dom.root.querySelector('.swiper-wrapper')
    //获取所有的滑块
    this.dom.slides = this.dom.wrapper.querySelectorAll('.swiper-slide')
    // console.log(this.dom)
    //获取向左的箭头
    this.dom.prev = this.dom.root.querySelector('.prev');
    //获取向右的箭头
    this.dom.next = this.dom.root.querySelector('.next');
    //获取分页器
    this.dom.pagination = this.dom.root.querySelector('.swiper-pagination');
}

// handleOption函数  用来处理配置对象
function handleOption(options) {
    let { direction } = options
    Object.assign(this.privateDate, options);
    //用户可能传了 可能没传 所以我们要重新赋值 horizontal(水平方向滑动)
    direction = direction ? direction : 'horizontal';
    //把参数传入到privateDate
    Object.assign(this.privateDate, {
        direction: direction
    })
}

/*
    初始化轮播图函数
        1.需要知道现在滑到了第几张 
          轮播图容器的宽度和高度 -> 给滑块和滑块容器设置宽度和高度
*/
function init() {
    let width = this.dom.root.offsetWidth,
        height = this.dom.root.offsetHeight;
    //把这些值放入option 配置对象中
    Object.assign(this.privateDate, {
        index: 0,
        width: width,
        height: height,
    });
    let { wrapper } = this.dom;
    //解构对象,得到dom中的wrapper和slides
    width_or_height.call(this)
    drag.call(this, wrapper)
    //是否有分页器属性,如果有,则调用生成分页器按钮函数,没有什么都不用做
    this.dom.pagination ? make_btn.call(this) : ''
    //判断是否有 属性,如果有就调用click_btn函数
    this.privateDate.bullet_clickable === true ? click_btn.call(this) : '';
    //为两个按钮绑定事件监听
    this.dom.prev ? this.dom.prev.addEventListener('click', go_or_back.bind(this)) : '';
    this.dom.next ? this.dom.next.addEventListener('click', go_or_back.bind(this)) : '';
    //判断是否需要自动轮播
    if (this.privateDate.autoplay) {
        //先看是否需要自动轮播
        //判断有没有timeout,无则默认3000,有则什么操作都不需要做
        this.privateDate.timeout ? '' : this.privateDate.timeout = 3000;
        //调用自动轮播函数
        autoplay.call(this);
    }
    //最大盒子的鼠标移入移除事件
    container_mouse.call(this);
}


//初始化高度宽度函数
function width_or_height() {
    let { wrapper, slides } = this.dom;
    let { width, height, direction } = this.privateDate;
    if (direction === 'horizontal') {
        //给滑块容器设置宽度
        wrapper.style.width = `${width * slides.length}px`;
        wrapper.style.height = `${height}px`;
    }else {
        wrapper.style.height  = `${height * slides.length}px`;
        wrapper.style.width = `${width}px`;
        wrapper.classList.toggle('vertical');
    }
    //给每个滑块设置切换效果,如果不设置则会显得僵硬,不圆润
    wrapper.classList.toggle('wrapper-transition');
    //给每个滑块设置宽高
    [].forEach.call(slides, function (slide_item) {
        slide_item.style.width = `${width}px`;
        slide_item.style.height = `${height}px`;
    });
}
//拖拽函数
/*
    drap拖拽 给某个元素绑定拖拽事件
    参数: 
        ele -> 给谁绑定
    逻辑：
        1.鼠标按下需要获取一个坐标
        2.鼠标滑动的时候，保留下滑动的距离
        3.在滑动的时候判断是否应该显示下一个卡片?
            如何去判断: 1.要根据用户传进来的方向去进行一个判断
*/
function drag(ele) {
    let mouse_position = { x: 0, y: 0 };
    //为了后面的计算需要,将move_x 和move_y 放入option中
    Object.assign(this.privateDate, {
        move_x: 0,
        move_y: 0,
    })
    //是否按下了鼠标
    let is_click = false,
        //如果next_or_not 为true 表示可以滑动到下一张
        next_or_not = false;
        var {height,width,direction} = this.privateDate;
    //添加时间监听
    ele.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        // console.log('鼠标按下了');
        is_click = true;
        ele.classList.toggle('wrapper-transition');
        //更当前鼠标的坐标
        mouse_position = { x: e.clientX, y: e.clientY };
        // console.log(mouse_position)
       
        
    }.bind(this));

     //鼠标移动
 document.addEventListener('mousemove', function (e) {
    e.stopPropagation();
    if (!is_click) return;
    // console.log(move_x,move_y)
    if (direction === 'horizontal') {
        this.privateDate.move_x += e.clientX - mouse_position.x;
        console.log(this.privateDate.move_x)
        if (Math.abs(this.privateDate.move_x - this.privateDate.index * -width) >= width * 0.3) {
            //如果移动距离大于一半,则切换轮播图
            next_or_not = true;
            // ele.style.transform = `translate(${-width}px)`;
            move_wrapper.call(this, this.dom.wrapper);
        } else {
            //否则,弹回原位置
            next_or_not = false;
        }
        //限制移动时露出的空白区域的大小(不明白的点)
        this.privateDate.move_x = Math.min(Math.max(this.privateDate.move_x, (this.dom.slides.length - 1) * -width + -width * 0.15), width * 0.15)
        //鼠标移动的时候滑块跟着鼠标一起走,调用wrapper函数移动
        move_wrapper.call(this, ele, 'horizontal', this.privateDate.move_x);
    } else { //竖直方向上的移动
        this.privateDate.move_y += e.clientY - mouse_position.y;
        console.log( this.privateDate.move_y)
        if (Math.abs(this.privateDate.move_y - this.privateDate.index * -height) >= height * 0.3) {
            next_or_not = true;
            // ele.style.transform = `translate(${-width}px)`;
            move_wrapper.call(this, this.dom.wrapper);
        } else {
            //否则,弹回原位置
            next_or_not = false;
        }
        //限制移动时露出的空白区域的大小(不明白的点)
        this.privateDate.move_y = Math.min(Math.max(this.privateDate.move_y, (this.dom.slides.length - 1) * -height + -height* 0.15), height* 0.15)
        //鼠标移动的时候滑块跟着鼠标一起走,调用wrapper函数移动
        move_wrapper.call(this, ele, 'vertical', this.privateDate.move_y);
    }
    //移动结束后重新对mouse_position重新赋值
    mouse_position = { x: e.clientX, y: e.clientY };
}.bind(this));
    //鼠标抬起 
    document.addEventListener('mouseup', function (e) {
        e.stopPropagation();
        // console.log('鼠标抬起了');
        if (!is_click) return;
        //如果next_or_not 为真,则表示可以切换到下一张
        if (next_or_not) {
            //这个判断条件还不明白
            if(direction === 'horizontal') {
                if (this.privateDate.index * - width < this.privateDate.move_x) {
                    this.privateDate.index--
                } else {
                    this.privateDate.index++;
                }
                move_dis.call(this, ele);
                toggle_btn_bgc.call(this);
            }else {
                if (this.privateDate.index * - height < this.privateDate.move_y) {
                    this.privateDate.index--    
                } else {
                    this.privateDate.index++;
                }
                move_dis.call(this, ele);
                toggle_btn_bgc.call(this);
            }
           
        } else {//如果next_or_not为假,则表示不可以切换
            if(direction === 'horizontal') {
                this.privateDate.move_x = this.privateDate.index * -this.privateDate.width
                // console.log( this.privateDate.move_x )
                move_wrapper.call(this, ele, 'horizontal', this.privateDate.move_x)
            
            }else {
                this.privateDate.move_y = this.privateDate.index * -this.privateDate.height
                // console.log( this.privateDate.move_x )
                move_wrapper.call(this, ele, 'vertical', this.privateDate.move_y)
            
            }
           }
        is_click = false;
        next_or_not = false;
    }.bind(this));
}

//移动wrapper函数
function move_wrapper(ele, direc, dis) {
    if (direc == 'horizontal') {
        ele.style.transform = `translateX(${dis}px)`;
    } else {
        ele.style.transform = `translateY(${dis}px)`;
    }
}

//计算移动距离的函数
function move_dis(ele) {
    //解构width 和height
    let { width, direction, height } = this.privateDate;
    if (direction == 'horizontal') {//计算在水平方向上应该移动的距离
        //计算index当前的位置
        this.privateDate.index = Math.max(Math.min(this.privateDate.index, this.dom.slides.length - 1), 0)
        //计算当前应该移动的距离move_x
        this.privateDate.move_x = this.privateDate.index * (-width);
        move_wrapper(ele, direction, this.privateDate.move_x);
    } else {//计算在竖直方向上移动的距离
        //计算当前应该移动的距离move_y
        this.privateDate.index = Math.max(Math.min(this.privateDate.index, this.dom.slides.length - 1), 0)
        this.privateDate.move_y = this.privateDate.index * (-height);
        move_wrapper(ele, direction, this.privateDate.move_y);
    }
}

//写点击按钮之后的前进或后退函数
function go_or_back(e) {
    e.stopPropagation();
    if (e.target.className.includes('next')) {
        this.privateDate.index = Math.min(++this.privateDate.index, this.dom.slides.length - 1);
        if (this.privateDate.direction === 'horizontal') {
            this.privateDate.move_x = this.privateDate.index * -this.privateDate.width;
            move_wrapper(this.dom.wrapper, this.privateDate.direction, this.privateDate.move_x)
            toggle_btn_bgc.call(this);
        } else {
            this.privateDate.move_y = this.privateDate.index * -this.privateDate.height;
            move_wrapper(this.dom.wrapper, this.privateDate.direction, this.privateDate.move_y)
            toggle_btn_bgc.call(this);
        }
    } else {
        this.privateDate.index = Math.max(--this.privateDate.index, 0);
        if (this.privateDate.direction === 'horizontal') {
            this.privateDate.move_x = this.privateDate.index * -this.privateDate.width;
            move_wrapper(this.dom.wrapper, this.privateDate.direction, this.privateDate.move_x)
            toggle_btn_bgc.call(this);
        } else {
            this.privateDate.move_y = this.privateDate.index * -this.privateDate.height;
            move_wrapper(this.dom.wrapper, this.privateDate.direction, this.privateDate.move_y)
            toggle_btn_bgc.call(this);
        }
    }
}

//动态生成分页器函数
function make_btn() {
    let fragment = document.createDocumentFragment();
    //将该函数中要用到的slides 和 paination 解构
    let { slides, pagination } = this.dom;
    // console.log('我执行了生成分页器函数');
    //for 循环生成按钮
    for (let i = 0; i < slides.length; i++) {
        let span = document.createElement('span');
        //给span添加之前已经设置好样式的类名
        span.setAttribute('class', 'swiper-pagination-bullet');
        span.own_index = i;
        fragment.append(span);
    }
    pagination.append(fragment);
    //给当前页面下的btn添加背景颜色
    pagination.children[this.privateDate.index].classList.add('btn_bgc');
    //给this.dom对象添加分页器按钮属性
    Object.assign(this.dom, {
        bullets: pagination.querySelectorAll('.swiper-pagination-bullet')
    }) //添加完之后并不会自动切换,所以还需要一个函数来自动切换
}

//设置切换小点点的背景颜色
function toggle_btn_bgc() {
    //先清除所有的类名,然后为当前下标元素添加bgc类名
    // NodeList 类型,调用forEach方法
    let { index } = this.privateDate;
    this.dom.bullets.forEach(function (item) {
        item.classList.remove('btn_bgc')
    });
    this.dom.bullets[index].classList.add('btn_bgc');
}

//给小圆点添加点击事件
function click_btn() {
    //给每个小圆点绑定事件监听
    this.dom.bullets.forEach(function (item) {
        item.addEventListener('click', click_bullets.bind(this));
    }.bind(this));
    function click_bullets(e) {
        e.stopPropagation()
        //把私有属性里当前的下标index变成当前span标签的下标
        this.privateDate.index = e.target.own_index;
        //调用wrapper 移动函数
        move_dis.call(this, this.dom.wrapper);
        //切换小圆点类名
        toggle_btn_bgc.call(this);
    }
}

//自动轮播 
/*
    首先判断是否有autoplay 属性
        有的话再看是否有timeout属性 有使用timeout,没有的话默认3000
    定时器setInterval
    每隔三秒钟切换一张图片,即index++
    然后判断是否超过了slides的长度,如果超过,则index = 0
    调用移动函数
*/
function autoplay() {
    let len = this.dom.slides.length;
    let timer = setInterval(function () {
        // console.log(this);
        this.privateDate.index = (++this.privateDate.index) % len;
        //调用wrapper 移动函数
        move_dis.call(this, this.dom.wrapper);
        //切换小圆点类名
        toggle_btn_bgc.call(this);
    }.bind(this), this.privateDate.timeout);
    /*由于定时器在调用时，都会返回一个整形的数字，
    该数字代表定时器的序号，即第多少个定时器，所以定时器的清除要借助于这个返回的数字。*/
    this.privateDate.timer = timer;
}

//当鼠标进入大盒子的时候需要取消事件监听,移除再次添加事件监听
//给大盒子绑定鼠标进入和鼠标移除时间
function container_mouse() {
    let { root } = this.dom;
    //鼠标进入 取消定时器
    root.addEventListener('mouseenter', function (e) {
        e.stopPropagation();
        clearInterval(this.privateDate.timer);
    }.bind(this));
    //鼠标离开,再次轮播
    root.addEventListener('mouseleave', function (e) {
        e.stopPropagation();
        autoplay.call(this);
    }.bind(this));
}