
function startBuild() {

  var  build_btn = document.getElementById("Build");
  var build_type;
  // console.log("Default build_type::"+build_type);

  if (document.getElementById('Spinner').checked)
  {
    build_type = document.getElementById('Spinner').value;
  } else {
    if (document.getElementById('Web').checked)
    {
      build_type = document.getElementById('Web').value;
    } else {
      if (document.getElementById('Both').checked)
      {
        build_type = document.getElementById('Both').value;
        initiateBuild("D:\\GEGDC\\SP351496\\Apps\\3DExp18x\\3DSpace\\win_b64\\code\\bin");
      }
    }
  }

}

function initiateBuild(path) {

  const { spawn } = require('child_process');
//   const spawn = require('child_process').spawn;
//   const bat = spawn('cmd.exe', ['cd /d ' +path ,'mql.exe -c \"set context user creator; temp query bus Person 9* *  output \"D:\\GEGDC\\SP351496\\Person.txt\""']);
//
//
//   bat.stdout.on('data', (data) => {
//   console.log(data);
// });
//
// bat.stderr.on('Error data', (data) => {
//   console.log(data);
// });
//
// bat.on('closed', (code) => {
//  alert(`Child exited with code ${code}`);
// });

  // process.env.ComSpec




//   const child = spawn('D:\\GEGDC\\SP351496\\Apps\\3DExp18x\\3DSpace\\win_b64\\code\\bin\\mql.exe');
//
//   setTimeout(() => {
//       child.stdin.write("\"temp query bus Person 9* * output 'D:\\GEGDC\\SP351496\\Person.txt';\" \n");
//       child.stdin.end();
//   }, 2000);
//
// // child.stdin.write("\"temp query bus Person 9* * output 'D:\\GEGDC\\SP351496\\Person.txt';\" \n");
// console.log("TEST");




//
//
//   child.stdout.on('data', (data) => {
//
//   console.log(`child stdout:\n${data}`);
// });
//
// child.stderr.on('data', (data) => {
//   console.error(`child stderr:\n${data}`);
// });

//   var child = require('child_process').execFile;
//   var executablePath = "D:\\GEGDC\\SP351496\\Apps\\3DExp18x\\3DSpace\\win_b64\\code\\bin\\mql.exe";
//
//
// child(executablePath, ["-c \"set context user creator; temp query bus Person 9* * output 'D:\GEGDC\SP351496\Person.txt';\""],{timeout: 1000}, function(err, data) {
//     if(data){
//         console.log(data.toString());
//
//        // return;
//     } else {
//     console.error(err);
//     }
//
// });

// var child = require('child_process').execFile;
// var executablePath = "D:\\GEGDC\\SP351496\\Apps\\Mozilla\\Firefox\\firefox.exe";
//
// child(executablePath, function(err, data) {
//     if(err){
//        console.error(err);
//        return;
//     }
//
//     console.log(data.toString());
// });


var child = require('child_process').execFile;
var executablePath = "Test_MQL.bat";

child(executablePath, function(err, data) {
    if(err){
       console.error(err);
       return;
    }

    console.log(data.toString());
});

}

document.querySelector('#Build').addEventListener('click', startBuild);
const cacheTools = require('./cacheTools');
