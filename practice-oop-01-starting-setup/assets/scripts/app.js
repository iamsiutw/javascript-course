class Component {
  constructor(hostElementId, insertBerofe = false) {
    if (hostElementId) {
      this.hostElementId = document.getElementById(hostElementId)
    } else {
      this.hostElementId = document.body
    }
    this.insertBerofe = insertBerofe
  }

  detach() {
    if (this.element) {
      this.element.remove()
    }
  }

  attach() {
    this.hostElementId.insertAdjacentElement(this.insertBerofe ? 'afterbegin' : 'beforeend', this.element)
  }
}

class Tooltip extends Component {

  constructor(closeNotifierFunc, type) {
    super(`${type}-projects`)
    this.closeNotifierFunc = closeNotifierFunc
    this.create()
  }

  closeTooltip = () => {
    this.detach()
    this.closeNotifierFunc()
  }

  create() {
    const tooltipElement = document.createElement('div')
    tooltipElement.className = 'card'
    tooltipElement.textContent = 'DUMMY!'
    tooltipElement.addEventListener('click', this.closeTooltip)
    this.element = tooltipElement
  }
}

class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true)
    element.replaceWith(clonedElement)
    return clonedElement
  }

  static removeElement(elementID, newDestinationSelector) {
    const element = document.getElementById(elementID)
    const destinationElement = document.querySelector(newDestinationSelector)
    destinationElement.append(element)
  }
}

class ProjectItem {
  hasTooltipOpen = false

  constructor(id, updateProjectLists, type) {
    this.id = id
    this.type = type
    console.log(this.type)
    this.updateProjectListsHandler = updateProjectLists
    this.connectMoreInfoBtn()
    this.connectSwitchBtn(this.type)
  }

  showMoreInfoHander() {
    if (this.hasTooltipOpen) {
      return
    }
    const tooltip = new Tooltip(() => this.hasTooltipOpen = false, this.type)
    tooltip.attach()
    this.hasTooltipOpen = true
  }

  connectMoreInfoBtn() {
    const projectItemElement = document.getElementById(this.id)
    let infoBtn = projectItemElement.querySelector('button:first-of-type')
    infoBtn.addEventListener('click', this.showMoreInfoHander.bind(this))
  }

  connectSwitchBtn(type) {
    const projectItemElement = document.getElementById(this.id)
    let switchBtn = projectItemElement.querySelector('button:last-of-type')
    switchBtn = DOMHelper.clearEventListeners(switchBtn)
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate'
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id))
  }

  update(updateProjectListFn, type) {
    this.updateProjectListsHandler = updateProjectListFn
    this.connectSwitchBtn(type)

  }
}

class ProjectList {
  prjList = []

  constructor(type) {
    this.type = type
    const prjItems = document.querySelectorAll(`#${this.type}-projects li`)
    for (const prjItem of prjItems) {
      this.prjList.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type))
    }
    // console.log(this.prjList)
  }

  addProject(project) {
    this.prjList.push(project)
    DOMHelper.removeElement(project.id, `#${this.type}-projects ul`)
    project.update(this.switchProject.bind(this), this.type)
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction
  }

  switchProject(id) {
    // const projectIndex = this.prjList.findIndex(p => p.id === id)
    // this.prjList.splice(projectIndex, 1)    
    this.switchHandler(this.prjList.find(p => p.id === id))
    this.prjList = this.prjList.filter(p => p.id !== id)
  }

}

class App {
  static init() {
    const activeProjectList = new ProjectList('active')
    const finishedProjectList = new ProjectList('finished')
    activeProjectList.setSwitchHandler(finishedProjectList.addProject.bind(finishedProjectList))
    finishedProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList))
  }
}

App.init()
