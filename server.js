const app = require("express")();
const request = require("request");
const httpAgent = require("socks5-http-client/lib/Agent");
const httpsAgent = require("socks5-https-client/lib/Agent");
const config = require("./config");

app.use("/proxy", (req, res) => {
    if (req.query.url) {
        request({
            url: req.query.url,
            agentClass: req.query.url.includes("https://") ? httpsAgent : httpAgent,
            agentOptions: {
                socksHost: config.proxy.host,
                socksUsername: config.proxy.username,
                socksPassword: config.proxy.password
            }
        }, (error, response, body) => {
            if (!error) res.send(body);
            else res.sendStatus(500);
        });
    }
}).listen(config.port);
