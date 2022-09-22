const GRADATION = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent"
};

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "JackSmith",
    role: "student",
    courses: [
      {
        "title": "Front-end Pro",
        "mark": 20
      },
      {
        "title": "Java Enterprise",
        "mark": 100
      }
    ]
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "AmalSmith",
    role: "student"
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "NoahSmith",
    role: "student",
    courses: [
      {
        "title": "Front-end Pro",
        "mark": 50
      }
    ]
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "CharlieSmith",
    role: "student",
    courses: [
      {
        "title": "Front-end Pro",
        "mark": 75
      },
      {
        "title": "Java Enterprise",
        "mark": 23
      }]
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "EmilySmith",
    role: "admin",
    courses: [
      {
        "title": "Front-end Pro",
        "score": 10,
        "lector": "Leo Smith"
      },
      {
        "title": "Java Enterprise",
        "score": 50,
        "lector": "David Smith"
      },
      {
        "title": "QA",
        "score": 75,
        "lector": "Emilie Smith"
      }]
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "LeoSmith",
    role: "lector",
    courses: [
      {
        "title": "Front-end Pro",
        "score": 78,
        "studentsScore": 79
      },
      {
        "title": "Java Enterprise",
        "score": 85,
        "studentsScore": 85
      }
    ]
  }
];

class User {
  constructor({ courses = [], ...userData }) {
    Object.assign(this, { ...userData, courses });
  }

  getGradation(mark) {
    if (mark <= 20) {
      return GRADATION['20'];
    } else if (mark <= 55) {
      return GRADATION['55'];
    } else if (mark <= 85) {
      return GRADATION['85'];
    } else if (mark <= 100) {
      return GRADATION['100'];
    } else {
      return '';
    }
  };

  renderUserData() {
    return `<div class="user__info--data">
              <img src="images/users/${this.img}.png" alt="${this.name}" height="50">
              <div class="user__naming">
                <p>Name: <b>${this.name}</b></p>
                <p>Age: <b>${this.age}</b></p>
              </div>
            </div>`;
  };

  renderUserRole() {
    return `<div class="user__info--role ${this.role}">
              <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
              <p>${this.role}</p>
            </div>`;
  };

  renderUserInfo(){
    return `<div class="user__info">
                ${this.renderUserData()}
                ${this.renderUserRole()}
            </div>`;
  }

  render() {
    return `<div class="user">
              ${this.renderUserInfo()}
              ${this.renderCourses()}
            </div>`;
  };

  renderCourses() {
    return `<div class="user__courses">
              ${this.courses
                      .map(course => {
                        const mark = this.getGradation(course.mark);

                        return `<p class="user__courses--course ${this.role}">${course.title} <span class="${mark}">${mark}</span></p>`})
                      .join('')}
            </div>`;
  };
}

class Student extends User {
  constructor(user) {
    super(user);
  }
}

class Lector extends User {
  constructor(user) {
    super(user);
  }

  renderCourses() {
    return `<div class="user__courses admin--info">
              ${this.courses
                  .map(course => {
                    const score = this.getGradation(course.score);
                    const studentsScore = this.getGradation(course.studentsScore);

                    return `<div class="user__courses--course ${this.role}">
                              <p>Title: <b>${course.title}</b></p>
                              <p>Lector's score: <span class="${score}">${score}</span></p>
                              <p>Average student's score: <span class="${studentsScore}">${studentsScore}</span></p>
                            </div>`})
                  .join('')}
            </div>`;
  };
}

class Admin extends User {
  constructor(user) {
    super(user);
  }

  renderCourses() {
    return `<div class="user__courses admin--info">
              ${this.courses
                  .map(course => {
                    const score = this.getGradation(course.score);

                    return `<div class="user__courses--course ${this.role}">
                              <p>Title: <b>${course.title}</b></p>
                              <p>Admin's score: <span class="${score}">${score}</span></p>
                              <p>Lector: <b>${course.lector}</b></p>
                            </div>`})
                  .join('')}
            </div>`;
  };
}

function renderHTML(users) {
  return `<div class="users">
            ${users
              .map(user => user.render())
              .join('')}
          </div>`;
}

const USERS_ROLES = {
  student: user => new Student(user),
  lector: user => new Lector(user),
  admin: user => new Admin(user)
}

const getUsersUpdate = users
  .map(user => USERS_ROLES[user.role](user));

document.write(renderHTML(getUsersUpdate));