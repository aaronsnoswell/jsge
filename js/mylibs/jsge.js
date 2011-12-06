/**
 * jsge.js - A lightweight, evented javascript game engine
 */

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

var jsge = function(canvas_id, args) {
    me = {};
    
    // Globals here
    me.running = true;
    me.event_dispatch = document.createElement("div");
    me.events = {};
    
    me.start = function() {
        
        
        // Internal init code here...
        me.canvas = document.getElementById(canvas_id);  
        me.ctx = me.canvas.getContext('2d');
        
        me.keys = new keyListener({
	        name: 'keyListener'
        });
        
        args.init && args.init.apply(this);
        
        var local_closure = this;
        function loop() {
            if(me.running) {
                requestAnimFrame(loop, me.canvas);
                
                // Internal drawing code here
                // Input
                // Update
                // Draw
                
                args.main && args.main.apply(local_closure)
            } else {
                args.exit && args.exit.apply(local_closure);
                
                // Internal pack-up code here
                
            }
            
        }
        
        loop();
        
    }
    
    me.trigger = function(event_name, args) {
        if(!(args instanceof Array)) args = [args];
        for(var f in this.events[event_name]) {
            this.events[event_name][f].apply(this, args);
        }
    }
    
    me.listen = function(event_name, handler) {
        me.events[event_name] = me.events[event_name] || [];
        me.events[event_name].push(handler);
    }
    
    me.quit = function() {
        this.running = false;
    }
    
    return me;
}


