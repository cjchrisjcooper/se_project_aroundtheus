export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    //returns an object;
    const newObj = {
      name: "",
      job: "",
    };
    newObj.name = this._name;
    newObj.job = this._job;
    return newObj;
  }

  setUserInfo(newName, newJob) {
    this._name = newName;
    this._job = newJob;
  }
}
