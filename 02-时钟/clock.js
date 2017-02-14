/**
 * Created by maidou on 2017/2/11.
 */
function Clock(opts) {
    for (var key in opts) {
        this[key] = opts[key];
    }
    this.init();
}
Clock.prototype = {
    constructor: Clock,
    init: function () {
        var that = this;
        that.drawClock();
        var timer = setInterval(function () {
            that.drawClock();
        }, 1000);

    },
    drawClock:function () {
        this.ctx.clearRect(0, 0, cw, ch);
        this.drawBigCircle();
        this.drawDails();
        this.drawHands();
    },
    //绘制大圆
    drawBigCircle: function () {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.bigX, this.bigY, this.bigRadius, 0, 2 * Math.PI);
        ctx.lineWidth = this.lineBigWidth;
        ctx.strokeStyle = "blue";
        ctx.stroke();
    },
    //绘制钟表刻度
    drawDails: function () {
        var startRadian = -Math.PI / 3;//120
        var radianGap = 2 * Math.PI / 60;
        var length, lineWidth;
        for (var i = 0; i < 60; i++) {
            if (i % 5 == 0) {
                length = 15;
                lineWidth = 8;
                this.drawText(i / 5 + 1, startRadian + radianGap * i, length);
            } else {
                length = 10;
                lineWidth = 4;
            }
            this.drawDail(startRadian + radianGap * i, length, lineWidth);
        }
    },
    //绘制单个刻度
    drawDail: function (radius, length, lineWidth) {
        var ctx = this.ctx;
        ctx.beginPath();
        var bigRadius = this.bigRadius - this.lineBigWidth / 2;
        var h1 = Math.sin(radius) * (bigRadius - length);
        var b1 = Math.cos(radius) * (bigRadius - length);
        var h2 = Math.sin(radius) * bigRadius;
        var b2 = Math.cos(radius) * bigRadius;
        var startX = this.bigX + b1, startY = this.bigY + h1;
        var endX = this.bigX + b2, endY = this.bigY + h2;
        ctx.save();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();
    },
    //绘制文字
    drawText: function (text, radius, length) {
        var ctx = this.ctx;
        ctx.beginPath();
        var bigRadius = this.bigRadius - this.lineBigWidth / 2 - 15;
        var h1 = Math.sin(radius) * (bigRadius - length);
        var b1 = Math.cos(radius) * (bigRadius - length);
        var textX = this.bigX + b1, textY = this.bigY + h1;
        ctx.font = "20px 微软雅黑";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, textX, textY);
    },
    //绘制单个指针
    drawHand: function (radius, length, color, lineWidth) {
        var ctx = this.ctx;
        ctx.beginPath();
        var h1 = Math.sin(radius) * length;
        var b1 = Math.cos(radius) * length;
        ctx.save();
        ctx.moveTo(this.bigX, this.bigY);
        ctx.lineTo(this.bigX + b1, this.bigY + h1);
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
    },
    //绘制指针
    drawHands: function () {
        //绘制指针
        var time = new Date();
        var minuter = time.getMinutes();
        var hour = time.getHours() % 12 + minuter / 60;
        var second = time.getSeconds();
        //时针
        this.drawHand(Math.PI / 6 * (hour - 3), 60, "red", 8);
        //分针
        this.drawHand(Math.PI / 30 * minuter - Math.PI / 2, 80, "blue", 4);
        //秒针
        this.drawHand(Math.PI / 30 * second - Math.PI / 2, 100, "orange", 2);
    }
}












