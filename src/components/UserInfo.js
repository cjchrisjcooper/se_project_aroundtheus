export default class UserInfo {
  constructor(nameElement, jobElement) {
    this.profileJobEl = document.querySelector(jobElement);
    this.profileNameEl = document.querySelector(nameElement);
  }

  getUserInfo() {
    //returns an object;
    const newObj = {
      name: "",
      job: "",
    };
    newObj.name = this.profileNameEl.textContent;
    newObj.job = this.profileJobEl.textContent;
    return newObj;
  }

  setUserInfo(name, job) {
    this.profileJobEl.textContent = job;
    this.profileNameEl.textContent = name;
  }
}
