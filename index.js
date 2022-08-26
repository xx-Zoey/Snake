    const e = function(selector) {
        let element = document.querySelector(selector)
        if (element === null) {
            let s = `元素没找到, (${selector}) 选择器错误`
            alert(s)
            return s
        } else {
            return element
        }
    }

    var canvas = document.querySelector("#canvas")
    var ctx = canvas.getContext('2d')
    //画布宽,高
    var wide = 400
    var high = 400
    // 只识别一次按键
    var kd = 0
    // 速度
    var speed = 150
    // 蛇颜色
    var yanse = `#FFFFFF`
    // 蛇数组，组成蛇的每一个方块
    var snake = []
    // 食物数组
    var food = {}
    // 蛇的移动方向，x轴：1为向右，-1为向左；y轴：1为向下，-1为向上，所以0为某轴无方向。
    var diretion = {
        x: -1,
        y: 0,
    }

    // 分数
    var s = 0

    canvas.width = wide
    canvas.height = high

    // 初始化蛇和食物
    const initial = function() {
        // 蛇初始长度为3
        for(let i = 0; i < 3; i++){
            snake.push({
                x: i + 10,
                y: 10,
            })
        }
        // 食物随机位置
        food = {
            x: parseInt(Math.random() * 20),
            y: parseInt(Math.random() * 20),
            color:`rgb(255, 215, 0)`,
            score: 0,
        }
    }


    var time = setInterval(function(){
        kd = 0
        ctx.clearRect(0, 0, wide, high)
        update()
        draw()
    }, speed)

    // 绘制图形
    const draw = function() {
        // 画蛇
        for(let i = 0; i < snake.length; i++){
            let n = snake[i]
            ctx.fillStyle = yanse
            ctx.fillRect(n.x * 20, n.y * 20, 19, 19)
            if (n.x === snake[0].x && n.y === snake[0].y && i !== 0) {
                alert('吃到自己了，结束游戏')
                clearTimeout(time)
                snake.length = 0
                food.score = 0
                ctx.clearRect(0, 0, wide, high)
                initial()
                draw()
            }
        }

        // 画圆
        ctx.beginPath()
        ctx.fillStyle = food.color
        ctx.arc(food.x * 20 + 9.5, food.y * 20 + 9.5, 7, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }

    //更新蛇的位置和食物的位置
    const update = function() {
        // 这个为蛇的新头
        var head = {}
        head.x = snake[0].x + diretion.x
        head.y = snake[0].y + diretion.y

        // 判断新蛇头是否与食物重合，重合就重新生成食物
        if(head.x === food.x && head.y === food.y){
            s = s + 1
            food = {
                x: parseInt(Math.random() * 20),
                y: parseInt(Math.random() * 20),
                color: `rgb(255, 215, 0)`,
                score: `${s}`,
            }

            let scoreadd = e('.score')
            scoreadd.innerHTML = food.score

            //在蛇尾添加一节身体
            temp = snake[length - 1]
            snake.push(temp)
        }

        let uxxb = e('#replay')
        uxxb.addEventListener('click', function () {
            snake.length = 0
            food.score = 0
            ctx.clearRect(0, 0, wide, high)
            initial()
            draw()
        })
        //给数组添加新头,去尾
        snake.splice(0, 0, head)
        snake.pop()
    }

    //判断键盘事件
    window.addEventListener('keydown',function(event) {
        let m = event.key
        if (m === 'w') {
            if (diretion.y !== 1 && kd === 0) {
                // 重新给移动方向赋值
                diretion.x = 0
                diretion.y = -1
                kd = 1
            }
        } else if (m === 'd') {
            if (diretion.x !== -1 && kd === 0) {
                diretion.x = 1
                diretion.y = 0
                kd = 1
            }
        } else if (m === 's') {
            if (diretion.y !== -1 && kd === 0) {
                diretion.x = 0
                diretion.y = 1
                kd = 1
            }
        } else if (m === 'a') {
            if(diretion.x !== 1 && kd === 0){
                diretion.x = -1
                diretion.y = 0
                kd = 1
            }
        }
        console.log('direction', diretion)
    })

    // 点击按钮进行刷新
    const Flushed = function () {
        let uxxb = e('#replay')
        uxxb.addEventListener('click', function () {
            snake.length = 0
            food.score = 0
            ctx.clearRect(0, 0, wide, high)
            initial()
            draw()
        })
    }

    const __main = function() {
        initial()
        Flushed()
    }
    __main()
