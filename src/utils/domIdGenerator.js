
class DomIdGenerator {
  constructor() {
    this.id = 0;
  }

  getUniqueId() {
    return this.id++;
  }
}

const domIdGenerator = new DomIdGenerator();

export default domIdGenerator;
