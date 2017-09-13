function displayUserName(e){document.getElementById("username").innerText=e||""}function logUserOut(){firebase.auth().signOut().then(function(){displayUserName(!1)}).catch(function(e){})}function signUserIn(e){e.preventDefault();let t=new FormData(e.target),n=t.get("email"),s=t.get("password");e.target.reset(),firebase.auth().signInWithEmailAndPassword(n,s).then(function(){let e="users/"+firebase.auth().currentUser.uid;firebase.database().ref(e).once("value").then(function(e){let t=e.val().name;app.username=t,displayUserName(t)})}).catch(function(e){console.log(e.message)})}function signUserUp(e){e.preventDefault();let t=new FormData(e.target),n=t.get("username"),s=t.get("email"),a=t.get("password");e.target.reset(),firebase.auth().createUserWithEmailAndPassword(s,a).then(function(){let e="users/"+firebase.auth().currentUser.uid,t={name:n};firebase.database().ref(e).set(t).then(function(e){displayUserName(n)})}).catch(function(e){console.log("account creation failed")})}function removeDone(){for(let e=TaskArray.length-1;e>=0;e--)1==TaskArray[e].status&&(TaskArray.splice(e,1),saveTasks(),renderTaskList());toggleShowButton()}function onSubmit(e){e.preventDefault();let t=document.getElementById("task-input").value;if(""!=t){let n=new Task(t);TaskArray.push(n),saveTasks(),e.target.reset(),renderTaskList()}}function createNewTask(e){let t=document.createElement("LI");t.setAttribute("id",e.id),t.setAttribute("data-status",e.status);let n=document.createTextNode(e.name);t.appendChild(n),document.getElementById("task-list").appendChild(t),writeTask(app.userid,e)}function writeTask(e,t){if(app.userid){let n="lists/"+e+"/"+t.id,s={name:t.name,status:t.status};firebase.database().ref(n).set(s)}}function readTask(e){let t="lists/"+e;firebase.database().ref(t).once("value").then(function(e){let t=e.val(),n=Object.keys(t).length,s=Object.keys(t);for(let e=0;e<n;e++){let n=t[s[e]],a=n.name,r=n.status,i={id:s[e],name:a,status:r};Task.Array.push(i),renderTaskList()}})}function clearTaskList(){document.getElementById("task-list").innerHTML=""}function renderTaskList(){let e=TaskArray.length;clearTaskList();for(let t=0;t<e;t++)createNewTask(TaskArray[t]);toggleShowButton()}function changeTaskStatus(e){let t=e.target.id,n=TaskArray.length;for(let e=0;e<n;e++){let n=TaskArray[e];if(n.id==t){switch(n.status){case 0:n.status=1;break;case 1:n.status=0}saveTasks(),renderTaskList()}}}function saveTasks(){}function loadTasks(){}function toggleShowButton(){let e=!1,t=TaskArray.length;for(let n=0;n<t;n++)1==TaskArray[n].status&&(e=!0);1==e?document.getElementById("remove").setAttribute("class","show"):document.getElementById("remove").removeAttribute("class")}function showForm(e){let t=document.querySelectorAll(".overlay");for(let n=0;n<t.length;n++)t[n].style.display="none",t[n].getAttribute("id")==e&&(t[n].style.display="flex")}class Task{constructor(e){return this.name=e,this.status=0,this.id=(new Date).getTime(),this}}var TaskArray=[],app={userid:0,username:""};firebase.auth().onAuthStateChanged(function(e){if(e){app.userid=e.uid;let t=document.querySelectorAll(".overlay");for(let e=0;e<t.length;e++)t[e].style.display="none";let n="users/"+app.userid;firebase.database().ref(n).once("value").then(function(e){let t=e.val().name;app.username=t,displayUserName(t)}),readTask(app.userid)}else showForm("signin-box"),clearTaskList()}),window.addEventListener("load",function(){const e=document.getElementById("signup-template"),t=document.getElementById("signin-template");var n=document.importNode(e.content,!0);document.querySelector(".appview").appendChild(n);var s=document.importNode(t.content,!0);document.querySelector(".appview").appendChild(s);const a=document.getElementById("signin-link"),r=document.getElementById("signup-link");showForm("signin-box"),a.addEventListener("click",function(){showForm("signin-box")}),r.addEventListener("click",function(){showForm("signup-box")}),document.getElementById("signup-form").addEventListener("submit",signUserUp),document.getElementById("signin-form").addEventListener("submit",signUserIn),document.getElementById("logout").addEventListener("click",logUserOut),loadTasks(),document.getElementById("task-form").addEventListener("submit",onSubmit),document.getElementById("task-list").addEventListener("click",changeTaskStatus),document.getElementById("remove").addEventListener("click",removeDone),displayUserName(app.username)});