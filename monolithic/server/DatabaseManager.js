const fs = require('fs');
const fileName = "data/orderspersisted.json";

exports.save = function (orders) {
    fs.writeFile(fileName, JSON.stringify(orders), (err) => {
        if (err) throw err;
    })
};

exports.load = function () {
    if (fs.existsSync(fileName)) {
        try {
            let orders = JSON.parse(fs.readFileSync(fileName));
            // console.log(orders);
            return orders;
        } catch (e) {
            console.error(e);
            fs.renameSync(fileName, `${fileName}.${Date.now()}`);  // invalid json, so backup and start fresh
        }
    }
    return [];
}