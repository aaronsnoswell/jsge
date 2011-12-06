/* Author: 

*/


var engine = new jsge("stage", {
    init: function() {
        var canvas = this.canvas,
            ctx = this.ctx;
        
        var player = {};
        player.pos = {x:100, y:100};
        player.vel = {x:1, y:1};
        player.size = {w:20, h:20};
        player.update = function() {
            player.pos.x += player.vel.x;
            player.pos.y += player.vel.y;
            
            if(engine.left.pressed) player.pos.x -= 1;
            if(engine.right.pressed) player.pos.x += 1;
            if(engine.up.pressed) player.pos.y -= 1;
            if(engine.down.pressed) player.pos.y += 1;
            
            if(player.pos.x < 0) {
                player.vel.x *= -1;
                engine.trigger("hitwall", "left");
            }
            if(player.pos.y < 0) {
                player.vel.y *= -1;
                engine.trigger("hitwall", "top")
            }
            if(player.pos.x > canvas.width) {
                player.vel.x *= -1;
                engine.trigger("hitwall", "right")
            }
            if(player.pos.y > canvas.height) {
                player.vel.y *= -1;
                engine.trigger("hitwall", "bottom")
            }
        }
        player.clear = function() {
            ctx.clearRect(
                player.pos.x - player.size.w/2,
                player.pos.y - player.size.h/2,
                player.size.w,
                player.size.h
            );
        }
        player.draw = function() {
            ctx.fillStyle = "red";
            ctx.fillRect(
                player.pos.x - player.size.w/2,
                player.pos.y - player.size.h/2,
                player.size.w,
                player.size.h
            );
        }
        this.player = player;
        
        this.canvas.addEventListener("mouseup", function(e) {
            log(e);
            player.clear();
            player.pos.x = e.offsetX;
            player.pos.y = e.offsetY;
        });
        
        engine.left = engine.keys.addKey({
	        keyCode: 37
        });
        engine.right = engine.keys.addKey({
	        keyCode: 39
        });
        engine.up = engine.keys.addKey({
	        keyCode: 38
        });
        engine.down = engine.keys.addKey({
	        keyCode: 40
        });
        
        engine.listen("hitwall", function(dir) {
            console.log("Player hit wall!", dir);
        });
        
    },
    
    main: function() {
        
        //this.canvas.width = this.canvas.width;
        this.player.clear();
        this.player.update();
        this.player.draw();
        
    },
    
    exit: function() {
        log("End");
    }
});

engine.start();












