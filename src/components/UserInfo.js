export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._name = nameElement;
    this._job = jobElement;
    this.profileJobEl = document.querySelector(this._job);
    this.profileNameEl = document.querySelector(this._name);
  }

  getUserInfo() {
    //returns an object;
    const newObj = {
      name: "",
      job: "",
    };
    newObj.name = document.querySelector(`${this._name}`).textContent;
    newObj.job = document.querySelector(`${this._job}`).textContent;

    return newObj;
  }

  setUserInfo(name, job) {
    this.profileName = name;
    this.profileJob = job;

    this.profileJobEl.textContent = this.profileJob;
    this.profileNameEl.textContent = this.profileName;
  }
}
