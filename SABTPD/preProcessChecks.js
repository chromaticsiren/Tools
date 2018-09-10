const server_path_check = "MATRIX-R"
const spinner_path_check = "Business\\Objects\\Relationships\\System\\Scripts"
const web_path_check = "web_path"
const CAS_Tomcat_Path_check = "CAS_Path"
const noCAS_Tomcat_Path_check = "noCAS_Path"

var  edit_btn = document.getElementById("Edit_UserPref");
var  save_btn = document.getElementById("Save_UserPref");
var user_Inputs = document.getElementsByClassName('user_Inputs');
var icon_cell_g = document.getElementsByClassName("notify_Icon");

function enableInput() {

  save_btn.disabled=false;
  edit_btn.disabled=true;

  for (j = 0; j < user_Inputs.length; j++)
  {
      var user_Inputs_1 = user_Inputs[j];
      user_Inputs_1.disabled=false;
  }

  for(a=0; a<icon_cell_g.length; a++)
  {
      var icon_td = icon_cell_g[a];
      icon_td.children[0].remove();
  }
}
function addRowHandlers() {

  var table = document.getElementById("user_Inputs_Table");
  var rows = table.getElementsByTagName("tr");

  save_btn.disabled = true;
  edit_btn.disabled = false;

  for (i = 0; i < rows.length-1; i++)
  {
      var currentRow = table.rows[i];
      user_Inputs[i].disabled=true;
      createClickHandler(currentRow, user_Inputs[i]);
  }

}

function createClickHandler(row, inputElement) {

	var img_Progress = document.createElement('img');
	img_Progress.src = ".\\images\\InProgress.gif";
	img_Progress.width = "22";
	img_Progress.height = "22";
  img_Progress.id = "inProgress";
  // img_Progress.className = "notify_Icon";
  var icon_cell;

  if(icon_cell_g.length < 7)
  {
      icon_cell = document.createElement("td");
      icon_cell.className = "notify_Icon";
      icon_cell.appendChild(img_Progress);
      row.appendChild(icon_cell);
  }

  var result = validateUserInputs(row, inputElement.id, inputElement.value);
}

function validateUserInputs(row, elem, value) {
  var l_return;
  let check_criteria = "";

  var img_Pass = document.createElement('img');
  img_Pass.src = ".\\images\\Pass-48.png";
  img_Pass.width = "22";
  img_Pass.height = "22";
  // img_Pass.className = "notify_Icon";

  var img_Fail = document.createElement('img');
  img_Fail.src = ".\\images\\Failed-48.png";
  img_Fail.width = "22";
  img_Fail.height = "22";
  // img_Fail.className = "notify_Icon";

  switch (elem) {
    default:
        check_criteria = "";
        break;
    case "path_Server":
        check_criteria = server_path_check;
        break;
    case "path_Spinner":
        check_criteria = spinner_path_check;
        break;
    case "path_Web":
        check_criteria = web_path_check;
        break;
    case "path_App_Server_CAS":
        check_criteria = CAS_Tomcat_Path_check;
        break;
    case "path_App_Server_noCAS":
        check_criteria = noCAS_Tomcat_Path_check;
        break;
  }

  if (value != "" && check_criteria != "")
  {
    // console.log(value + "\\" + check_criteria);
    var vCheck;
    if (elem == "path_Server")
    {
      vCheck = value + "\\" + check_criteria;
      // console.log("vCheck_Path_Server :::"+vCheck);
      var sCheck = fExists(vCheck);
      if(sCheck == "True")
      {
        store.set('path_Server', vCheck);
        addPositive(row, img_Pass);

      } else {
        store.set('path_Server', "");
        addError(row, img_Fail);
      }
    } else if (elem == "path_Spinner") {

        check_criteria = check_criteria.split("\\");

        var bCheck = fExists(value + "\\" + check_criteria[0]);
        var oCheck = fExists(value + "\\" + check_criteria[1]);
        var rCheck = fExists(value + "\\" + check_criteria[2]);
        var syCheck = fExists(value + "\\" + check_criteria[3]);
        var scCheck = fExists(value + "\\" + check_criteria[4]);

        if (bCheck == "True" || oCheck == "True" || rCheck == "True" || syCheck == "True" || scCheck == "True")
        {
          store.set('path_Spinner', value);
          addPositive(row, img_Pass);
        } else {
          addError(row, img_Fail);
        }
    }
  } else {
      addError(row, img_Fail);
	}
}

var fExists = function(path) {
  let fs = require('fs');
  if (fs.existsSync(path)) {
    return "True";
  } else {
    return "False";
  }
}

var addPositive = function(row, img_Pass)
{
  if(row.children[2].children[0])
  {
    row.children[2].children[0].remove();
  }
  row.children[2].append(img_Pass);
}

var addError = function(row, img_Fail)
{
  if(row.children[2].children[0])
  {
    row.children[2].children[0].remove();
  }
  row.children[2].append(img_Fail);
}


document.querySelector('#Save_UserPref').addEventListener('click', addRowHandlers)
document.querySelector('#Edit_UserPref').addEventListener('click', enableInput)


const cacheTools = require('./cacheTools');

// First instantiate the class
const store = new cacheTools({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {}
});
