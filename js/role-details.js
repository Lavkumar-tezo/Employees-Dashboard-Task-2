var allRoles;
var employeeList;
var selectedRole;
function createRoleCard(employee) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('role-card', 'flex-container', 'flex-col', 'employee-card');
    const empCardDetail = document.createElement('div');
    empCardDetail.classList.add('employee-card-title', 'w-100', 'd-flex');
    const profileImage = document.createElement('img');
    profileImage.src = employee.img;
    profileImage.alt = 'admin';
    profileImage.classList.add('employee-card-img');
    const employeeDetails = document.createElement('div');
    employeeDetails.classList.add('employee-detail');
    const employeeName = document.createElement('div');
    employeeName.classList.add('employee-name');
    employeeName.textContent = `${employee.fname} ${employee.lname}`;
    employeeDetails.appendChild(employeeName);
    const employeeDept = document.createElement('div');
    employeeDept.textContent = selectedRole.role;
    employeeDept.classList.add('employee-dept')
    employeeDetails.appendChild(employeeDept);
    empCardDetail.appendChild(profileImage);
    empCardDetail.appendChild(employeeDetails);
    cardContainer.appendChild(empCardDetail);
    const employeeContainer = document.createElement("div");
    employeeContainer.classList.add("w-100", "role-details");
    const departmentIcon = document.createElement("div");
    departmentIcon.classList.add("dept-icon", "d-flex");
    let deptImage = document.createElement('img');
    deptImage.src = "../assets/icons/emp-id.svg";
    deptImage.alt = "department-id";
    departmentIcon.appendChild(deptImage)
    const departmentId = document.createElement("div");
    departmentId.classList.add("emp-office-detail");
    departmentId.textContent = employee.empNo;
    const departmentDetails = document.createElement("div");
    departmentDetails.classList.add("role-department", "d-flex", "w-100", "jus-content-start");
    departmentDetails.appendChild(departmentIcon);
    departmentDetails.appendChild(departmentId);
    employeeContainer.appendChild(departmentDetails);
    const emailIcon = document.createElement("div");
    emailIcon.classList.add("dept-icon", "d-flex");
    let emailImage = document.createElement('img');
    emailImage.src = "../assets/icons/email.svg";
    emailImage.alt = "email-icon";
    emailIcon.appendChild(emailImage)
    const emailAddress = document.createElement("div");
    emailAddress.classList.add("emp-office-detail");
    emailAddress.textContent = employee.email;
    const emailDetails = document.createElement("div");
    emailDetails.classList.add("role-department", "d-flex", "w-100", "jus-content-start");
    emailDetails.appendChild(emailIcon);
    emailDetails.appendChild(emailAddress);
    employeeContainer.appendChild(emailDetails);
    const teamIcon = document.createElement("div");
    teamIcon.classList.add("dept-icon", "d-flex");
    let teamImage = document.createElement('img');
    teamImage.src = "../assets/icons/team.svg";
    teamImage.alt = "team-icon";
    teamIcon.appendChild(teamImage)
    const teamRole = document.createElement("div");
    teamRole.classList.add("emp-office-detail");
    teamRole.textContent = employee.dept;
    const teamDetails = document.createElement("div");
    teamDetails.classList.add("role-department", "d-flex", "w-100", "jus-content-start");
    teamDetails.appendChild(teamIcon);
    teamDetails.appendChild(teamRole);
    employeeContainer.appendChild(teamDetails);
    const locationIcon = document.createElement("div");
    locationIcon.classList.add("dept-icon", "d-flex");
    let locationImage = document.createElement('img');
    locationImage.src = "../assets/icons/location.svg";
    locationImage.alt = "location-icon";
    locationIcon.appendChild(locationImage)
    const locationAddress = document.createElement("div");
    locationAddress.classList.add("emp-office-detail");
    locationAddress.textContent = employee.location;
    const locationDetails = document.createElement("div");
    locationDetails.classList.add("role-department", "d-flex", "w-100", "jus-content-start");
    locationDetails.appendChild(locationIcon);
    locationDetails.appendChild(locationAddress);
    employeeContainer.appendChild(locationDetails);
    cardContainer.append(employeeContainer);
    const viewAllLink = document.createElement("a");
    viewAllLink.href = "#";
    viewAllLink.title = "employee-page";
    viewAllLink.target = "_blank";
    viewAllLink.classList.add('anchor', 'view-all-container')
    const viewAllText = document.createElement("div");
    viewAllText.classList.add("view-all", "d-flex");
    viewAllText.textContent = "View ";
    const arrowIcon = document.createElement("img");
    arrowIcon.src = "../assets/icons/Vector.svg";
    arrowIcon.alt = "right-arrow";
    viewAllText.appendChild(arrowIcon);
    viewAllLink.appendChild(viewAllText);
    cardContainer.appendChild(viewAllLink);
    document.querySelector('.role-card-container').appendChild(cardContainer)
}

function createDivBlock(element) {
    employeeList.forEach((emp) => {
        if (emp.role == '')
            createEmployeeDiv(emp, element)
    })
}

document.addEventListener('DOMContentLoaded', function (event) {
    allRoles = JSON.parse(localStorage.getItem('roles'))
    employeeList = JSON.parse(localStorage.getItem('employeeList'));
    var params = new URLSearchParams(window.location.search)
    let selectedRoleTitle = params.get("selectedRole");
    let getRole = allRoles.filter(function (obj) {
        return obj.role == selectedRoleTitle
    })
    selectedRole = getRole[0];
    for (let obj of selectedRole.profiles) {
        let empNo = obj.empNo;
        let emp = employeeList.filter(function (obj) {
            return obj.empNo == empNo;
        })
        createRoleCard(emp[0]);
    }
    document.querySelector('.add-employee').addEventListener('click', openAddEmployeeForm);
    document.querySelector('.cancel-edit-role').addEventListener('click', closeAddRoleForm)
    document.querySelector('#edit-assign-employees').addEventListener('focus', (event) => {
        event.target.parentElement.querySelector('.all-employees').style.display = "block";
    })
    document.querySelector(`#edit-assign-employees`).addEventListener('keyup', (event) => {
        let searchValue = event.target.value.toLowerCase()
        let allEmpList = document.querySelectorAll('.employee-name-img');
        allEmpList.forEach((emp) => {
            let name = emp.innerText.toLowerCase();
            if (name.startsWith(searchValue))
                emp.style.display = "block";
            else
                emp.style.display = "none"
        })
    })
    document.querySelector('.edit-role').addEventListener('submit', (event) => { editRole(event) })
})

function openAddEmployeeForm() {
    let elementsToHide = ["employees-title-container", "role-desc-container", "role-card-container",];
    elementsToHide.forEach((elementClass) => {
        document.querySelector(`.${elementClass}`).style.display = "none";
    });
    let form = document.querySelector(".edit-role-container")
    form.style.display = "block";
    let serachBarHeight =
        document.querySelector(".search-container").offsetHeight;
    document.querySelector(".edit-role-container").style.top = `${serachBarHeight + 20
        }px`;
    let editObject = {
        'edit-role-name': selectedRole.role,
        'edit-role-dept': selectedRole.dept.toLowerCase(),
        'edit-role-desc': selectedRole.desc.toLowerCase(),
        'edit-role-location': selectedRole.location.toLowerCase()
    }
    for (const selector in editObject) {
        const element = document.querySelector(`#${selector}`);
        if (element) {
            element.value = editObject[selector];
        }
    }
    let allEmployeeContainer = form.querySelector('.all-employees');
    allEmployeeContainer.innerHTML = ""
    createDivBlock(allEmployeeContainer);
}

function closeAddRoleForm() {
    document.querySelector(`.employees-title-container`).style.display = 'flex';
    document.querySelector(`.role-desc-container`).style.display = 'block';
    document.querySelector(`.role-card-container`).style.display = 'grid';
    document.querySelector('.edit-role-container').style.display = 'none';
    let form = document.querySelector('.edit-role');
    let allEmployeeContainer = form.querySelector('.all-employees');
    allEmployeeContainer.innerHTML = "";
    allEmployeeContainer.style.display = 'none'
}

function editRole(event) {
    event.preventDefault();
    let form = document.getElementsByClassName("edit-role")[0];
    let allEmpList = form.querySelectorAll('.employee-name-img');
    allEmpList.forEach((emp) => {
        let input = emp.querySelector('input');
        if (input.checked) {
            let empId = emp.querySelector('.hide').innerText;
            for (let employee of employeeList) {
                if (employee.empNo == empId) {
                    employee.role = selectedRole.roleId;
                    selectedRole['profiles'].push(employee);
                    break;
                }
            }
        }
    })
    localStorage.setItem('employeeList', JSON.stringify(employeeList))
    localStorage.setItem('roles', JSON.stringify(allRoles));
    form.reset();
    createToastMessage('Employee Added')
    document.querySelector('.role-card-container').innerHTML = "";
    for (let obj of selectedRole.profiles) {
        let empNo = obj.empNo;
        let emp = employeeList.filter(function (obj) {
            return obj.empNo == empNo;
        })
        createRoleCard(emp[0]);
    }
    closeAddRoleForm();
}