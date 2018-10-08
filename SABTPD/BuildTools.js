
function startBuild() {

  var  build_btn = document.getElementById('Build');
  var build_type;

  if (document.getElementById('Spinner').checked)
  {
    build_type = document.getElementById('Spinner').value;
  }
  else if (document.getElementById('Web').checked)
  {
    build_type = document.getElementById('Web').value;
  }
  else if (document.getElementById('Both').checked)
  {
    build_type = document.getElementById('Both').value;
    initiateBuild('D:\\GEGDC\\SP351496\\Apps\\3DExp18x\\3DSpace\\win_b64\\code\\bin');
  }
}

function initiateBuild(path) {

//<!--- Working Set Start -->
// var child = require('child_process').execFile;
// var executablePath = '.\\I-O\\Test_MQL.bat';
//
// child(executablePath, function(err, data) {
//     if(err){
//        console.error(err);
//        return;
//     }
//     console.log(data.toString());
// });
//<!--- Working Set End-->

var cp = require("child_process");

cp.exec('mql -t -c "verb on; set context user creator; run PRE_Scripts.mql;" > Electron.txt',
{cwd: 'D:\\GEGDC\\SP351496\\LocalUpdate\\gtccplm_spinner\\Scripts',
 env: {path : 'D:\\GEGDC\\SP351496\\Apps\\3DExp18x\\3DSpace\\win_b64\\code\\bin'}
},
function(error,stdout,stderr){
});

}

document.querySelector('#Build').addEventListener('click', startBuild);
const cacheTools = require('./cacheTools');
