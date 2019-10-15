const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});



io.on('connection', (socket) => {
    
        socket.on('new-connection', function (data) {

            console.log(data.userId);

            setInterval( function () {
                socket.emit('dashboard', { 
                    billing: {
                        "monthlyBilling": 141.52,
                        "avgMonthlyBillingCustomer": 141.52
                    },
                    order: {
                        "quantitySent": 2,
                        "quantityBilling": 1
                    },
                    user: {
                        userId: data.userId
                    }
                 });
            }, 3000);
        });
    });

http.listen(3000, function() {
    console.log('OK');
});