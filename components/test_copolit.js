function calculateDaysBetweenDates(begin, end){
    const date1 = new Date(begin);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}

function createTableVueComponent(){
    Vue.component('table-component', {
        props: ['tabledata'],
        template: `
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th v-for="key in tabledata[0]" v-if="key != 'id'">{{ key }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tabledata">
                    <td v-for="key in row" v-if="key != 'id'">{{ row[key] }}</td>
                </tr>
            </tbody>
        </table>
        `
    })
}

// find all images without alternate text
// give them a red border
function process(){
    var images = document.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++){
        if(images[i].alt == ""){
            images[i].style.border = "2px solid red";
        }
    }
}


//Express server on port 3000
const express = require('express');
const app = express();
const port = 3000;

//Serve static files
app.use(express.static('public'));

//Return the current time
app.get('/time', (req, res) => {
    res.send(new Date());
});

//start crontab
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 0 * * *', function() {
    //run every day at midnight
    process();
});

//create a import component use vue component
function createImportVueComponent (){
    Vue.component('import-component', {
        props: ['importdata'],
        template: `
        <div>
        </div>
        `
    })
}

//create a export vue component use vue component
function createExportVueComponent (){
    Vue.component('export-component', {
        props: ['exportdata'],
        template: `
        <div>
        </div>
        `
    })
}