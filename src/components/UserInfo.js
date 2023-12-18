export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._name = nameElement;
    this.profileName = document.querySelector(`${nameElement}`).textContent;
    this._job = jobElement;
    this.profileJob = document.querySelector(`${jobElement}`).textContent;
  }

  getUserInfo() {
    //returns an object;
    const newObj = {
      name: "",
      job: "",
    };
    newObj.name = this.profileName;
    newObj.job = this.profileJob;
    return newObj;
  }

  setUserInfo(newName, newJob) {
    this.profileName = newName;
    this.profileJob = newJob;
  }
}
