function Promise(callback) {
    var self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];
    callback(resolve,reject);
    function resolve(value) {
        if(self.status==='pending') {
            self.status = 'fulfilled';
            self.data = value;
            for(let i = 0;i<self.onResolvedCallback.length;i++) {
                self.onResolvedCallback[i](value);
            }
        }
    }
    function reject (error) {
        if(self.status==='pending') {
            self.status = 'rejected';
            self.data = error;
            for(let i = 0;i<self.onResolvedCallback.length;i++) {
                self.onResolvedCallback[i](error);
            }
        }
    }
}
Promise.prototype.then = function (onResolved,onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : function(value){}
    onRejected = typeof onRejected === 'function' ? onRejected : function(reson){}
    if(self.status==='resolved') {
        return promise2 = new Promise(function(resolve,reject){
            try{
                var x = onResolved(self.data);
                if(x instanceof Promise) {
                    x.then(resolve,reject)
                }
                resolve(x);
            }catch(e) {
                reject(x)
            }
        })
    }
    if(self.status === 'rejected') {
        return promise2 = new Promise(function(resolve,reject){
            try{
                var x = onRejected(self.data);
                if(x instanceof Promise) {
                    x.then(resolve,reject)
                }
            }catch(e) {
                reject(e)
            }
        })
    }
    if(self.status === 'pending') {
        return promise2 = new Promise(function(resolve,reject){
            self.onResolvedCallback.push(function(value){
                try{
                    var x = onResolved(self.data);
                    if(x instanceof Promise) {
                        x.then(resolve,reject)
                    }
                }catch(e) {
                    reject(e)
                }
            })
            self.onRejectedCallback.push(function(reson) {
                try{
                    var x = onRejected(self.data);
                    if(x instanceof Promise) {
                        x.then(resolve,reject)
                    }
                }catch(e) {
                    reject(e)
                }
            })
        })
    }
}
Promise.prototype.catch = function(onRejected) {
    return this.then(null,onRejected)
} 