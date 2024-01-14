export default class UserInfo {
  constructor(nameElement, jobElement, pictureElement) {
    this.profileJobEl = document.querySelector(jobElement);
    this.profileNameEl = document.querySelector(nameElement);
    this.profileAvatarEl = document.querySelector(pictureElement);
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

  setUserAvatar(url) {
    console.log("setUserAvatar() has been called");
    console.log(url);
    this.profileAvatarEl.setAttribute("src", url);
    this.profileAvatarEl.setAttribute("alt", this.profileNameEl.textContent);
  }
}
