let save=document.getElementById('save');
let hostName=document.getElementById('hostname');
let userName=document.getElementById('username');
let password=document.getElementById('password');
let optional=document.getElementById('optional');
let tbody=document.getElementById('tbody');
let editHostname=document.getElementById('edithostname');
let editUsername=document.getElementById('editusername');
let editPassword=document.getElementById('editpassword');
let editOptional=document.getElementById('editoptional');
let editSave=document.getElementById('edit-save');
let editId=document.getElementById('edit-id');
let copy=document.getElementById('copy');


const fetchData=()=>{
    let getData=localStorage.getItem('webliska');
    let makeArray=JSON.parse(getData);
    let str='';
    let sno=1;
    if(makeArray !== null){
    makeArray.forEach((element,index) => {
              str+=`<tr>
                    <td>${sno++}</td>
                    <td>${element.hostName} <button style="background-color: transparent; filter:invert(100%);" onclick="copyText('${element.hostName}')"> <i class="fa fa-clipboard copy-icon"></i></button></td>
                    <td>${element.userName} <button style="background-color: transparent; filter:invert(100%);" onclick="copyText('${element.userName}')"> <i class="fa fa-clipboard copy-icon"></i></button></td>
                    <td>${element.password} <button style="background-color: transparent; filter:invert(100%);" onclick="copyText('${element.password}')"> <i class="fa fa-clipboard copy-icon"></i></button></td>
                    <td>${element.optional} <button style="background-color: transparent; filter:invert(100%);" onclick="copyText('${element.optional}')"> <i class="fa fa-clipboard copy-icon"></i></button></td>
                    <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRecord(${index})">Edit</button>         <button onclick="deleteRecord(${index})">Delete</button></td>
                </tr>`;
    });
  }
    tbody.innerHTML=str;
    
}

fetchData();
const saveData =()=>{
     if(hostName.value.trim() && userName.value.trim() && password.value.trim()){
        let existingData = localStorage.getItem('webliska'); 
        let arr = existingData ? JSON.parse(existingData) : [];
        arr.push({
        hostName:hostName.value,
        userName:userName.value,
        password:password.value,
        optional:optional.value
      });
      localStorage.setItem('webliska',JSON.stringify(arr));
      hostName.value='';
      userName.value='';
      password.value='';
      optional.value='';
      swal("Success!", "added.!", "success"); 
    }else{
          swal("Ohh!", "hostname, username, password are required.!", "warning");
    }

    fetchData();
}


save.addEventListener('click',function(){
     saveData();
   
});

const deleteRecord  =(event)=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if(willDelete){
        let getData=JSON.parse(localStorage.getItem('webliska'));
        getData.splice(event,1);
        localStorage.setItem('webliska', JSON.stringify(getData));
        swal("Success!", "deleted.!", "success");
        fetchData();
        }
      });
     
}

editRecord =(index)=>{

        let getData = JSON.parse(localStorage.getItem('webliska')) || [];

        let item = getData[index];
  
        editHostname.value = item.hostName;
        editUsername.value = item.userName;
        editPassword.value = item.password;
        editOptional.value = item.optional;
        editId.value=index;
}

editSave.addEventListener('click',()=>{
        let getData=JSON.parse(localStorage.getItem('webliska')) || [];
        if(editHostname.value.trim() && editUsername.value.trim() && editPassword.value.trim()){
            getData[editId.value] = {
            hostName: editHostname.value,
            userName: editUsername.value,
            password: editPassword.value,
            optional: editOptional.value
        };
          localStorage.setItem('webliska', JSON.stringify(getData));
          fetchData();
          swal("Success!", "updated.!", "success"); 
        
      }else{
            swal("Ohh!", "hostname, username, password are required.!", "warning");
      }
           

});

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
      copy.style.display="block";
      copy.innerHTML="✔ Copied";
      setTimeout(() => {
          copy.style.display="none";
          copy.innerHTML=" ";
      }, 1000);
  }).catch(err => {
      console.error('Failed to copy text: ', err);
  });
}