export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._name = nameElement;
    this._job = jobElement;
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
    const profileJob = document.querySelector(".profile__subheader");
    const profileName = document.querySelector(".profile__header");
    profileJob.textContent = this.profileJob;
    profileName.textContent = this.profileName;
  }
}
