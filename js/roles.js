var allRoles;
var employeeList;

function createRoleCard(data) {
  const parent = document.querySelector('.role-card-container');
  const roleCard = document.createElement("div");
  roleCard.className = "role-card flex-container flex-col";
  const roleName = document.createElement("div");
  roleName.className = "role-title-icon d-flex jus-content-btw w-100";
  const roleTitle = document.createElement("div");
  roleTitle.className = "role-title";
  roleTitle.textContent = data.role;
  const editIcon = document.createElement("img");
  editIcon.src = "../assets/icons/edit.svg";
  editIcon.alt = "edit-icon";
  editIcon.addEventListener('click',(event)=>{
    openEditRoleForm(event)
  })
  roleName.appendChild(roleTitle);
  roleName.appendChild(editIcon);
  const roleDetails = document.createElement("div");
  roleDetails.className = "w-100 role-details flex-container flex-col";
  const roleDepartment = document.createElement("div");
  roleDepartment.className = "role-department d-flex jus-content-btw w-100";
  const deptIcon = document.createElement("div");
  deptIcon.className = "dept-icon d-flex";
  const deptImg = document.createElement("img");
  deptImg.src = "../assets/icons/emp-id.svg";
  deptImg.alt = "department-icon";
  const deptLabel = document.createTextNode("Department");
  deptIcon.appendChild(deptImg);
  deptIcon.appendChild(deptLabel);
  const roleDeptName = document.createElement("div");
  roleDeptName.className = "role-dept-name";
  roleDeptName.textContent = data.dept;
  roleDepartment.appendChild(deptIcon);
  roleDepartment.appendChild(roleDeptName);
  const roleLocation = document.createElement("div");
  roleLocation.className = "role-department d-flex jus-content-btw w-100";
  const locIcon = document.createElement("div");
  locIcon.className = "dept-icon d-flex";
  const locImg = document.createElement("img");
  locImg.src = "../assets/icons/location.svg";
  locImg.alt = "location-icon";
  const locLabel = document.createTextNode("Location");
  locIcon.appendChild(locImg);
  locIcon.appendChild(locLabel);
  const roleLocName = document.createElement("div");
  roleLocName.className = "role-dept-location";
  roleLocName.textContent = data.location;
  roleLocation.appendChild(locIcon);
  roleLocation.appendChild(roleLocName);
  const totalEmployee = document.createElement("div");
  totalEmployee.className = "role-department d-flex jus-content-btw w-100";
  const totalLabel = document.createElement("div");
  totalLabel.className = "dept-icon";
  totalLabel.textContent = "Total Employee";
  const emplProfileContainer = document.createElement("div");
  emplProfileContainer.className = "empl-profile-container d-flex jus-content-btw";
  let minimumProfie = Math.min(data.profiles.length,4);
  for (let i = 0; i < minimumProfie; i++) {
    const profileImg = document.createElement("img");
    let profileEmpNo=data.profiles[i].empNo;
    let emp = employeeList.filter(function (obj) {
      return obj.empNo == profileEmpNo;
    });
    if(emp.length==0){
      data.profiles.splice(i,1)
      i--;
      continue;
    }
    profileImg.src = emp[0].img;
    profileImg.src = emp[0].img;
    profileImg.alt ="profile-img";
    profileImg.className = `profile-${i+1}`;
    emplProfileContainer.appendChild(profileImg);
  }
  if(data.profiles.length>4){
    const plusEmployee = document.createElement("span");
    plusEmployee.className = "plus-employee flex-container";
    plusEmployee.innerText=`+${data.profiles.length-4}`;
    emplProfileContainer.appendChild(plusEmployee);
  }
  else{
    let width=(data.profiles.length+1)*0.5;
    emplProfileContainer.style.width=`${width}rem`;
  }
  totalEmployee.appendChild(totalLabel);
  totalEmployee.appendChild(emplProfileContainer);
  roleDetails.appendChild(roleDepartment);
  roleDetails.appendChild(roleLocation);
  roleDetails.appendChild(totalEmployee);
  const viewAllContainer = document.createElement("a");
  viewAllContainer.className = "anchor view-all-container";
  viewAllContainer.href =`../HTML/role-details.html?selectedRole=${data.role}`;
  viewAllContainer.title = 'employee-page';
  const viewAll = document.createElement("div");
  viewAll.className = "view-all-container d-flex";
  viewAll.innerText="View all Employee";
  const rightArrow = document.createElement("img");
  rightArrow.src = "../assets/icons/Vector.svg";
  rightArrow.alt = "right-arrow";
  viewAll.appendChild(rightArrow);
  viewAllContainer.appendChild(viewAll);
  roleCard.appendChild(roleName);
  roleCard.appendChild(roleDetails);
  roleCard.appendChild(viewAllContainer);
  parent.appendChild(roleCard);
}

function filterCheck(role, check) {
  let status = document.getElementById(check);
  if (!status.value) return true;
  let selectedStatus = [];
  let allOptions = status.parentElement.querySelectorAll(
    ".custom-option input"
  );
  for (let option of allOptions) {
    if (option.checked) selectedStatus.push(option.value.toLowerCase());
  }
  let empStatus;
  if (check == "department") {
    empStatus = role
      .getElementsByClassName(`role-dept-name`)[0]
      .innerText.toLowerCase()
      .replace(/[^a-zA-Z/ ]/g, "");
  } else {
    empStatus = role
      .getElementsByClassName(`role-dept-location`)[0]
      .innerText.toLowerCase();
  }
  for (let i = 0; i < selectedStatus.length; i++) {
    if (selectedStatus[i] == empStatus) return true;
  }
  return false;
}

function filterSearch() {
  let allRoles, role, i;
  allRoles = document.getElementsByClassName("role-card-container");
  role = allRoles[0].getElementsByClassName("role-card");
  let count=0;
  for (i = 0; i < role.length; i++) {
    let deptCheck = filterCheck(role[i], "department");
    let locationCheck = filterCheck(role[i], "location");
    if(deptCheck && locationCheck){
      role[i].style.display = "flex"
      count++;
    }
    else{
      role[i].style.display = "none"
    }
  }
  if(count==0)
    changeElementDisplay('.no-record-card','flex')
  else
  changeElementDisplay('.no-record-card','none')
}

function resetFilter() {
  document.querySelectorAll(".filter-select .custom-input").forEach((select) => {
      select.value = "";
  });
  document.querySelectorAll(".filter-select .custom-option input").forEach((input) => {
      input.checked = false;
    });
  filterSearch();
}

function openAddRoleForm() {
  let elementsToHide = ["employees-container","reset-filter","role-card-container",
  ];
  elementsToHide.forEach((elementClass) => {
    changeElementDisplay(`.${elementClass}`,"none")
  });
  let form=document.querySelector(".add-role-container")
  changeElementDisplay(".add-role-container",'block')
  let serachBarHeight =
    document.querySelector(".search-container").offsetHeight;
  document.querySelector(".add-role-container").style.top = `${
    serachBarHeight + 20
  }px`;
  let allEmployeeContainer=form.querySelector('.all-employees');
  allEmployeeContainer.innerHTML=""
  createDivBlock(allEmployeeContainer);
}

function closeAddRoleForm() {
  let display = {
    ".add-role-container": "none",
    ".reset-filter": "flex",
    ".employees-container": "flex",
    ".role-card-container": "grid",
  };
  for (let element in display) {
    changeElementDisplay(`${element}`,display[element])
  }
  let form = document.querySelector('.add-role');
  form.reset()
  form.querySelector('.added-emp-number').innerText=''
  let allEmployeeContainer=form.querySelector('.all-employees');
  allEmployeeContainer.innerHTML="";
  allEmployeeContainer.style.display='none'
  validateField(form, false, 'none')
}

function openEditRoleForm(event){
  let roleTitle=event.target.parentElement.querySelector('.role-title').innerText;
  let selectedRoleDetail=allRoles.filter(function(obj){
    return obj.role==roleTitle;
  })
  localStorage.setItem('selectedRole',JSON.stringify(roleTitle));
  const elementToHide=['employees-container','reset-filter','role-card-container'];
  elementToHide.forEach((element)=>{
    changeElementDisplay(`.${element}`,'none')
  })
  let form=document.querySelector('.edit-role-container');
  changeElementDisplay('.edit-role-container','block')
  let initialEmp=selectedRoleDetail[0].profiles.length;
  if(initialEmp)
    form.querySelector('.added-emp-number').innerText=`${initialEmp} selected`
  let editObject={
    'edit-role-name':selectedRoleDetail[0].role,
    'edit-role-dept':selectedRoleDetail[0].dept.toLowerCase(),
    'edit-role-desc':selectedRoleDetail[0].desc.toLowerCase(),
    'edit-role-location':selectedRoleDetail[0].location.toLowerCase()
  }
  for (const selector in editObject) {
    const element = document.querySelector(`#${selector}`);
    if (element) {
      element.value=editObject[selector];
    }
  }
  let allEmployeeContainer=form.querySelector('.all-employees');
  allEmployeeContainer.innerHTML=""
  createDivBlock(allEmployeeContainer);
}

function closeEditRoleForm(){
  changeElementDisplay(`.employees-container`,'flex')
  changeElementDisplay(`.reset-filter`,'flex')
  changeElementDisplay(`.role-card-container`,'grid')
  changeElementDisplay(`.edit-role-container`,'none')
  let form = document.querySelector('.edit-role');
  form.querySelector('.added-emp-number').innerText=''
  let allEmployeeContainer=form.querySelector('.all-employees');
  allEmployeeContainer.innerHTML="";
  allEmployeeContainer.style.display='none'
  validateField(form, false,'none')
}

function createDivBlock(element){
  let selectedRole=JSON.parse(localStorage.getItem('selectedRole'));
  let selectedRoleTitle=allRoles.filter(function(obj){
    return obj.role==selectedRole;
  })
  employeeList.forEach((emp)=>{
    if(emp.role=='')
      createEmployeeDiv(emp,element)
    if(selectedRoleTitle.length!=0){
      if(emp.role==selectedRoleTitle[0].roleId){
        createEmployeeDiv(emp,element,true)
      }
    }
  })
}

document.addEventListener("DOMContentLoaded",function () {
  employeeList=JSON.parse(localStorage.getItem('employeeList'));
  allRoles=JSON.parse(localStorage.getItem('roles'))
  allRoles.forEach((obj)=>{
    let roleId=obj.roleId;
    obj.profiles=[];
    let filteredEmp= employeeList.filter(function(obj){
      for(let i=0;i<obj.role.length;i++){
        if(obj.role==roleId){
          return true;
        }
      }
    })
    obj.profiles=filteredEmp;
  })
  localStorage.removeItem('selectedRole');
  localStorage.setItem('roles',JSON.stringify(allRoles));
  allRoles.forEach((role)=>{
    createRoleCard(role)
  })
  localStorage.removeItem('selectedRole')
  let clickEvent = {
    ".reset-btn": resetFilter,
    ".apply-btn": filterSearch,
    ".add-role-btn": openAddRoleForm,
    ".cancel-add-role": closeAddRoleForm,
  };
  for (let element in clickEvent) {
    document.querySelector(element).addEventListener("click", clickEvent[element]);
  }

  let allFilterSelects = document.querySelectorAll(".custom-select");
  allFilterSelects.forEach((filter) => {
    let customInput = filter.querySelector(".custom-input");
    let customOption = filter.querySelectorAll(".custom-option");
    customInput.addEventListener("focus", (event) => {
      toggleOptions(event.target.parentElement,'custom-options');
    });

    for (let i = 0; i < customOption.length; i++) {
      customOption[i]
        .querySelector("input")
        .addEventListener("click", (event) => {
          updateInput(event.target.parentElement.parentElement.parentElement,'custom-option','custom-input');
        });
    }

    document.addEventListener("click", function (event) {
      let target = event.target;
      if (!filter.contains(target)) {
        filter.querySelector(".custom-options").style.display = "none";
      }
    });
  });
  let empCardOption=['assign-employees','edit-assign-employees'];
  empCardOption.forEach((empCard)=>{
    document.querySelector(`#${empCard}`).addEventListener('focus',(event)=>{
      event.target.parentElement.querySelector('.all-employees').style.display = "block";
    })
    document.querySelector(`#${empCard}`).addEventListener('keyup',(event)=>{
      let searchValue=event.target.value.toLowerCase()
      let allEmpList=document.querySelectorAll('.employee-name-img');
      allEmpList.forEach((emp)=>{
        let name=emp.innerText.toLowerCase();
        if(name.startsWith(searchValue))
          emp.style.display="block";
        else
          emp.style.display="none"
      })
    })
  })

  document.querySelector('.submit-add-role').addEventListener('click',(event)=>{
    addRole(event,'add')
  })
  document.querySelector('.submit-edit-role').addEventListener("click", (event) => {
    if (event.target.innerText == "Edit") {
      event.target.innerText = "Apply Changes";
      activateInput();
    }
    else {
      event.target.type = "submit";
      addRole(event, 'edit');
    }
  });
  document.querySelector('.cancel-edit-role').addEventListener("click", (event) => {
    activateInput(true);
    document.querySelector('.submit-edit-role').innerText = "Edit";
    document.querySelector('.submit-edit-role').type = "button";
    localStorage.removeItem('selectedRole')
    closeEditRoleForm();
  });

});


function activateInput(flag = false) {
  let allDisabledInputs = ['edit-role-name', 'edit-role-dept', 'edit-role-desc', 'edit-role-location','edit-assign-employees'];
  allDisabledInputs.forEach((input) => {
    document.querySelector(`#${input}`).disabled = flag;
  })
}

function addRole(event,mode){
  event.preventDefault();
  let form;
  if (mode == 'add') {
    form = document.getElementsByClassName("add-role")[0];;
  }
  else {
    form = document.getElementsByClassName("edit-role")[0];;
  }
  let check = validateField(form,mode);
  if(check==0)
    return;
  let newRole={
    profiles:[]
  }
  let element=form.querySelector('[name="role"]');
  newRole[element.name]=element.value;
  element=form.querySelector('[name="desc"]');
  newRole[element.name]=element.value;
  element=form.querySelector('[name="location"]');
  let optionText = element.options[element.selectedIndex].innerText;
  newRole[element.name]=optionText;
  element=form.querySelector('[name="dept"]');
  optionText = element.options[element.selectedIndex].innerText;
  newRole[element.name]=optionText;
  let allEmpList=form.querySelectorAll('.employee-name-img');
  allEmpList.forEach((emp)=>{
      let input=emp.querySelector('input');
      if(input.checked){
        let empId=emp.querySelector('.hide').innerText;
        for(let employee of employeeList){
          if(employee.empNo==empId){
            newRole['profiles'].push(employee);
            break;
          }
        }
      }
  })
  if (mode == "edit") {
    let selectedRole = JSON.parse(localStorage.getItem("selectedRole")).toLowerCase();
    let allRoleCard=document.querySelectorAll('.role-card')
    allRoleCard.forEach((roleCard)=>{
      let roleCardTitle=roleCard.querySelector('.role-title').innerText.toLowerCase();
      if(roleCardTitle==selectedRole)
        roleCard.remove();
    })
    let selectedRoleDetails=allRoles.filter(function (obj) {
      return obj.role.toLowerCase() == selectedRole;
    });
    let selectedRoleId=selectedRoleDetails[0].roleId;
    employeeList.forEach((empl)=>{
      if(empl.role==selectedRoleId)
        empl.role=''
    })
    localStorage.setItem('employeeList',JSON.stringify(employeeList));
    let newRoles = allRoles.filter(function (obj) {
      return obj.role.toLowerCase() !== selectedRole;
    });
    allRoles = newRoles;
    localStorage.removeItem("selectedRole");
  }
  createRoleCard(newRole);
  allRoles.push(newRole);
  addRoleToEmployee(newRole);
  localStorage.setItem('roles',JSON.stringify(allRoles));
  form.reset();
  if(mode=='add'){
    closeAddRoleForm();
    createToastMessage('Role Added')
  }
  else{
    closeEditRoleForm();
    createToastMessage('Changes Applied')
    document.querySelector('.submit-edit-role').type="button";
  }
}

function validateField(form, flag = true) {
  let check=1;
  const DangerInput=[
    "role",
    "dept",
    "desc",
    "location",
  ]
  let formInputs=Array.from(form);
  let formInput=formInputs.filter(function(input){
    let find=DangerInput.indexOf(input.name.toLowerCase())
    if(find!=-1)
      return input
  })
  for (let key in formInput) {
    let element = formInput[key];
    if(element.name=='desc'){
      continue;
    }
    else if (element.value == "") {
        showValidInput(element, `&#9888; ${DangerInput[key]} is required`,flag);
        check=0;
    }
    else if(element.name=='role'){
      let newRoleName=element.value.trim().toLowerCase();
      if(!newRoleName.match(/^[a-zA-Z ]+$/)){
        showValidInput(element, `&#9888; role name should have alphabets`,flag);
        check=0;
      }
      let selectedRole=JSON.parse(localStorage.getItem('selectedRole'));
      if((selectedRole && selectedRole.toLowerCase()!=newRoleName)|| !selectedRole)
      {
        for(let i=0;i<allRoles.length;i++){
          console.log(allRoles[i].role.trim().toLowerCase())
          if((allRoles[i].role.trim().toLowerCase()===newRoleName)){
            showValidInput(element, `&#9888; This role has been already registered`,flag);
            check=0;
            break;
          }
        }
      }
    }

  }
  return check;
}

function addRoleToEmployee(role){
  let sortedRole= allRoles.sort((a,b)=>{
    return a.roleId > b.roleId? 1 : -1;
  })
  let highestRoleId=sortedRole[sortedRole.length-1].roleId;
  let highestRoleNum=highestRoleId.substring(2,highestRoleId.length);
  role.roleId=`IN${Number(highestRoleNum)+1}`
  for(let i=0;i<role.profiles.length;i++){
    let empl=role.profiles[i];
    for(let employee of employeeList){
      if(employee==empl){
        employee.role=role.roleId;
        break;
      }
    }
  }
  localStorage.setItem('employeeList',JSON.stringify(employeeList));
}



