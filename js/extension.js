function changeElementDisplay(element,value){
    document.querySelector(`${element}`).style.display=value;
}

function showValidInput(element, message, flag) {
    if (!flag) return hideRequiredMessage(element)
    element.style.borderColor = 'red';
    let parentDiv = element.parentElement;
    let span = parentDiv.querySelector('span');
    span.innerHTML = message;
    span.style.color = 'red';
    element.addEventListener('change', (event) => {
      hideRequiredMessage(event.target);
    });
}

function hideRequiredMessage(element) {
    element.style.borderColor = 'rgba(227,229,233,255)';
    let parentDiv = element.parentElement;
    let span = parentDiv.querySelector('span');
    if (!span)
      span = parentDiv.parentElement.querySelector('span');
    span.innerText = '';
}

function setElementAttribute(element,attr,value){
    document.querySelector(`${element}`).setAttribute(`${attr}`,value)
}

function hidePopUp() {
    let popup = document.querySelector('.toast');
    if(popup)
      popup.remove();
}

function createToastMessage(message){
    let toastDiv = document.createElement("div");
    toastDiv.classList.add("toast", "flex-container");
    let tickContainer = document.createElement("div");
    tickContainer.classList.add("toast-tick-container", "flex-container");
    let tickImg = document.createElement("img");
    tickImg.src = "../assets/icons/tick.svg";
    tickImg.alt = "tick";
    tickContainer.appendChild(tickImg);
    let textSpan = document.createElement("span");
    textSpan.textContent = message;
    let crossContainer = document.createElement("div");
    crossContainer.classList.add("toast-cross-container", "flex-container");
    let crossImg = document.createElement("img");
    crossImg.src = "../assets/icons/cross.svg";
    crossImg.alt = "cross";
    crossContainer.addEventListener('click',hidePopUp)
    crossContainer.appendChild(crossImg);
    tickContainer.appendChild(tickImg);
    toastDiv.appendChild(tickContainer);
    toastDiv.appendChild(textSpan);
    toastDiv.appendChild(crossContainer);
    setTimeout(hidePopUp,4500);
    let content = document.querySelector(".content");
    content.appendChild(toastDiv);
}

function updateInput(event,mainInput,parent) {
    let input = event.querySelectorAll(`.${mainInput} input`);
    let count = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i].checked) {
        count++;
      }
    }
    let customInput = event.querySelector(`.${parent}`);
    if(customInput.tagName.toLowerCase()==='span'){
      customInput.innerText=count == 0 ? "" : `${count} selected`;
    }
    else
      customInput.value = count == 0 ? "" : `${count} selected`;
}
  
function toggleOptions(event,check) {
    let customOptions = event.querySelector(`.${check}`);
    if (customOptions.style.display === "block") {
      customOptions.style.display = "none";
    } else {
      customOptions.style.display = "block";
    }
}

function createEmployeeDiv(employee, main, flag = false) {
    let div = document.createElement("div");
    div.className = "employee-name-img w-100";
    let label = document.createElement("label");
    label.className = "assignable-employee d-flex jus-content-btw";
    let detail = document.createElement("div");
    detail.className = "assign-emp-detail d-flex";
    let img = document.createElement("img");
    img.src = employee.img;
    img.alt = "employee-image";
    let span = document.createElement("span");
    let employeeName = `${employee.fname} ${employee.lname}`
    span.textContent = employeeName;
    (employeeName.length > 18) ? span.setAttribute('title', employeeName) : span.setAttribute('title', '')
    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = flag;
    input.addEventListener('click',(event)=>{
        updateInput(event.target.parentElement.parentElement.parentElement.parentElement,'all-employees','added-emp-number');
      })
    detail.appendChild(img);
    detail.appendChild(span);
    label.appendChild(detail);
    label.appendChild(input);
    div.appendChild(label);
    let empid = document.createElement("span");
    empid.innerText = employee.empNo;
    empid.classList.add('hide');
    div.appendChild(empid);
    main.appendChild(div);
}
