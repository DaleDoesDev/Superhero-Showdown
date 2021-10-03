//super class used to apply state functions for subclasses (Character, ComicPanel)
class StateObject {
  constructor() {}

  setState(target, value) {
    this.state[target] = value;
    //   console.log(this.state);
    return this.state[target];
  }

  getState(target) {
    //console.log(this.state[target]);
    return this.state[target];
  }
}

export default StateObject;
